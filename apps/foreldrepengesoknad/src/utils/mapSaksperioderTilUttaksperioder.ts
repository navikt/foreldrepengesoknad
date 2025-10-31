import dayjs from 'dayjs';

import {
    AvslåttPeriode,
    FamiliehendelseType,
    Forelder,
    InfoPeriode,
    MorsAktivitet,
    OpprinneligSøkt,
    Overføringsperiode,
    Periode,
    PeriodeInfoType,
    PeriodeResultatÅrsak,
    Periodetype,
    Saksgrunnlag,
    Saksperiode,
    UtsettelseAnnenPartInfoPeriode,
    Utsettelsesperiode,
    UttakAnnenPartEØSInfoPeriode,
    UttakAnnenPartInfoPeriode,
    Uttaksperiode,
    isInfoPeriode,
    isUttaksperiode,
} from '@navikt/fp-common';
import {
    KontoType,
    KontoTypeUttak_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
} from '@navikt/fp-types';
import { Tidsperioden, Uttaksdagen, erUttaksdag, isValidTidsperiodeString } from '@navikt/fp-utils';
import {
    Perioden,
    convertTidsperiodeToTidsperiodeDate,
    finnOgSettInnHull,
    settInnAnnenPartsUttak,
    sorterPerioder,
    splittPeriodePåDato,
    splittUttaksperiodePåFamiliehendelsesdato,
    tidperiodeOverlapperDato,
} from '@navikt/fp-uttaksplan';

import { ISOStringToDate, getRelevantFamiliehendelseDato } from './dateUtils';
import { getArbeidsformFromUttakArbeidstype } from './eksisterendeSakUtils';
import { guid } from './guid';

const harUttaksdager = (periode: Periode): boolean => {
    return Perioden(periode).getAntallUttaksdager() > 0;
};

const harGyldigTidsperiode = (periode: Periode): boolean => {
    return isValidTidsperiodeString(periode.tidsperiode);
};

const erBeggePeriodePåSammeSideAvFamdato = (forrigePeriode: Periode, periode: Periode, familiehendelsesdato: Date) => {
    if (
        dayjs(forrigePeriode.tidsperiode.tom).isBefore(familiehendelsesdato) &&
        dayjs(periode.tidsperiode.tom).isBefore(familiehendelsesdato)
    ) {
        return true;
    }

    if (
        dayjs(forrigePeriode.tidsperiode.fom).isSameOrAfter(familiehendelsesdato) &&
        dayjs(periode.tidsperiode.fom).isSameOrAfter(familiehendelsesdato)
    ) {
        return true;
    }

    return false;
};

const slåSammenLikePerioder = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
): Periode[] => {
    if (perioder.length <= 1) {
        return perioder;
    }

    const nyePerioder: Periode[] = [];
    const infoPerioder = perioder.filter((p) => isInfoPeriode(p));
    const ordinærePerioder = perioder.filter((p) => !isInfoPeriode(p));
    const tmp: Periode[] = [...ordinærePerioder, ...infoPerioder];
    let forrigePeriode: Periode | undefined = { ...tmp[0] };

    tmp.forEach((periode, index) => {
        if (index === 0) {
            return;
        }

        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }

        if (
            Perioden(forrigePeriode).erLik(periode, false, true) &&
            Perioden(forrigePeriode).erSammenhengende(periode) &&
            !dayjs(periode.tidsperiode.fom).isSame(familiehendelsesdato, 'day') &&
            erBeggePeriodePåSammeSideAvFamdato(forrigePeriode, periode, familiehendelsesdato) &&
            !(
                førsteUttaksdagNesteBarnsSak !== undefined &&
                dayjs(periode.tidsperiode.fom).isSame(førsteUttaksdagNesteBarnsSak, 'day')
            )
        ) {
            forrigePeriode.tidsperiode.tom = periode.tidsperiode.tom;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
        }

        forrigePeriode = periode;
    });

    nyePerioder.push(forrigePeriode);

    return nyePerioder.sort(sorterPerioder);
};

const korrigerTidsperiodeTilGyldigUttaksdag = (periode: Periode): Periode => {
    const { fom, tom } = periode.tidsperiode;
    const fomOk = erUttaksdag(fom);
    const tomOk = erUttaksdag(tom);
    if (fomOk && tomOk) {
        return periode;
    } else if (!fomOk && !tomOk) {
        return {
            ...periode,
            tidsperiode: {
                fom: Uttaksdagen(fom).neste(),
                tom: Uttaksdagen(tom).forrige(),
            },
        };
    } else if (!fomOk && tomOk) {
        return {
            ...periode,
            tidsperiode: {
                fom: Uttaksdagen(fom).neste(),
                tom,
            },
        };
    } else {
        return {
            ...periode,
            tidsperiode: {
                fom,
                tom: Uttaksdagen(tom).forrige(),
            },
        };
    }
};

const getForelderForPeriode = (saksperiode: Saksperiode, søkerErFarEllerMedmor: boolean): Forelder => {
    if (saksperiode.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
    }
    return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
};

const getOppholdÅrsakFromSaksperiode = (saksperiode: Saksperiode): UttakOppholdÅrsak_fpoversikt | undefined => {
    switch (saksperiode.kontoType) {
        case 'FEDREKVOTE':
            return 'FEDREKVOTE_ANNEN_FORELDER';
        case 'FELLESPERIODE':
            return 'FELLESPERIODE_ANNEN_FORELDER';
        case 'MØDREKVOTE':
            return 'MØDREKVOTE_ANNEN_FORELDER';
        case 'FORELDREPENGER':
            return 'FORELDREPENGER_ANNEN_FORELDER';
        case 'FORELDREPENGER_FØR_FØDSEL':
            return 'MØDREKVOTE_ANNEN_FORELDER'; // TODO
        case undefined:
            return undefined;
    }
};

const beregnSamtidigUttaksProsent = (
    egenProsent: number | undefined,
    andrePartsProsent: number | undefined,
    graderingsprosent: number | undefined,
): string | undefined => {
    if (egenProsent) {
        return egenProsent.toString();
    }

    if (andrePartsProsent) {
        return graderingsprosent ? (100 - graderingsprosent).toString() : '100';
    }

    return undefined;
};

export const getKontotypeBareFarHarRett = (periodeTrekkerMinsterett: boolean): KontoTypeUttak_fpoversikt => {
    return periodeTrekkerMinsterett ? 'AKTIVITETSFRI_KVOTE' : 'FORELDREPENGER';
};

const getErMorForSyk = (
    erFarEllerMedmor: boolean,
    saksperiode: Saksperiode,
    familiehendelsesdato: string,
    konto: KontoTypeUttak_fpoversikt | undefined,
) => {
    if (
        erFarEllerMedmor &&
        !saksperiode.flerbarnsdager &&
        !saksperiode.samtidigUttak &&
        dayjs(saksperiode.periode.fom).isBefore(dayjs(familiehendelsesdato).add(6, 'weeks'), 'day') &&
        konto !== 'AKTIVITETSFRI_KVOTE'
    ) {
        if (saksperiode.morsAktivitet !== MorsAktivitet.Uføre) {
            return true;
        }
    }

    return undefined;
};

const mapUttaksperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    innvilgedePerioder: Saksperiode[],
): Periode => {
    const gradert = saksperiode.gradering !== undefined && saksperiode.resultat?.innvilget;
    const tidsperiodeDate = convertTidsperiodeToTidsperiodeDate(saksperiode.periode);
    const erFarEllerMedmorOgKunSøkerHarRett =
        grunnlag.søkerErFarEllerMedmor &&
        !grunnlag.morHarRett &&
        !grunnlag.farMedmorErAleneOmOmsorg &&
        !grunnlag.harAnnenForelderTilsvarendeRettEØS;

    const annenPartSamtidigUttakPeriode: Saksperiode | undefined =
        innvilgedePerioder !== undefined
            ? innvilgedePerioder.find(
                  (ip) =>
                      (Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) ||
                          Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).overlapper(tidsperiodeDate)) &&
                      ip.guid !== saksperiode.guid,
              )
            : undefined;

    let samtidigUttakProsentAnnenPart;

    if (annenPartSamtidigUttakPeriode) {
        samtidigUttakProsentAnnenPart = annenPartSamtidigUttakPeriode.samtidigUttak;
    }

    const samtidigUttakProsent = beregnSamtidigUttaksProsent(
        saksperiode.samtidigUttak,
        samtidigUttakProsentAnnenPart,
        saksperiode.gradering?.arbeidstidprosent,
    );

    const opprinneligSøkt = getOpprinneligSøkt(saksperiode);

    const { termindato, fødselsdato, omsorgsovertakelsesdato } = grunnlag;

    const familiehendelseDato = getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertakelsesdato);
    const kontoType = erFarEllerMedmorOgKunSøkerHarRett
        ? getKontotypeBareFarHarRett(saksperiode.resultat?.trekkerMinsterett ?? false)
        : saksperiode.kontoType;
    const uttaksperiode: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        konto: kontoType!,
        tidsperiode: tidsperiodeDate,
        forelder: getForelderForPeriode(saksperiode, grunnlag.søkerErFarEllerMedmor),
        ønskerSamtidigUttak: saksperiode.samtidigUttak !== undefined,
        gradert,
        samtidigUttakProsent,
        ønskerFlerbarnsdager: grunnlag.antallBarn > 1 ? saksperiode.flerbarnsdager : undefined,
        stillingsprosent: gradert ? saksperiode.gradering!.arbeidstidprosent.toString() : undefined,
        arbeidsformer: gradert
            ? [getArbeidsformFromUttakArbeidstype(saksperiode.gradering!.aktivitet.type)]
            : undefined,
        orgnumre:
            gradert && saksperiode.gradering!.aktivitet.arbeidsgiver !== undefined
                ? [saksperiode.gradering!.aktivitet.arbeidsgiver.id]
                : undefined,
        morsAktivitetIPerioden: saksperiode.morsAktivitet,
        erMorForSyk: getErMorForSyk(grunnlag.søkerErFarEllerMedmor, saksperiode, familiehendelseDato, kontoType),
        angittAvAnnenPart: saksperiode.angittAvAnnenPart,
        opprinneligSøkt,
    };

    return uttaksperiode;
};

const mapUtsettelseperiodeFromSaksperiode = (saksperiode: Saksperiode, erFarEllerMedmor: boolean): Periode => {
    const utsettelsesperiode: Utsettelsesperiode = {
        id: guid(),
        type: Periodetype.Utsettelse,
        årsak: saksperiode.utsettelseÅrsak!,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        erArbeidstaker: false,
        morsAktivitetIPerioden: saksperiode.morsAktivitet,
    };

    return utsettelsesperiode;
};

const getOpprinneligSøkt = (saksperiode: Saksperiode) => {
    if (saksperiode.resultat?.årsak === PeriodeResultatÅrsak.AVSLAG_UTSETTELSE_TILBAKE_I_TID) {
        if (saksperiode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
            return OpprinneligSøkt.Ferie;
        }

        if (saksperiode.utsettelseÅrsak === 'ARBEID') {
            return OpprinneligSøkt.Arbeid;
        }
    }

    if (saksperiode.resultat?.årsak === PeriodeResultatÅrsak.INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID) {
        return OpprinneligSøkt.Gradering;
    }

    return undefined;
};

const mapInfoPeriodeFromAvslåttSaksperiode = (saksperiode: Saksperiode, erFarEllerMedmor: boolean): AvslåttPeriode => {
    const opprinneligSøkt = getOpprinneligSøkt(saksperiode);

    const avslåttPeriode: AvslåttPeriode = {
        id: guid(),
        type: Periodetype.Info,
        infotype: PeriodeInfoType.avslåttPeriode,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        avslåttPeriodeType: saksperiode.utsettelseÅrsak !== undefined ? Periodetype.Utsettelse : Periodetype.Uttak,
        kontoType: saksperiode.kontoType,
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        overskrives: true,
        visPeriodeIPlan: true,
        kanSlettes: saksperiode.resultat?.årsak !== PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER,
        opprinneligSøkt,
    };
    return avslåttPeriode;
};

const mapAnnenPartInfoPeriodeFromSaksperiode = (
    saksperiode: Saksperiode,
    erFarEllerMedmor: boolean,
    termindato: string | undefined,
    innvilgedePerioder?: Saksperiode[],
): UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode | AvslåttPeriode => {
    const tidsperiodeDate = convertTidsperiodeToTidsperiodeDate(saksperiode.periode);

    if (saksperiode.utsettelseÅrsak !== undefined && saksperiode.resultat?.innvilget === true) {
        return {
            type: Periodetype.Info,
            infotype: PeriodeInfoType.utsettelseAnnenPart,
            id: guid(),
            årsak: saksperiode.utsettelseÅrsak!,
            tidsperiode: tidsperiodeDate,
            forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
            overskrives: true,
            visPeriodeIPlan: true,
        };
    }

    const skalVises =
        innvilgedePerioder !== undefined &&
        !innvilgedePerioder.some(
            (ip) =>
                (Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) ||
                    Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).overlapper(tidsperiodeDate)) &&
                ip.guid !== saksperiode.guid,
        );
    const årsak = getOppholdÅrsakFromSaksperiode(saksperiode);

    const annenPartSamtidigUttakPeriode: Saksperiode | undefined =
        innvilgedePerioder !== undefined
            ? innvilgedePerioder.find(
                  (ip) =>
                      (Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) ||
                          Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).overlapper(tidsperiodeDate)) &&
                      ip.guid !== saksperiode.guid,
              )
            : undefined;
    let samtidigUttakProsentAnnenPart;

    if (annenPartSamtidigUttakPeriode) {
        samtidigUttakProsentAnnenPart = annenPartSamtidigUttakPeriode.samtidigUttak;
    }

    const samtidigUttakProsent = beregnSamtidigUttaksProsent(
        saksperiode.samtidigUttak,
        samtidigUttakProsentAnnenPart,
        saksperiode.gradering?.arbeidstidprosent,
    );

    if (erAnnenPartsAvslåttePrematurePeriode(saksperiode, termindato)) {
        return {
            type: Periodetype.Info,
            infotype: PeriodeInfoType.avslåttPeriode,
            id: guid(),
            tidsperiode: tidsperiodeDate,
            forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
            overskrives: true,
            visPeriodeIPlan: skalVises,
            kontoType: saksperiode.kontoType,
            avslåttPeriodeType: Periodetype.Uttak,
            kanSlettes: false,
        };
    }

    return {
        type: Periodetype.Info,
        infotype: PeriodeInfoType.uttakAnnenPart,
        id: guid(),
        årsak: årsak!,
        tidsperiode: tidsperiodeDate,
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        overskrives: true,
        gradert: saksperiode.gradering !== undefined,
        ønskerSamtidigUttak: samtidigUttakProsent !== undefined,
        samtidigUttakProsent: samtidigUttakProsent,
        stillingsprosent:
            saksperiode.gradering !== undefined ? saksperiode.gradering.arbeidstidprosent.toString() : undefined,
        visPeriodeIPlan: skalVises,
    };
};

const mapOverføringsperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    erFarEllerMedmor: boolean,
): Overføringsperiode => {
    return {
        id: guid(),
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        konto: saksperiode.kontoType!,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        type: Periodetype.Overføring,
        årsak: saksperiode.overføringÅrsak!,
    };
};

const mapPeriodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    gyldigePerioder: Saksperiode[],
): Periode => {
    const innvilgedePerioder = gyldigePerioder.filter(
        (p) => !erAnnenPartsAvslåttePrematurePeriode(p, grunnlag.termindato),
    );
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(
            saksperiode,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.termindato,
            innvilgedePerioder,
        );
    }

    if (!saksperiode.resultat?.innvilget) {
        return mapInfoPeriodeFromAvslåttSaksperiode(saksperiode, grunnlag.søkerErFarEllerMedmor);
    }

    if (saksperiode.utsettelseÅrsak !== undefined) {
        return mapUtsettelseperiodeFromSaksperiode(saksperiode, grunnlag.søkerErFarEllerMedmor);
    }

    if (saksperiode.overføringÅrsak !== undefined) {
        return mapOverføringsperiodeFromSaksperiode(saksperiode, grunnlag.søkerErFarEllerMedmor);
    }

    return mapUttaksperiodeFromSaksperiode(saksperiode, grunnlag, innvilgedePerioder);
};

const erAnnenPartsAvslåttePrematurePeriode = (saksperiode: Saksperiode, termindato: string | undefined) => {
    return (
        termindato &&
        saksperiode.gjelderAnnenPart &&
        !saksperiode.resultat?.innvilget &&
        saksperiode.resultat?.trekkerDager &&
        dayjs(saksperiode.periode.tom).isBefore(dayjs(ISOStringToDate(termindato)), 'd') &&
        saksperiode.kontoType !== 'FEDREKVOTE'
    );
};

const gyldigeSaksperioder = (saksperiode: Saksperiode, termindato: string | undefined) => {
    if (saksperiode.resultat?.innvilget) return true;

    if (saksperiode.gjelderAnnenPart) {
        if (erAnnenPartsAvslåttePrematurePeriode(saksperiode, termindato)) {
            return true;
        }
        return false;
    }
    if (
        saksperiode.resultat?.årsak !== PeriodeResultatÅrsak.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER &&
        saksperiode.resultat?.trekkerDager === true
    ) {
        return true;
    }
    return false;
};

const getPerioderSplittetOverFødselOgNesteBarnsFørsteStønadsdag = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
): Periode[] => {
    const nyePerioder = [] as Periode[];
    for (const p of perioder) {
        if (tidperiodeOverlapperDato(p.tidsperiode, familiehendelsesdato) && isUttaksperiode(p)) {
            const splittedePerioder = splittUttaksperiodePåFamiliehendelsesdato(p, familiehendelsesdato);
            for (const periode of splittedePerioder) {
                nyePerioder.push(periode);
            }
        } else if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(p.tidsperiode, førsteUttaksdagNesteBarnsSak)
        ) {
            const splittedePerioder = splittPeriodePåDato(p, førsteUttaksdagNesteBarnsSak);
            for (const periode of splittedePerioder) {
                nyePerioder.push(periode);
            }
        } else {
            nyePerioder.push(p);
        }
    }
    return nyePerioder;
};

const mapKontoTypeTilOppholdÅrsakType = (konto: KontoType): UttakOppholdÅrsak_fpoversikt => {
    switch (konto) {
        case 'FEDREKVOTE':
            return 'FEDREKVOTE_ANNEN_FORELDER';
        case 'FELLESPERIODE':
            return 'FELLESPERIODE_ANNEN_FORELDER';
        case 'MØDREKVOTE':
            return 'MØDREKVOTE_ANNEN_FORELDER';
        case 'FORELDREPENGER':
            return 'FELLESPERIODE_ANNEN_FORELDER';
        case 'FORELDREPENGER_FØR_FØDSEL':
            return 'MØDREKVOTE_ANNEN_FORELDER';
    }
};

const mapUttaksperiodeAnnenpartEøs = (
    søkerErFarEllerMedmor: boolean,
    p: UttakPeriodeAnnenpartEøs_fpoversikt,
): UttakAnnenPartEØSInfoPeriode => {
    return {
        id: guid(),
        type: Periodetype.Info,
        infotype: PeriodeInfoType.uttakAnnenPart,
        overskrives: true,
        visPeriodeIPlan: true,
        forelder: søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor,
        tidsperiode: {
            fom: ISOStringToDate(p.fom)!,
            tom: ISOStringToDate(p.tom)!,
        },
        trekkdager: p.trekkdager,
        årsak: mapKontoTypeTilOppholdÅrsakType(p.kontoType),
    };
};

const annnepartsUttak = (
    søkerErFarEllerMedmor: boolean,
    sammenslåddePerioder: Periode[],
    perioderAnnenpartEøs: UttakPeriodeAnnenpartEøs_fpoversikt[] | undefined,
): InfoPeriode[] => {
    const uttakAnnenPart = sammenslåddePerioder.filter((p) => isInfoPeriode(p));

    if (perioderAnnenpartEøs) {
        const mappedPeridoeRAnnenpartEøs = perioderAnnenpartEøs.map((p) =>
            mapUttaksperiodeAnnenpartEøs(søkerErFarEllerMedmor, p),
        );

        return [...uttakAnnenPart, ...mappedPeridoeRAnnenpartEøs].sort(sorterPerioder);
    }

    return uttakAnnenPart;
};

export const mapSaksperioderTilUttaksperioder = (
    saksperioder: Saksperiode[],
    grunnlag: Saksgrunnlag,
    perioderAnnenpartEøs: UttakPeriodeAnnenpartEøs_fpoversikt[] | undefined,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
): Periode[] => {
    const gyldigePerioder = saksperioder.filter((periode) => gyldigeSaksperioder(periode, grunnlag.termindato));
    const perioder = gyldigePerioder.map((periode) => mapPeriodeFromSaksperiode(periode, grunnlag, gyldigePerioder));
    const familiehendelsesdato = new Date(grunnlag.familiehendelseDato);

    const splittedePerioder = getPerioderSplittetOverFødselOgNesteBarnsFørsteStønadsdag(
        perioder,
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak,
    );

    const sammenslåddePerioder: Periode[] = slåSammenLikePerioder(
        [...splittedePerioder]
            .sort(sorterPerioder)
            .filter(harUttaksdager)
            .map(korrigerTidsperiodeTilGyldigUttaksdag)
            .filter(harGyldigTidsperiode)
            .filter(harUttaksdager),
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak,
    );

    const kunFarMedmorHarRett =
        !grunnlag.morHarRett && grunnlag.farMedmorHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS;
    const erAdopsjon = grunnlag.familiehendelseType === FamiliehendelseType.ADOPSJON;

    const perioderUtenAnnenPartsSamtidigUttak = sammenslåddePerioder.filter((p) => !isInfoPeriode(p));
    const annenPartsUttak = annnepartsUttak(grunnlag.søkerErFarEllerMedmor, sammenslåddePerioder, perioderAnnenpartEøs);

    const harAktivitetskravIPeriodeUtenUttak =
        !grunnlag.erDeltUttak && kunFarMedmorHarRett && !grunnlag.farMedmorErAleneOmOmsorg;
    const perioderUtenAnnenPartsSamtidigUttakMedHull = finnOgSettInnHull(
        perioderUtenAnnenPartsSamtidigUttak,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        kunFarMedmorHarRett,
        grunnlag.søkerErFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );

    return finnOgSettInnHull(
        settInnAnnenPartsUttak(
            perioderUtenAnnenPartsSamtidigUttakMedHull,
            annenPartsUttak,
            familiehendelsesdato,
            førsteUttaksdagNesteBarnsSak,
        ),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        kunFarMedmorHarRett,
        grunnlag.søkerErFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
};

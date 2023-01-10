import { guid } from 'nav-frontend-js-utils';
import dayjs from 'dayjs';
import {
    AvslåttPeriode,
    isInfoPeriode,
    isUttaksperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    UtsettelseAnnenPartInfoPeriode,
    Utsettelsesperiode,
    UttakAnnenPartInfoPeriode,
    Uttaksperiode,
} from 'uttaksplan/types/Periode';
import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import { isValidTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { erUttaksdag, Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Saksperiode } from 'app/types/Saksperiode';
import { Forelder } from 'app/types/Forelder';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { Saksgrunnlag } from 'app/types/Saksgrunnlag';
import { getArbeidsformFromUttakArbeidstype } from './eksisterendeSakUtils';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import {
    convertTidsperiodeToTidsperiodeDate,
    getRelevantFamiliehendelseDato,
    tidperiodeOverlapperDato,
} from './dateUtils';
import { UtsettelseÅrsakTypeDTO } from 'app/types/UtsettelseÅrsakTypeDTO';
import { FamiliehendelseType } from 'app/types/FamiliehendelseType';
import { PeriodeResultatÅrsak } from 'uttaksplan/types/PeriodeResultatÅrsak';
import { finnOgSettInnHull, settInnAnnenPartsUttak } from 'uttaksplan/builder/uttaksplanbuilderUtils';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { splittUttaksperiodePåFamiliehendelsesdato, splittPeriodePåDato } from 'uttaksplan/builder/leggTilPeriode';
import { PeriodeInfoType } from 'uttaksplan/types/PeriodeInfoType';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';

const harUttaksdager = (periode: Periode): boolean => {
    return Perioden(periode).getAntallUttaksdager() > 0;
};

const harGyldigTidsperiode = (periode: Periode): boolean => {
    return isValidTidsperiode(periode.tidsperiode);
};

const slåSammenLikePerioder = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined
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

export const getUtsettelseÅrsakFromSaksperiode = (
    årsak: UtsettelseÅrsakTypeDTO | undefined
): UtsettelseÅrsakType | undefined => {
    switch (årsak) {
        case UtsettelseÅrsakTypeDTO.Arbeid:
            return UtsettelseÅrsakType.Arbeid;
        case UtsettelseÅrsakTypeDTO.Ferie:
            return UtsettelseÅrsakType.Ferie;
        case UtsettelseÅrsakTypeDTO.InstitusjonBarnet:
            return UtsettelseÅrsakType.InstitusjonBarnet;
        case UtsettelseÅrsakTypeDTO.InstitusjonSøker:
            return UtsettelseÅrsakType.InstitusjonSøker;
        case UtsettelseÅrsakTypeDTO.Sykdom:
            return UtsettelseÅrsakType.Sykdom;
        case UtsettelseÅrsakTypeDTO.HvØvelse:
            return UtsettelseÅrsakType.HvØvelse;
        case UtsettelseÅrsakTypeDTO.NavTiltak:
            return UtsettelseÅrsakType.NavTiltak;
        default:
            return undefined;
    }
};

const getOppholdÅrsakFromSaksperiode = (saksperiode: Saksperiode): OppholdÅrsakType | undefined => {
    switch (saksperiode.kontoType) {
        case StønadskontoType.Fedrekvote:
            return OppholdÅrsakType.UttakFedrekvoteAnnenForelder;
        case StønadskontoType.Fellesperiode:
            return OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
        case StønadskontoType.Mødrekvote:
            return OppholdÅrsakType.UttakMødrekvoteAnnenForelder;
        case StønadskontoType.Foreldrepenger:
            return OppholdÅrsakType.UttakForeldrepengerAnnenForelder;
        default:
            return undefined;
    }
};

const beregnSamtidigUttaksProsent = (
    egenProsent: number | undefined,
    andrePartsProsent: number | undefined,
    graderingsprosent: number | undefined
): string | undefined => {
    if (egenProsent) {
        return egenProsent.toString();
    }

    if (andrePartsProsent) {
        return graderingsprosent ? (100 - graderingsprosent).toString() : '100';
    }

    return undefined;
};

export const getKontotypeBareFarHarRett = (periodeTrekkerMinsterett: boolean): StønadskontoType => {
    return periodeTrekkerMinsterett ? StønadskontoType.AktivitetsfriKvote : StønadskontoType.Foreldrepenger;
};

const getErMorForSyk = (
    erFarEllerMedmor: boolean,
    saksperiode: Saksperiode,
    familiehendelsesdato: string,
    konto: StønadskontoType | undefined
) => {
    if (
        erFarEllerMedmor &&
        !saksperiode.flerbarnsdager &&
        !saksperiode.samtidigUttak &&
        dayjs(saksperiode.periode.fom).isBefore(dayjs(familiehendelsesdato).add(6, 'weeks'), 'day') &&
        konto !== StønadskontoType.AktivitetsfriKvote
    ) {
        if (saksperiode.morsAktivitet !== MorsAktivitet.Uføre) {
            return true;
        }
    }

    return undefined;
};

export const mapUttaksperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    grunnlag: Saksgrunnlag,
    innvilgedePerioder: Saksperiode[]
): Periode => {
    const gradert = saksperiode.gradering !== undefined && saksperiode.resultat.innvilget;
    const tidsperiodeDate = convertTidsperiodeToTidsperiodeDate(saksperiode.periode);
    const erFarEllerMedmorOgKunSøkerHarRett =
        grunnlag.søkerErFarEllerMedmor &&
        !grunnlag.morHarRett &&
        !grunnlag.farMedmorErAleneOmOmsorg &&
        !grunnlag.harAnnenForelderTilsvarendeRettEØS;

    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, grunnlag.søkerErFarEllerMedmor, innvilgedePerioder);
    }

    const annenPartSamtidigUttakPeriode: Saksperiode | undefined =
        innvilgedePerioder !== undefined
            ? innvilgedePerioder.find(
                  (ip) =>
                      (Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) ||
                          Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).overlapper(tidsperiodeDate)) &&
                      ip.guid !== saksperiode.guid
              )
            : undefined;

    let samtidigUttakProsentAnnenPart;

    if (annenPartSamtidigUttakPeriode) {
        samtidigUttakProsentAnnenPart = annenPartSamtidigUttakPeriode.samtidigUttak;
    }

    const samtidigUttakProsent = beregnSamtidigUttaksProsent(
        saksperiode.samtidigUttak,
        samtidigUttakProsentAnnenPart,
        saksperiode.gradering?.arbeidstidprosent
    );

    const { termindato, fødselsdato, omsorgsovertakelsesdato } = grunnlag;

    const familiehendelseDato = getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertakelsesdato);
    const kontoType = erFarEllerMedmorOgKunSøkerHarRett
        ? getKontotypeBareFarHarRett(saksperiode.resultat.trekkerMinsterett)
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
    };

    return uttaksperiode;
};

const mapUtsettelseperiodeFromSaksperiode = (saksperiode: Saksperiode, erFarEllerMedmor: boolean): Periode => {
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, erFarEllerMedmor);
    }

    const utsettelsesperiode: Utsettelsesperiode = {
        id: guid(),
        type: Periodetype.Utsettelse,
        årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelseÅrsak)!,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        erArbeidstaker: false,
        morsAktivitetIPerioden: saksperiode.morsAktivitet,
    };

    return utsettelsesperiode;
};

const mapInfoPeriodeFromAvslåttSaksperiode = (saksperiode: Saksperiode, erFarEllerMedmor: boolean): AvslåttPeriode => {
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
    };
    return avslåttPeriode;
};

const mapAnnenPartInfoPeriodeFromSaksperiode = (
    saksperiode: Saksperiode,
    erFarEllerMedmor: boolean,
    innvilgedePerioder?: Saksperiode[]
): UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode => {
    const tidsperiodeDate = convertTidsperiodeToTidsperiodeDate(saksperiode.periode);

    if (saksperiode.utsettelseÅrsak !== undefined && saksperiode.resultat.innvilget === true) {
        return {
            type: Periodetype.Info,
            infotype: PeriodeInfoType.utsettelseAnnenPart,
            id: guid(),
            årsak: getUtsettelseÅrsakFromSaksperiode(saksperiode.utsettelseÅrsak)!,
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
                ip.guid !== saksperiode.guid
        );
    const årsak = getOppholdÅrsakFromSaksperiode(saksperiode);

    const annenPartSamtidigUttakPeriode: Saksperiode | undefined =
        innvilgedePerioder !== undefined
            ? innvilgedePerioder.find(
                  (ip) =>
                      (Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) ||
                          Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).overlapper(tidsperiodeDate)) &&
                      ip.guid !== saksperiode.guid
              )
            : undefined;
    let samtidigUttakProsentAnnenPart;

    if (annenPartSamtidigUttakPeriode) {
        samtidigUttakProsentAnnenPart = annenPartSamtidigUttakPeriode.samtidigUttak;
    }

    const samtidigUttakProsent = beregnSamtidigUttaksProsent(
        saksperiode.samtidigUttak,
        samtidigUttakProsentAnnenPart,
        saksperiode.gradering?.arbeidstidprosent
    );

    return {
        type: Periodetype.Info,
        infotype: PeriodeInfoType.uttakAnnenPart,
        id: guid(),
        årsak: årsak!,
        tidsperiode: tidsperiodeDate,
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        overskrives: true,
        gradert: saksperiode.gradering !== undefined ? true : false,
        ønskerSamtidigUttak: samtidigUttakProsent !== undefined,
        samtidigUttakProsent: samtidigUttakProsent,
        stillingsprosent:
            saksperiode.gradering !== undefined ? saksperiode.gradering.arbeidstidprosent.toString() : undefined,
        visPeriodeIPlan: skalVises,
    };
};

const mapOverføringsperiodeFromSaksperiode = (
    saksperiode: Saksperiode,
    erFarEllerMedmor: boolean
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
    innvilgedePerioder: Saksperiode[]
): Periode => {
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, grunnlag.søkerErFarEllerMedmor, innvilgedePerioder);
    }

    if (!saksperiode.resultat.innvilget) {
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

export const gyldigeSaksperioder = (saksperiode: Saksperiode) => {
    if (saksperiode.resultat.innvilget) return true;

    if (saksperiode.gjelderAnnenPart) {
        return false;
    }
    if (
        saksperiode.resultat.årsak !== PeriodeResultatÅrsak.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER &&
        saksperiode.resultat.trekkerDager === true
    ) {
        return true;
    }
    return false;
};

export const getPerioderSplittetOverFødselOgNesteBarnsFørsteStønadsdag = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined
): Periode[] => {
    const nyePerioder = [] as Periode[];
    perioder.forEach((p) => {
        if (tidperiodeOverlapperDato(p.tidsperiode, familiehendelsesdato) && isUttaksperiode(p)) {
            const splittedePerioder = splittUttaksperiodePåFamiliehendelsesdato(p, familiehendelsesdato);
            splittedePerioder.forEach((periode) => nyePerioder.push(periode));
        } else if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(p.tidsperiode, førsteUttaksdagNesteBarnsSak)
        ) {
            const splittedePerioder = splittPeriodePåDato(p, førsteUttaksdagNesteBarnsSak);
            splittedePerioder.forEach((periode) => nyePerioder.push(periode));
        } else {
            nyePerioder.push(p);
        }
    });
    return nyePerioder;
};

const mapSaksperioderTilUttaksperioder = (
    saksperioder: Saksperiode[],
    grunnlag: Saksgrunnlag,
    førsteUttaksdagNesteBarnsSak: Date | undefined
): Periode[] => {
    const innvilgedePerioder = saksperioder.filter(gyldigeSaksperioder);
    const perioder = innvilgedePerioder.map((periode) =>
        mapPeriodeFromSaksperiode(periode, grunnlag, innvilgedePerioder)
    );
    const familiehendelsesdato = new Date(grunnlag.familiehendelseDato);

    const splittedePerioder = getPerioderSplittetOverFødselOgNesteBarnsFørsteStønadsdag(
        perioder,
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak
    );

    const sammenslåddePerioder: Periode[] = slåSammenLikePerioder(
        splittedePerioder
            .sort(sorterPerioder)
            .filter(harUttaksdager)
            .map(korrigerTidsperiodeTilGyldigUttaksdag)
            .filter(harGyldigTidsperiode)
            .filter(harUttaksdager),
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak
    );

    const kunFarMedmorHarRett =
        !grunnlag.morHarRett && grunnlag.farMedmorHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS;
    const erAdopsjon = grunnlag.familiehendelseType === FamiliehendelseType.ADOPSJON;

    const perioderUtenAnnenPartsSamtidigUttak = sammenslåddePerioder.filter((p) => !isInfoPeriode(p));

    const annenPartsUttak = sammenslåddePerioder.filter((p) => isInfoPeriode(p));
    const harAktivitetskravIPeriodeUtenUttak =
        !grunnlag.erDeltUttak && kunFarMedmorHarRett && !grunnlag.farMedmorErAleneOmOmsorg;
    const perioderUtenAnnenPartsSamtidigUttakMedHull = finnOgSettInnHull(
        perioderUtenAnnenPartsSamtidigUttak,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        kunFarMedmorHarRett,
        grunnlag.søkerErFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak
    );

    return finnOgSettInnHull(
        settInnAnnenPartsUttak(
            perioderUtenAnnenPartsSamtidigUttakMedHull,
            annenPartsUttak,
            familiehendelsesdato,
            førsteUttaksdagNesteBarnsSak
        ),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        kunFarMedmorHarRett,
        grunnlag.søkerErFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak
    );
};

export default mapSaksperioderTilUttaksperioder;

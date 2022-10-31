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
import { SaksperiodeV2 } from 'app/types/Saksperiode';
import { Forelder } from 'app/types/Forelder';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { SaksgrunnlagV2 } from 'app/types/Saksgrunnlag';
import { getArbeidsformFromUttakArbeidstype } from './eksisterendeSakUtils';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { convertTidsperiodeToTidsperiodeDate, getRelevantFamiliehendelseDato } from './dateUtils';
import { UtsettelseÅrsakTypeDTOV2 } from 'app/types/UtsettelseÅrsakTypeDTO';
import { FamiliehendelseType } from 'app/types/FamiliehendelseType';
import { PeriodeResultatÅrsak } from 'uttaksplan/types/PeriodeResultatÅrsak';
import { finnOgSettInnHull, settInnAnnenPartsUttak } from 'uttaksplan/builder/uttaksplanbuilderUtils';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { tidperiodeGårOverFamiliehendelsesdato } from './wlbUtils';
import { splittUttaksperiodePåFamiliehendelsesdato } from 'uttaksplan/builder/leggTilPeriode';
import { PeriodeResultatÅrsakV2 } from 'uttaksplan/types/PeriodeResultatÅrsak';
import { PeriodeInfoType } from 'uttaksplan/types/PeriodeInfoType';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';

const harUttaksdager = (periode: Periode): boolean => {
    return Perioden(periode).getAntallUttaksdager() > 0;
};

const harGyldigTidsperiode = (periode: Periode): boolean => {
    return isValidTidsperiode(periode.tidsperiode);
};

const slåSammenLikePerioder = (perioder: Periode[], familiehendelsesdato: Date): Periode[] => {
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
            !dayjs(periode.tidsperiode.fom).isSame(familiehendelsesdato, 'day')
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

// const getForelderForPeriode = (saksperiode: Saksperiode, søkerErFarEllerMedmor: boolean): Forelder => {
//     if (saksperiode.gjelderAnnenPart) {
//         return søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
//     }
//     return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
// };

const getForelderForPeriode = (saksperiode: SaksperiodeV2, søkerErFarEllerMedmor: boolean): Forelder => {
    if (saksperiode.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
    }
    return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
};

export const getUtsettelseÅrsakFromSaksperiode = (
    årsak: UtsettelseÅrsakTypeDTOV2 | undefined
): UtsettelseÅrsakType | undefined => {
    switch (årsak) {
        case UtsettelseÅrsakTypeDTOV2.Arbeid:
            return UtsettelseÅrsakType.Arbeid;
        case UtsettelseÅrsakTypeDTOV2.Ferie:
            return UtsettelseÅrsakType.Ferie;
        case UtsettelseÅrsakTypeDTOV2.InstitusjonBarnet:
            return UtsettelseÅrsakType.InstitusjonBarnet;
        case UtsettelseÅrsakTypeDTOV2.InstitusjonSøker:
            return UtsettelseÅrsakType.InstitusjonSøker;
        case UtsettelseÅrsakTypeDTOV2.Sykdom:
            return UtsettelseÅrsakType.Sykdom;
        case UtsettelseÅrsakTypeDTOV2.HvØvelse:
            return UtsettelseÅrsakType.HvØvelse;
        case UtsettelseÅrsakTypeDTOV2.NavTiltak:
            return UtsettelseÅrsakType.NavTiltak;
        default:
            return undefined;
    }
};

const getOppholdÅrsakFromSaksperiode = (saksperiode: SaksperiodeV2): OppholdÅrsakType | undefined => {
    switch (saksperiode.kontoType) {
        case StønadskontoType.Fedrekvote:
            return OppholdÅrsakType.UttakFedrekvoteAnnenForelder;
        case StønadskontoType.Fellesperiode:
            return OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
        case StønadskontoType.Mødrekvote:
            return OppholdÅrsakType.UttakMødrekvoteAnnenForelder;
        case StønadskontoType.ForeldrepengerFørFødsel:
            return OppholdÅrsakType.UttakForelderpengerFørFødselAnnenForelder;
        case StønadskontoType.Foreldrepenger:
            return OppholdÅrsakType.UttakForeldrepengerAnnenForelder;
        default:
            return undefined;
    }
};

// const beregnSamtidigUttaksProsent = (
//     egenProsent: number | undefined,
//     andrePartsProsent: number | undefined,
//     utbetalingsprosent: number
// ): string | undefined => {
//     if (egenProsent) {
//         return egenProsent.toString();
//     }

//     if (andrePartsProsent) {
//         return utbetalingsprosent.toString();
//     }

//     return undefined;
// };

const beregnSamtidigUttaksProsentV2 = (
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

export const getKontotypeBareFarHarRett = (periodeResultatÅrsak: string): StønadskontoType => {
    if (
        periodeResultatÅrsak !== PeriodeResultatÅrsak.BFHRMedAktivitetsKrav_2004 &&
        periodeResultatÅrsak !== PeriodeResultatÅrsak.BFHRMedAktivitetsKrav_2033
    ) {
        return StønadskontoType.AktivitetsfriKvote;
    } else {
        return StønadskontoType.Foreldrepenger;
    }
};

export const getKontotypeBareFarHarRettV2 = (periodeTrekkerMinsterett: boolean): StønadskontoType => {
    return periodeTrekkerMinsterett ? StønadskontoType.AktivitetsfriKvote : StønadskontoType.Foreldrepenger;
};

const getErMorForSyk = (
    erFarEllerMedmor: boolean,
    saksperiode: SaksperiodeV2,
    familiehendelsesdato: string,
    konto: StønadskontoType
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
    saksperiode: SaksperiodeV2,
    grunnlag: SaksgrunnlagV2,
    innvilgedePerioder: SaksperiodeV2[]
): Periode => {
    const gradert = saksperiode.gradering !== undefined && saksperiode.resultat.innvilget;
    const tidsperiodeDate = convertTidsperiodeToTidsperiodeDate(saksperiode.periode);
    const erFarEllerMedmorOgKunSøkerHarRett =
        grunnlag.søkerErFarEllerMedmor &&
        !grunnlag.morHarRett &&
        !grunnlag.farMedmorErAleneOmOmsorg &&
        !grunnlag.harAnnenForelderTilsvarendeRettEØS;

    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiodeV2(
            saksperiode,
            grunnlag.søkerErFarEllerMedmor,
            innvilgedePerioder
        );
    }

    const annenPartSamtidigUttakPeriode: SaksperiodeV2 | undefined = innvilgedePerioder.find(
        (ip) =>
            Tidsperioden(convertTidsperiodeToTidsperiodeDate(ip.periode)).erLik(tidsperiodeDate) &&
            ip.guid !== saksperiode.guid
    );
    let samtidigUttakProsentAnnenPart;

    if (annenPartSamtidigUttakPeriode) {
        samtidigUttakProsentAnnenPart = annenPartSamtidigUttakPeriode.samtidigUttak;
    }

    const samtidigUttakProsent = beregnSamtidigUttaksProsentV2(
        saksperiode.samtidigUttak,
        samtidigUttakProsentAnnenPart,
        saksperiode.gradering?.arbeidstidprosent
    );

    const { termindato, fødselsdato, omsorgsovertakelsesdato } = grunnlag;

    const familiehendelseDato = getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertakelsesdato);
    const kontoType = erFarEllerMedmorOgKunSøkerHarRett
        ? getKontotypeBareFarHarRettV2(saksperiode.resultat.trekkerMinsterett)
        : saksperiode.kontoType;
    const uttaksperiode: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        konto: kontoType,
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
            gradert && saksperiode.gradering!.aktivitet.arbeidsgiver
                ? [saksperiode.gradering!.aktivitet.arbeidsgiver.id]
                : undefined,
        morsAktivitetIPerioden: saksperiode.morsAktivitet,
        erMorForSyk: getErMorForSyk(grunnlag.søkerErFarEllerMedmor, saksperiode, familiehendelseDato, kontoType),
        angittAvAnnenPart: saksperiode.angittAvAnnenPart,
    };

    return uttaksperiode;
};

const mapUtsettelseperiodeFromSaksperiodeV2 = (saksperiode: SaksperiodeV2, erFarEllerMedmor: boolean): Periode => {
    //TODO : Annen parts utsettelse
    // if (saksperiode.gjelderAnnenPart) {
    //     return mapAnnenPartInfoPeriodeFromSaksperiode(saksperiode, erFarEllerMedmor);
    // }

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

const mapInfoPeriodeFromAvslåttSaksperiode = (
    saksperiode: SaksperiodeV2,
    erFarEllerMedmor: boolean
): AvslåttPeriode => {
    const avslåttPeriode: AvslåttPeriode = {
        id: guid(),
        type: Periodetype.Info,
        infotype: PeriodeInfoType.avslåttPeriode,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        avslåttPeriodeType: saksperiode.utsettelseÅrsak !== undefined ? Periodetype.Utsettelse : Periodetype.Uttak,
        stønadskonto: saksperiode.kontoType,
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        overskrives: true,
        visPeriodeIPlan: true,
    };
    return avslåttPeriode;
};

const mapAnnenPartInfoPeriodeFromSaksperiodeV2 = (
    saksperiode: SaksperiodeV2,
    erFarEllerMedmor: boolean,
    innvilgedePerioder?: SaksperiodeV2[]
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

    const annenPartSamtidigUttakPeriode: SaksperiodeV2 | undefined =
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

    const samtidigUttakProsent = beregnSamtidigUttaksProsentV2(
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

const mapOverføringsperiodeFromSaksperiodeV2 = (
    saksperiode: SaksperiodeV2,
    erFarEllerMedmor: boolean
): Overføringsperiode => {
    return {
        id: guid(),
        forelder: getForelderForPeriode(saksperiode, erFarEllerMedmor),
        konto: saksperiode.kontoType,
        tidsperiode: convertTidsperiodeToTidsperiodeDate(saksperiode.periode),
        type: Periodetype.Overføring,
        årsak: saksperiode.overføringÅrsak!,
    };
};

const mapPeriodeFromSaksperiode = (
    saksperiode: SaksperiodeV2,
    grunnlag: SaksgrunnlagV2,
    innvilgedePerioder: SaksperiodeV2[]
): Periode => {
    if (saksperiode.gjelderAnnenPart) {
        return mapAnnenPartInfoPeriodeFromSaksperiodeV2(
            saksperiode,
            grunnlag.søkerErFarEllerMedmor,
            innvilgedePerioder
        );
    }

    if (!saksperiode.resultat.innvilget) {
        return mapInfoPeriodeFromAvslåttSaksperiode(saksperiode, grunnlag.søkerErFarEllerMedmor);
    }

    if (saksperiode.utsettelseÅrsak !== undefined) {
        return mapUtsettelseperiodeFromSaksperiodeV2(saksperiode, grunnlag.søkerErFarEllerMedmor);
    }

    if (saksperiode.overføringÅrsak !== undefined) {
        return mapOverføringsperiodeFromSaksperiodeV2(saksperiode, grunnlag.søkerErFarEllerMedmor);
    }

    return mapUttaksperiodeFromSaksperiode(saksperiode, grunnlag, innvilgedePerioder);
};

export const gyldigeSaksperioder = (saksperiode: SaksperiodeV2) => {
    if (saksperiode.resultat.innvilget) return true;

    if (
        saksperiode.resultat.årsak !== PeriodeResultatÅrsakV2.AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER &&
        saksperiode.resultat.trekkerDager
    ) {
        return true;
    }
};

const getPerioderSplittetOverFødsel = (perioder: Periode[], familiehendelsesdato: Date): Periode[] => {
    const nyePerioder = [] as Periode[];
    perioder.forEach((p) => {
        if (tidperiodeGårOverFamiliehendelsesdato(p.tidsperiode, familiehendelsesdato) && isUttaksperiode(p)) {
            const splittedePerioder = splittUttaksperiodePåFamiliehendelsesdato(p, familiehendelsesdato);
            splittedePerioder.forEach((periode) => nyePerioder.push(periode));
        } else {
            nyePerioder.push(p);
        }
    });
    return nyePerioder;
};

const mapSaksperioderTilUttaksperioder = (saksperioder: SaksperiodeV2[], grunnlag: SaksgrunnlagV2): Periode[] => {
    const innvilgedePerioder = saksperioder.filter(gyldigeSaksperioder);
    const perioder = innvilgedePerioder.map((periode) =>
        mapPeriodeFromSaksperiode(periode, grunnlag, innvilgedePerioder)
    );
    const familiehendelsesdato = new Date(grunnlag.familiehendelseDato);

    const perioderSplittetOverFødsel = getPerioderSplittetOverFødsel(perioder, familiehendelsesdato);

    const sammenslåddePerioder: Periode[] = slåSammenLikePerioder(
        perioderSplittetOverFødsel
            .sort(sorterPerioder)
            .filter(harUttaksdager)
            .map(korrigerTidsperiodeTilGyldigUttaksdag)
            .filter(harGyldigTidsperiode)
            .filter(harUttaksdager),
        familiehendelsesdato
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
        grunnlag.søkerErFarEllerMedmor
    );

    return finnOgSettInnHull(
        settInnAnnenPartsUttak(perioderUtenAnnenPartsSamtidigUttakMedHull, annenPartsUttak, familiehendelsesdato),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        kunFarMedmorHarRett,
        grunnlag.søkerErFarEllerMedmor
    );
};

export default mapSaksperioderTilUttaksperioder;

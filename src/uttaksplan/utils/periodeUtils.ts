import { intlUtils, Tidsperiode, TidsperiodeDate } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { OppholdÅrsakType } from '../types/OppholdÅrsakType';
import { PeriodeInfoType } from '../types/PeriodeInfoType';
import { StønadskontoType } from '../types/StønadskontoType';
import {
    isAnnenPartInfoPeriode,
    isHull,
    isOverføringsperiode,
    isPeriodeUtenUttak,
    isUttakAvFellesperiode,
    isUttaksperiode,
    Periode,
    Periodetype,
    Utsettelsesperiode,
    UttakAnnenPartInfoPeriode,
} from '../types/Periode';
import { NavnPåForeldre } from '../../app/types/NavnPåForeldre';
import { Forelder } from '../../app/types/Forelder';
import { StønadskontoUttak } from 'uttaksplan/types/StønadskontoUttak';
import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import { erTidsperioderLike, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { getFloatFromString } from 'app/utils/numberUtils';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { getStønadskontoNavn } from './stønadskontoerUtils';
import {
    convertTidsperiodeToTidsperiodeDate,
    isDateInTheFuture,
    isDateTodayOrInTheFuture,
    ISOStringToDate,
} from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';

export const mapTidsperiodeStringToTidsperiode = (t: Partial<Tidsperiode>): Partial<TidsperiodeDate> => {
    return {
        fom: ISOStringToDate(t.fom),
        tom: ISOStringToDate(t.tom),
    };
};

export const mapTidsperiodeToTidsperiodeString = (t: Partial<TidsperiodeDate>): Partial<Tidsperiode> => {
    return {
        fom: dateToISOString(t.fom),
        tom: dateToISOString(t.tom),
    };
};

export const stillingsprosentIsMoreThan0 = (stillingsprosent: string): boolean => {
    const pst = getFloatFromString(stillingsprosent);
    if (pst) {
        return pst > 0;
    }
    return false;
};

export const samtidigUttakProsentIsMax100 = (samtidigUttakProsent: string): boolean => {
    const pst = getFloatFromString(samtidigUttakProsent);

    if (pst) {
        return pst <= 100;
    }

    return false;
};

export const stillingsprosentIsLessThan100 = (stillingsprosent: string): boolean => {
    const pst = getFloatFromString(stillingsprosent);
    if (pst) {
        return pst < 100;
    }
    return false;
};

const isValidStillingsprosent = (pst: string | undefined): boolean =>
    pst !== undefined && isNaN(parseFloat(pst)) === false;

const prettifyProsent = (pst: string | undefined): number | undefined => {
    if (pst === undefined) {
        return undefined;
    }

    const nbr = parseFloat(pst);
    if (isNaN(nbr)) {
        return undefined;
    }
    if (Math.round(nbr) === nbr) {
        return Math.round(nbr);
    }
    return nbr;
};

export const getUttaksprosentFromStillingsprosent = (
    stillingsPst: number | undefined,
    samtidigUttakPst: number | undefined
): number | undefined => {
    if (samtidigUttakPst) {
        return samtidigUttakPst;
    }
    if (stillingsPst) {
        return 100 - stillingsPst;
    }
    return undefined;
};

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: OppholdÅrsakType,
    foreldernavn: string,
    erMor: boolean
) => {
    return erMor
        ? intlUtils(intl, `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}`, { foreldernavn })
        : intlUtils(intl, `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn });
};

export const getStønadskontoFromOppholdsårsak = (årsak: OppholdÅrsakType): StønadskontoType => {
    if (årsak === OppholdÅrsakType.UttakFedrekvoteAnnenForelder) {
        return StønadskontoType.Fedrekvote;
    }

    if (årsak === OppholdÅrsakType.UttakMødrekvoteAnnenForelder) {
        return StønadskontoType.Mødrekvote;
    }

    if (årsak === OppholdÅrsakType.UttakFellesperiodeAnnenForelder) {
        return StønadskontoType.Fellesperiode;
    }

    return StønadskontoType.ForeldrepengerFørFødsel;
};

export const getOppholdsÅrsakFromStønadskonto = (konto: StønadskontoType): OppholdÅrsakType | undefined => {
    switch (konto) {
        case StønadskontoType.Fedrekvote:
            return OppholdÅrsakType.UttakFedrekvoteAnnenForelder;
        case StønadskontoType.Mødrekvote:
            return OppholdÅrsakType.UttakMødrekvoteAnnenForelder;
        case StønadskontoType.Fellesperiode:
            return OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
        default:
            return undefined;
    }
};

export const getForelderFromPeriode = (periode: Periode): Forelder | undefined => {
    if (!isHull(periode) && !isPeriodeUtenUttak(periode)) {
        return periode.forelder;
    }

    return undefined;
};

export const getForelderNavn = (forelder: Forelder, navnPåForeldre: NavnPåForeldre): string => {
    if (navnPåForeldre.farMedmor) {
        return forelder === Forelder.mor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    }
    return forelder === Forelder.mor ? navnPåForeldre.mor : forelder;
};

export const getPeriodeTittel = (intl: IntlShape, periode: Periode, navnPåForeldre: NavnPåForeldre): string => {
    switch (periode.type) {
        case Periodetype.Uttak:
            const tittel = getStønadskontoNavn(intl, periode.konto, navnPåForeldre);
            if (
                (periode.gradert && isValidStillingsprosent(periode.stillingsprosent)) ||
                (periode.ønskerSamtidigUttak && isValidStillingsprosent(periode.samtidigUttakProsent))
            ) {
                return `${tittel} ${intlUtils(intl, 'gradering.prosent', {
                    stillingsprosent: getUttaksprosentFromStillingsprosent(
                        prettifyProsent(periode.stillingsprosent),
                        periode.samtidigUttakProsent ? prettifyProsent(periode.samtidigUttakProsent) : undefined
                    ),
                })}`;
            }

            return tittel;
        case Periodetype.PeriodeUtenUttak:
            return intlUtils(intl, 'uttaksplan.periodetype.periodeUtenUttak.tittel');
        case Periodetype.Overføring:
            return getStønadskontoNavn(intl, periode.konto, navnPåForeldre);
        case Periodetype.Utsettelse:
            if (periode.årsak) {
                return intlUtils(intl, 'uttaksplan.periodeliste.utsettelsesårsak', {
                    årsak: intlUtils(intl, `uttaksplan.utsettelsesårsak.${periode.årsak}`),
                });
            }
            return intlUtils(intl, 'uttaksplan.periodeliste.utsettelsesårsak.ukjent');
        case Periodetype.Opphold:
            return getOppholdskontoNavn(
                intl,
                periode.årsak,
                getForelderNavn(periode.forelder, navnPåForeldre),
                periode.forelder === 'mor'
            );
        case Periodetype.Hull:
            return intlUtils(intl, 'uttaksplan.periodetype.hull.tittel');
        case Periodetype.Info:
            switch (periode.infotype) {
                case PeriodeInfoType.uttakAnnenPart:
                    return getStønadskontoNavn(intl, getStønadskontoFromOppholdsårsak(periode.årsak), navnPåForeldre);
                case PeriodeInfoType.utsettelseAnnenPart:
                    return intlUtils(intl, `periodetype.info.utsettelse.${periode.årsak}`, {
                        navn: getForelderNavn(periode.forelder, navnPåForeldre),
                    });
                default:
                    return intlUtils(intl, `periodetype.info.${periode.infotype}`);
            }
    }
};

export const erSentGradertUttak = (periode: Periode) =>
    periode.type === Periodetype.Uttak &&
    !isDateTodayOrInTheFuture(dateToISOString(periode.tidsperiode.fom)) &&
    periode.gradert;

export const erPeriodeInnvilget = (periode: Periode, eksisterendeSak?: EksisterendeSak): boolean => {
    if (eksisterendeSak === undefined) {
        return false;
    }
    const saksperiode = getSaksperiode(periode, eksisterendeSak);
    return saksperiode ? saksperiode.periodeResultatType === PeriodeResultatType.INNVILGET : false;
};

const getSaksperiode = (periode: Periode, ekisterendeSak: EksisterendeSak) => {
    return ekisterendeSak.saksperioder.find((saksperiode) =>
        erTidsperioderLike(convertTidsperiodeToTidsperiodeDate(saksperiode.periode), periode.tidsperiode)
    );
};

export const getPeriodeForelderNavn = (periode: Periode, navnPåForeldre: NavnPåForeldre): string => {
    if (
        periode.type === Periodetype.Utsettelse ||
        periode.type === Periodetype.Uttak ||
        periode.type === Periodetype.Overføring ||
        periode.type === Periodetype.Opphold ||
        periode.type === Periodetype.Info
    ) {
        return getForelderNavn(periode.forelder, navnPåForeldre);
    }
    return 'Ingen forelder registrert';
};

export const getSamtidigUttakEllerGraderingsProsent = (periode: UttakAnnenPartInfoPeriode): number | undefined => {
    const periodeErGradert = periode.stillingsprosent !== undefined;
    const periodeErSamtidigUttak = periode.samtidigUttakProsent !== undefined;

    if (periodeErSamtidigUttak) {
        return (100 - getFloatFromString(periode.samtidigUttakProsent)!) / 100;
    }

    if (periodeErGradert) {
        return getFloatFromString(periode.stillingsprosent)! / 100;
    }

    return undefined;
};

export const justerAndrePartsUttakAvFellesperiodeOmMulig = (
    perioder: Periode[],
    uttakFellesperiode: StønadskontoUttak | undefined
): Periode[] => {
    if (uttakFellesperiode === undefined || uttakFellesperiode.dager >= 0 || perioder.length === 0) {
        return perioder;
    }

    const dagerGjenståendeFellesperiode = uttakFellesperiode.dager;

    const sisteFellesperiodeAnnenPart = [...perioder]
        .reverse()
        .find((p) => isAnnenPartInfoPeriode(p) && p.årsak === OppholdÅrsakType.UttakFellesperiodeAnnenForelder);

    if (sisteFellesperiodeAnnenPart !== undefined && isAnnenPartInfoPeriode(sisteFellesperiodeAnnenPart)) {
        const dagerMedFellesperiodeISistePeriode = Perioden(sisteFellesperiodeAnnenPart).getAntallUttaksdager();
        const justeringsProsent = getSamtidigUttakEllerGraderingsProsent(sisteFellesperiodeAnnenPart) || 1;
        const diff = dagerGjenståendeFellesperiode / justeringsProsent + dagerMedFellesperiodeISistePeriode;
        const indexSistePeriode = perioder.findIndex((p) => p.id === sisteFellesperiodeAnnenPart.id);

        if (dagerGjenståendeFellesperiode < 0 && diff > 0) {
            perioder[indexSistePeriode] = {
                ...sisteFellesperiodeAnnenPart,
                tidsperiode: Tidsperioden(sisteFellesperiodeAnnenPart.tidsperiode).setUttaksdager(diff),
            };
            return perioder;
        }

        if (dagerGjenståendeFellesperiode < 0 && diff === 0) {
            return perioder.splice(indexSistePeriode, 1);
        }
    }

    return perioder;
};

export const getSlettPeriodeTekst = (periodetype: Periodetype): string => {
    switch (periodetype) {
        case Periodetype.Uttak:
            return 'uttaksplan.slettPeriode.uttak';
        case Periodetype.Overføring:
            return 'uttaksplan.slettPeriode.overføring';
        case Periodetype.Opphold:
            return 'uttaksplan.slettPeriode.opphold';
        case Periodetype.Utsettelse:
            return 'uttaksplan.slettPeriode.utsettelse';
        default:
            return '';
    }
};

const erPeriodeFomEllerEtterDato = (periode: Periode, dato: Date): boolean => {
    return (
        periode.tidsperiode.fom !== undefined &&
        periode.tidsperiode.tom !== undefined &&
        dayjs(periode.tidsperiode.fom).isSameOrAfter(dato, 'day') &&
        dayjs(periode.tidsperiode.tom).isSameOrAfter(dato, 'day')
    );
};

export const erPeriodeFørDato = (periode: Periode, dato: Date) => {
    return erPeriodeFomEllerEtterDato(periode, dato) === false;
};

export const erGradering = (periode: Periode) => periode.type === Periodetype.Uttak && periode.gradert === true;

export const erUttakEllerOppholdMerEnnTreMånederSiden = (periode: Periode) =>
    (periode.type === Periodetype.Uttak || periode.type === Periodetype.Opphold) &&
    dayjs(periode.tidsperiode.fom).isBefore(dayjs().startOf('day').subtract(3, 'months'));

export const erUtsettelsePgaSykdom = (periode: Utsettelsesperiode) =>
    periode.årsak === UtsettelseÅrsakType.Sykdom ||
    periode.årsak === UtsettelseÅrsakType.InstitusjonSøker ||
    periode.årsak === UtsettelseÅrsakType.InstitusjonBarnet;

export const erUttakGrunnetSykdom = (periode: Periode) => {
    if (
        isOverføringsperiode(periode) &&
        (periode.årsak === OverføringÅrsakType.institusjonsoppholdAnnenForelder ||
            periode.årsak === OverføringÅrsakType.sykdomAnnenForelder)
    ) {
        return true;
    }

    if (isUttaksperiode(periode)) {
        if (
            periode.erMorForSyk === true ||
            periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp ||
            periode.morsAktivitetIPerioden === MorsAktivitet.Innlagt
        ) {
            return true;
        }
    }

    if (
        isUttakAvFellesperiode(periode) &&
        (periode.morsAktivitetIPerioden === MorsAktivitet.Innlagt ||
            periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp)
    ) {
        return true;
    }

    return false;
};

export const erUttakTilbakeITid = (periode: Periode) =>
    isUttaksperiode(periode) && !isDateInTheFuture(dateToISOString(periode.tidsperiode.fom));

export const erUtsettelseTilbakeITid = (periode: Periode) =>
    periode.type === Periodetype.Utsettelse && !isDateInTheFuture(dateToISOString(periode.tidsperiode.fom));

export const erUtsettelseGrunnetPgaArbeid = (periode: Utsettelsesperiode) =>
    periode.årsak === UtsettelseÅrsakType.Arbeid;

export const erUtsettelse = (periode: Periode) => periode.type === Periodetype.Utsettelse;

const erUtsettelsePgaFerieEllerArbeid = (periode: Periode) =>
    periode.type === Periodetype.Utsettelse &&
    (periode.årsak === UtsettelseÅrsakType.Ferie || periode.årsak === UtsettelseÅrsakType.Arbeid);

export const erSenUtsettelsePgaFerieEllerArbeid = (periode: Periode) =>
    erUtsettelseTilbakeITid(periode) && erUtsettelsePgaFerieEllerArbeid(periode);

export const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UtsettelseÅrsakType | OverføringÅrsakType) =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker ||
    årsak === OverføringÅrsakType.institusjonsoppholdAnnenForelder ||
    årsak === OverføringÅrsakType.sykdomAnnenForelder;

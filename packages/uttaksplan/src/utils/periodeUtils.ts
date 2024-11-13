import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import {
    EksisterendeSak,
    Forelder,
    InfoPeriode,
    NavnPåForeldre,
    OppholdÅrsakType,
    OpprinneligSøkt,
    OverføringÅrsakType,
    Periode,
    PeriodeInfoType,
    PeriodeValidState,
    Periodetype,
    Situasjon,
    StønadskontoType,
    Tidsperiode,
    TidsperiodeDate,
    UtsettelseÅrsakType,
    UttakAnnenPartInfoPeriode,
    Uttaksperiode,
    isUttakAnnenPart,
    isUttaksperiode,
} from '@navikt/fp-common';
import { capitalizeFirstLetter, erTidsperioderLike, getFloatFromString } from '@navikt/fp-utils';

import { ISOStringToDate } from '../formik-wrappers';
import { Perioden } from './Perioden';
import { convertTidsperiodeToTidsperiodeDate, isDateInTheFuture, isDateTodayOrInTheFuture } from './dateUtils';
import { getStønadskontoNavn, getUttakAnnenPartStønadskontoNavn } from './stønadskontoerUtils';
import { appendPeriodeNavnHvisUttakRundtFødselFarMedmor } from './wlbUtils';

const isoStringFormat = 'YYYY-MM-DD';
const dateToISOString = (date?: Date) => (date ? dayjs(date).format(isoStringFormat) : '');

export const mapTidsperiodeStringToTidsperiode = (t: Partial<Tidsperiode>): Partial<TidsperiodeDate> => {
    return {
        fom: ISOStringToDate(t.fom),
        tom: ISOStringToDate(t.tom),
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
    samtidigUttakPst: number | undefined,
): number | undefined => {
    if (samtidigUttakPst) {
        return samtidigUttakPst;
    }
    if (stillingsPst) {
        let prosent = (100 - stillingsPst) * 100;
        prosent = Math.round(prosent) / 100;

        return prosent;
    }
    return undefined;
};

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: OppholdÅrsakType,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);
    return erMor
        ? // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
          intl.formatMessage({ id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}` }, { foreldernavn: navn })
        : // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
          intl.formatMessage({ id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}` }, { foreldernavn: navn });
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

    if (årsak === OppholdÅrsakType.UttakForeldrepengerAnnenForelder) {
        return StønadskontoType.Foreldrepenger;
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

export const getForelderNavn = (forelder: Forelder, navnPåForeldre: NavnPåForeldre): string => {
    let forelderNavn = '';
    if (navnPåForeldre.farMedmor) {
        forelderNavn = forelder === Forelder.mor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    } else {
        forelderNavn = forelder === Forelder.mor ? navnPåForeldre.mor : forelder;
    }
    return capitalizeFirstLetter(forelderNavn);
};

const getPeriodeTittelUttaksPeriode = (
    intl: IntlShape,
    periode: Uttaksperiode,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    const tittelMedNavn = getStønadskontoNavn(intl, periode.konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg);
    const tittel = appendPeriodeNavnHvisUttakRundtFødselFarMedmor(
        intl,
        tittelMedNavn,
        periode,
        situasjon,
        familiehendelsesdato,
        termindato,
    );
    if (
        (periode.gradert && isValidStillingsprosent(periode.stillingsprosent)) ||
        (periode.ønskerSamtidigUttak && isValidStillingsprosent(periode.samtidigUttakProsent))
    ) {
        return `${tittel} ${intl.formatMessage(
            { id: 'gradering.prosent' },
            {
                stillingsprosent: getUttaksprosentFromStillingsprosent(
                    prettifyProsent(periode.stillingsprosent),
                    periode.samtidigUttakProsent ? prettifyProsent(periode.samtidigUttakProsent) : undefined,
                ),
            },
        )}`;
    }
    return tittel;
};

const getPeriodeTittelInfoPeriode = (
    intl: IntlShape,
    periode: InfoPeriode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
) => {
    switch (periode.infotype) {
        case PeriodeInfoType.uttakAnnenPart:
            return getUttakAnnenPartStønadskontoNavn(
                intl,
                getStønadskontoFromOppholdsårsak(periode.årsak),
                periode.forelder,
                navnPåForeldre,
                periode.samtidigUttakProsent,
                erFarEllerMedmor,
            );
        case PeriodeInfoType.utsettelseAnnenPart:
            return intl.formatMessage(
                { id: `uttaksplan.periodetype.info.utsettelse.${periode.årsak}` },
                {
                    navn: getForelderNavn(periode.forelder, navnPåForeldre),
                },
            );
        case PeriodeInfoType.avslåttPeriode:
            if (
                periode.opprinneligSøkt === OpprinneligSøkt.Arbeid ||
                periode.opprinneligSøkt === OpprinneligSøkt.Ferie
            ) {
                return 'Avslått utsettelse';
            }

            if (
                (periode.forelder === Forelder.mor && erFarEllerMedmor) ||
                (periode.forelder === Forelder.farMedmor && !erFarEllerMedmor)
            ) {
                return intl.formatMessage(
                    { id: 'uttaksplan.periodetype.info.avslåttPeriode.annenPart' },
                    {
                        navn: getForelderNavn(periode.forelder, navnPåForeldre),
                    },
                );
            }
            return intl.formatMessage({ id: `uttaksplan.periodetype.info.${periode.infotype}` });
    }
};

export const getPeriodeTittel = (
    intl: IntlShape,
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
): string => {
    switch (periode.type) {
        case Periodetype.Uttak: {
            return getPeriodeTittelUttaksPeriode(
                intl,
                periode,
                navnPåForeldre,
                familiehendelsesdato,
                termindato,
                situasjon,
                erFarEllerMedmor,
                erAleneOmOmsorg,
            );
        }
        case Periodetype.PeriodeUtenUttak:
            return intl.formatMessage({ id: 'uttaksplan.periodetype.periodeUtenUttak.tittel' });
        case Periodetype.Overføring:
            return getStønadskontoNavn(intl, periode.konto, navnPåForeldre, erFarEllerMedmor);
        case Periodetype.Utsettelse:
            if (periode.årsak) {
                return intl.formatMessage(
                    { id: 'uttaksplan.periodeliste.utsettelsesårsak' },
                    {
                        årsak: intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${periode.årsak}` }),
                    },
                );
            }
            return intl.formatMessage({ id: 'uttaksplan.periodeliste.utsettelsesårsak.ukjent' });
        case Periodetype.Opphold:
            return getOppholdskontoNavn(
                intl,
                periode.årsak,
                getForelderNavn(periode.forelder, navnPåForeldre),
                periode.forelder === 'MOR',
            );
        case Periodetype.Hull:
            return intl.formatMessage({ id: 'uttaksplan.periodetype.hull.tittel' });
        case Periodetype.Info:
            return getPeriodeTittelInfoPeriode(intl, periode, navnPåForeldre, erFarEllerMedmor);
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
    return saksperiode ? saksperiode.resultat.innvilget : false;
};

const getSaksperiode = (periode: Periode, ekisterendeSak: EksisterendeSak) => {
    return ekisterendeSak.saksperioder.find((saksperiode) =>
        erTidsperioderLike(convertTidsperiodeToTidsperiodeDate(saksperiode.periode), periode.tidsperiode),
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

export const getSamtidigUttakEllerGraderingsProsent = (
    periode: UttakAnnenPartInfoPeriode | Uttaksperiode,
): number | undefined => {
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

export const getSamtidigUttaksprosent = (
    gradertPeriode: boolean | undefined,
    stillingsprosent: string | undefined,
): string => {
    return gradertPeriode && stillingsprosent ? (100 - parseInt(stillingsprosent, 10)).toString() : '100';
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
        case Periodetype.Info:
            return 'uttaksplan.slettPeriode.info';
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

export const erUtsettelseTilbakeITid = (periode: Periode) =>
    periode.type === Periodetype.Utsettelse && !isDateInTheFuture(dateToISOString(periode.tidsperiode.fom));

export const erUtsettelse = (periode: Periode) => periode.type === Periodetype.Utsettelse;

export const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UtsettelseÅrsakType | OverføringÅrsakType) =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker ||
    årsak === OverføringÅrsakType.institusjonsoppholdAnnenForelder ||
    årsak === OverføringÅrsakType.sykdomAnnenForelder;

export const finnesPeriodeIOpprinneligPlan = (periode: Periode, opprinneligPlan: Periode[]): boolean => {
    return opprinneligPlan.some((op) => Perioden(periode).erLik(op, true, true));
};

export const getAnnenForelderSamtidigUttakPeriode = (periode: Periode, perioder: Periode[]): Periode | undefined => {
    if (isUttaksperiode(periode)) {
        return perioder
            .filter((p) => isUttakAnnenPart(p))
            .find(
                (p) =>
                    isUttakAnnenPart(p) &&
                    dayjs(periode.tidsperiode.fom).isSame(p.tidsperiode.fom) &&
                    p.ønskerSamtidigUttak === true &&
                    p.id !== periode.id,
            );
    }

    return undefined;
};

export const getIsValidStateForPerioder = (previousState: PeriodeValidState[], periode: Periode, isValid: boolean) => {
    const periodeIState = previousState.find((p) => p.id === periode.id);
    if (periodeIState && periodeIState.isValid !== isValid) {
        return previousState.map((p) => {
            if (p.id === periodeIState.id) {
                return { ...p, isValid };
            }
            return p;
        });
    }
    if (!periodeIState) {
        return [...previousState, { id: periode.id, isValid }];
    }
    return previousState;
};

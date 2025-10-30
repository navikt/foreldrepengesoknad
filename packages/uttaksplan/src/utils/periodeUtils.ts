import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import {
    EksisterendeSak,
    Forelder,
    InfoPeriode,
    NavnPåForeldre,
    OpprinneligSøkt,
    Periode,
    PeriodeInfoType,
    PeriodeValidState,
    Periodetype,
    Situasjon,
    Tidsperiode,
    TidsperiodeDate,
    Uttaksperiode,
    isUttakAnnenPart,
    isUttaksperiode,
    isUttaksperiodeAnnenpartEøs,
} from '@navikt/fp-common';
import {
    KontoTypeUttak_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakOverføringÅrsak_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetter, erTidsperioderLike, getFloatFromString } from '@navikt/fp-utils';

import { ISOStringToDate } from '../formik-wrappers';
import { Perioden } from './Perioden';
import { convertTidsperiodeToTidsperiodeDate } from './dateUtils';
import { getStønadskontoNavn, getUttakAnnenPartStønadskontoNavn } from './stønadskontoerUtils';
import { appendPeriodeNavnHvisUttakRundtFødselFarMedmor } from './wlbUtils';

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
    pst !== undefined && Number.isNaN(Number.parseFloat(pst)) === false;

const prettifyProsent = (pst: string | undefined): number | undefined => {
    if (pst === undefined) {
        return undefined;
    }

    const nbr = Number.parseFloat(pst);
    if (Number.isNaN(nbr)) {
        return undefined;
    }
    if (Math.round(nbr) === nbr) {
        return Math.round(nbr);
    }
    return nbr;
};

const getUttaksprosentFromStillingsprosent = (
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
    årsak: UttakOppholdÅrsak_fpoversikt,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);
    if (erMor) {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}` },
            { foreldernavn: navn },
        );
    }
    //TODO: sjekk at disse intl keys stemmer
    return intl.formatMessage({ id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}` }, { foreldernavn: navn });
};

export const getStønadskontoFromOppholdsårsak = (årsak: UttakOppholdÅrsak_fpoversikt): KontoTypeUttak_fpoversikt => {
    if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
        return 'FEDREKVOTE';
    }

    if (årsak === 'MØDREKVOTE_ANNEN_FORELDER') {
        return 'MØDREKVOTE';
    }

    if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
        return 'FELLESPERIODE';
    }

    if (årsak === 'FORELDREPENGER_ANNEN_FORELDER') {
        return 'FORELDREPENGER';
    }

    return 'FORELDREPENGER_FØR_FØDSEL';
};

export const getOppholdsÅrsakFromStønadskonto = (
    konto: KontoTypeUttak_fpoversikt,
): UttakOppholdÅrsak_fpoversikt | undefined => {
    switch (konto) {
        case 'FEDREKVOTE':
            return 'FEDREKVOTE_ANNEN_FORELDER';
        case 'MØDREKVOTE':
            return 'MØDREKVOTE_ANNEN_FORELDER';
        case 'FELLESPERIODE':
            return 'FELLESPERIODE_ANNEN_FORELDER';
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
                isUttaksperiodeAnnenpartEøs(periode) ? undefined : periode.samtidigUttakProsent,
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
export const erPeriodeInnvilget = (periode: Periode, eksisterendeSak?: EksisterendeSak): boolean => {
    if (eksisterendeSak === undefined) {
        return false;
    }
    const saksperiode = getSaksperiode(periode, eksisterendeSak);
    return saksperiode ? !!saksperiode.resultat?.innvilget : false;
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
export const getSamtidigUttaksprosent = (
    gradertPeriode: boolean | undefined,
    stillingsprosent: string | undefined,
): string => {
    return gradertPeriode && stillingsprosent ? (100 - Number.parseInt(stillingsprosent, 10)).toString() : '100';
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

export const erÅrsakSykdomEllerInstitusjonsopphold = (
    årsak: UttakUtsettelseÅrsak_fpoversikt | UttakOverføringÅrsak_fpoversikt,
) =>
    årsak === 'SØKER_SYKDOM' ||
    årsak === 'BARN_INNLAGT' ||
    årsak === 'SØKER_INNLAGT' ||
    årsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' ||
    årsak === 'SYKDOM_ANNEN_FORELDER';

export const finnesPeriodeIOpprinneligPlan = (periode: Periode, opprinneligPlan: Periode[]): boolean => {
    return opprinneligPlan.some((op) => Perioden(periode).erLik(op, true, true));
};

export const getAnnenForelderSamtidigUttakPeriode = (periode: Periode, perioder: Periode[]): Periode | undefined => {
    if (isUttaksperiode(periode)) {
        return perioder
            .filter((p) => isUttakAnnenPart(p))
            .find(
                (p) =>
                    ((isUttakAnnenPart(p) && p.ønskerSamtidigUttak === true) || isUttaksperiodeAnnenpartEøs(p)) &&
                    dayjs(periode.tidsperiode.fom).isSame(p.tidsperiode.fom) &&
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

import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { Forelder, PeriodeColor, StønadskontoType } from '@navikt/fp-constants';
import { Barn, SaksperiodeNy, UtsettelseÅrsakType, isAdoptertBarn, isFødtBarn, isUfødtBarn } from '@navikt/fp-types';
import { Period } from '@navikt/fp-ui';
import {
    UttaksdagenString,
    capitalizeFirstLetter,
    formatDateIso,
    formaterDatoUtenDag,
    getFamiliehendelsedato,
    getForelderFarge,
    getNavnGenitivEierform,
    getUttaksperiodeFarge,
} from '@navikt/fp-utils';
import { PeriodeHullType } from '@navikt/fp-uttaksplan-ny';

import {
    getAnnenForelderSamtidigUttakPeriode,
    getIndexOfSistePeriodeFørDato,
    isAvslåttPeriode,
    isAvslåttPeriodeFørsteSeksUkerMor,
    isUttaksperiode,
} from './helpers/uttaksplanHelpers';

export type KalenderPeriode = {
    periodeHullÅrsak?: PeriodeHullType;
} & SaksperiodeNy;

const getUtsettelseÅrsakTekst = (årsak: UtsettelseÅrsakType, intl: IntlShape) => {
    if (årsak === UtsettelseÅrsakType.Arbeid) {
        return intl.formatMessage({ id: `kalender.utsettelse.ARBEID` });
    }
    if (årsak === UtsettelseÅrsakType.InstitusjonBarnet) {
        return intl.formatMessage({ id: `kalender.utsettelse.INSTITUSJONSOPPHOLD_BARNET` });
    }
    if (årsak === UtsettelseÅrsakType.InstitusjonSøker) {
        return intl.formatMessage({ id: `kalender.utsettelse.INSTITUSJONSOPPHOLD_SØKER` });
    }
    if (årsak === UtsettelseÅrsakType.Ferie) {
        return intl.formatMessage({ id: `kalender.utsettelse.LOVBESTEMT_FERIE` });
    }
    if (årsak === UtsettelseÅrsakType.Sykdom) {
        return intl.formatMessage({ id: `kalender.utsettelse.SYKDOM` });
    }
    if (årsak === UtsettelseÅrsakType.HvØvelse) {
        return intl.formatMessage({ id: `kalender.utsettelse.HV_OVELSE` });
    }
    if (årsak === UtsettelseÅrsakType.NavTiltak) {
        return intl.formatMessage({ id: `kalender.utsettelse.NAV_TILTAK` });
    }
    return '';
};

const getUtsettelseLabel = (unikeUtsettelseÅrsaker: UtsettelseÅrsakType[], intl: IntlShape): string => {
    if (unikeUtsettelseÅrsaker.length === 1 && unikeUtsettelseÅrsaker[0] !== UtsettelseÅrsakType.Fri) {
        const årsakTekst = getUtsettelseÅrsakTekst(unikeUtsettelseÅrsaker[0], intl);
        return intl.formatMessage({ id: 'kalender.utsettelse' }, { årsak: årsakTekst });
    }
    return intl.formatMessage({ id: 'kalender.dinUtsettelse' });
};

export const getFamiliehendelseKalendarLabel = (barn: Barn, intl: IntlShape): string => {
    if (!isAdoptertBarn(barn)) {
        return isFødtBarn(barn)
            ? intl.formatMessage({ id: 'kalender.fødsel' })
            : intl.formatMessage({ id: 'kalender.termin' });
    }
    return intl.formatMessage({ id: 'kalender.adopsjon' });
};

const getSkjermlesertekstForFamiliehendelse = (barn: Barn, intl: IntlShape): string => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsenavn = getFamiliehendelseKalendarLabel(barn, intl);
    return intl.formatMessage(
        { id: 'kalender.skjermleser.familiehendelse' },
        { familiehendelsenavn, dato: formaterDatoUtenDag(familiehendelsesdato) },
    );
};

export const getKalenderPeriodenavn = (
    color: PeriodeColor,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelseÅrsakType[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): string => {
    switch (color) {
        case PeriodeColor.BLUE:
        case PeriodeColor.GREEN:
            return intl.formatMessage({ id: 'kalender.dinPeriode' });
        case PeriodeColor.BLUESTRIPED:
        case PeriodeColor.GREENSTRIPED:
            return intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
        case PeriodeColor.LIGHTBLUE:
        case PeriodeColor.LIGHTGREEN:
            return intl.formatMessage(
                { id: 'kalender.annenPartPeriode' },
                { navnAnnenPart: getNavnGenitivEierform(capitalizeFirstLetter(navnAnnenPart), intl.locale) },
            );
        case PeriodeColor.LIGHTBLUEGREEN:
        case PeriodeColor.LIGHTGREENBLUE:
            return intl.formatMessage(
                { id: 'kalender.samtidigUttak' },
                { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
            );
        case PeriodeColor.GREENOUTLINE:
            return erFarEllerMedmor
                ? getUtsettelseLabel(unikeUtsettelseÅrsaker, intl)
                : intl.formatMessage(
                      { id: 'kalender.utsettelseAnnenPart' },
                      { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
                  );

        case PeriodeColor.BLUEOUTLINE:
            return erFarEllerMedmor
                ? intl.formatMessage(
                      { id: 'kalender.utsettelseAnnenPart' },
                      { navnAnnenPart: capitalizeFirstLetter(navnAnnenPart) },
                  )
                : getUtsettelseLabel(unikeUtsettelseÅrsaker, intl);
        case PeriodeColor.BLACK:
            return intl.formatMessage({ id: 'kalender.tapteDager' });
        case PeriodeColor.GRAY:
            return intl.formatMessage({ id: 'kalender.helg' });
        default:
            return '';
    }
};

export const getKalenderSkjermlesertekstForPeriode = (
    period: Period,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelseÅrsakType[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): string | undefined => {
    if ([PeriodeColor.NONE, PeriodeColor.GRAY].includes(period.color)) {
        return undefined;
    }
    if (period.color === PeriodeColor.PINK) {
        return getSkjermlesertekstForFamiliehendelse(barn, intl);
    }
    const periodeNavn = getKalenderPeriodenavn(
        period.color,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        erFarEllerMedmor,
        intl,
    );
    return intl.formatMessage(
        { id: 'kalender.skjermleser.periode' },
        {
            periodeNavn,
            fraDato: formaterDatoUtenDag(period.fom),
            tilDato: formaterDatoUtenDag(period.tom),
        },
    );
};

export const slåSammenPerioder = (periods: Period[]) => {
    if (periods.length <= 1) {
        return periods;
    }

    return periods.reduce((res, period, index) => {
        const sisteRes = res.at(-1);

        if (
            index !== 0 &&
            sisteRes &&
            period.color === sisteRes.color &&
            dayjs(UttaksdagenString(sisteRes.tom).neste()).isSame(dayjs(period.fom), 'day')
        ) {
            sisteRes.tom = period.tom;
            return res;
        } else {
            res.push(period);
            return res;
        }
    }, [] as Period[]);
};

export const getPerioderForKalendervisning = (
    allePerioder: KalenderPeriode[],
    erFarEllerMedmor: boolean,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelseÅrsakType[],
    intl: IntlShape,
    erIPlanleggerModus: boolean,
    foreldrepengerHarAktivitetskrav: boolean,
    barnehagestartdato?: string,
): Period[] => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const allePerioderBortsettFraFamiliehendelseperioden = allePerioder.filter(
        (p) =>
            !(dayjs(p.fom).isSame(familiehendelsesdato, 'd') && dayjs(p.tom).isSame(familiehendelsesdato, 'd')) &&
            p.fom !== undefined &&
            p.tom !== undefined,
    );

    const unikePerioder = allePerioderBortsettFraFamiliehendelseperioden.reduce((alle, periode) => {
        const erSøkersPeriode = erPeriodeForSøker(periode, erFarEllerMedmor);
        const filtrerte = allePerioderBortsettFraFamiliehendelseperioden.filter(
            (p) => p.fom === periode.fom && p.tom === periode.tom,
        );
        return filtrerte.length > 1 && !erSøkersPeriode ? alle : alle.concat(periode);
    }, [] as KalenderPeriode[]);

    const barnehageperiode = { fom: barnehagestartdato, tom: barnehagestartdato, color: PeriodeColor.PURPLE } as Period;

    const res = unikePerioder.reduce((acc, periode) => {
        const color = erIPlanleggerModus
            ? getKalenderFargeForPeriodeTypePlanlegger(
                  periode,
                  erFarEllerMedmor,
                  allePerioder,
                  foreldrepengerHarAktivitetskrav,
              )
            : getKalenderFargeForPeriodeType(periode, erFarEllerMedmor, allePerioder, barn);

        if (
            barnehagestartdato !== undefined &&
            dayjs(barnehagestartdato).isBetween(periode.fom, periode.tom, 'day', '[]')
        ) {
            return [
                ...acc,
                {
                    fom: periode.fom,
                    tom: dayjs(barnehagestartdato).subtract(1, 'day').format('YYYY-MM-DD'),
                    color: color,
                },
                {
                    fom: dayjs(barnehagestartdato).add(1, 'day').format('YYYY-MM-DD'),
                    tom: periode.tom,
                    color: color,
                },
            ];
        }

        return [
            ...acc,
            {
                fom: dayjs(periode.fom).isSame(dayjs(familiehendelsesdato), 'd')
                    ? formatDateIso(UttaksdagenString(periode.fom).neste())
                    : formatDateIso(periode.fom),
                tom: formatDateIso(periode.tom),
                color,
            },
        ];
    }, [] as Period[]);

    const perioderForVisning =
        barnehagestartdato !== undefined
            ? res.concat(barnehageperiode).sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)))
            : res;

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(allePerioder, familiehendelsesdato) ?? 0;
    perioderForVisning.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: PeriodeColor.PINK,
    });

    const perioderSlåttSammen = slåSammenPerioder(perioderForVisning);
    return perioderSlåttSammen.map((p) => ({
        ...p,
        srText: getKalenderSkjermlesertekstForPeriode(
            p,
            barn,
            navnAnnenPart,
            unikeUtsettelseÅrsaker,
            erFarEllerMedmor,
            intl,
        ),
    }));
};

export const getKalenderFargeForUttaksperiode = (
    periode: KalenderPeriode,
    allePerioder: KalenderPeriode[],
    erFarEllerMedmor: boolean,
): PeriodeColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent = isUttaksperiode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode && samtidigUttaksprosent && samtidigUttaksprosent > 0) {
        return erFarEllerMedmor ? PeriodeColor.LIGHTBLUEGREEN : PeriodeColor.LIGHTGREENBLUE;
    }

    if (
        !annenForelderSamtidigUttaksperiode &&
        !samtidigUttaksprosent &&
        isUttaksperiode(periode) &&
        periode.gradering
    ) {
        return erFarEllerMedmor ? PeriodeColor.GREENSTRIPED : PeriodeColor.BLUESTRIPED;
    }

    if (!periode.kontoType) {
        return PeriodeColor.NONE;
    }

    return getUttaksperiodeFarge(periode.kontoType, periode.forelder, erFarEllerMedmor);
};

export const getKalenderFargeForPeriodeUtenUttak = (periode: KalenderPeriode, barn: Barn): PeriodeColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFødsel = isFødtBarn(barn) || isUfødtBarn(barn);
    const treUkerFørFamhendelse = dayjs(familiehendelsesdato).subtract(3, 'weeks');
    if (erFødsel && dayjs(periode.tom).isBetween(familiehendelsesdato, treUkerFørFamhendelse, 'd')) {
        return PeriodeColor.BLACK;
    }
    return PeriodeColor.NONE;
};

export const getKalenderFargeForAnnenPart = (periode: KalenderPeriode, erFarEllerMedmor: boolean): PeriodeColor => {
    if (periode.utsettelseÅrsak) {
        return erFarEllerMedmor ? PeriodeColor.BLUEOUTLINE : PeriodeColor.GREENOUTLINE;
    }
    if (periode.forelder && (periode.overføringÅrsak || isUttaksperiode(periode))) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    return PeriodeColor.NONE;
};

export const erPeriodeForSøker = (periode: KalenderPeriode, erFarEllerMedmor: boolean) =>
    (periode.forelder === Forelder.mor && !erFarEllerMedmor) ||
    (periode.forelder === Forelder.farMedmor && erFarEllerMedmor);

export const getKalenderFargeForPeriodeTypePlanlegger = (
    periode: KalenderPeriode,
    erFarEllerMedmor: boolean,
    allePerioder: KalenderPeriode[],
    foreldrepengerHarAktivitetskrav: boolean,
): PeriodeColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent = isUttaksperiode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode && samtidigUttaksprosent && samtidigUttaksprosent > 0) {
        return erFarEllerMedmor ? PeriodeColor.LIGHTBLUEGREEN : PeriodeColor.LIGHTGREENBLUE;
    }

    if (periode.utsettelseÅrsak) {
        return PeriodeColor.BLUEOUTLINE;
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return PeriodeColor.BLACK;
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return PeriodeColor.NONE;
    }

    if (periode.kontoType === StønadskontoType.ForeldrepengerFørFødsel) {
        return PeriodeColor.BLUE;
    }

    if (periode.kontoType === StønadskontoType.AktivitetsfriKvote) {
        return PeriodeColor.BLUE;
    }

    if (periode.kontoType === StønadskontoType.Foreldrepenger) {
        if (foreldrepengerHarAktivitetskrav) {
            return erFarEllerMedmor ? PeriodeColor.LIGHTGREEN : PeriodeColor.BLUE;
        }

        return PeriodeColor.BLUE;
    }

    if (periode.forelder === Forelder.mor) {
        return PeriodeColor.BLUE;
    }

    if (periode.forelder === Forelder.farMedmor) {
        return PeriodeColor.LIGHTGREEN;
    }

    return PeriodeColor.NONE;
};

export const getKalenderFargeForPeriodeType = (
    periode: KalenderPeriode,
    erFarEllerMedmor: boolean,
    allePerioder: KalenderPeriode[],
    barn: Barn,
): PeriodeColor => {
    if (isAvslåttPeriode(periode)) {
        const familiehendelsesdato = getFamiliehendelsedato(barn);
        return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato)
            ? PeriodeColor.BLACK
            : PeriodeColor.NONE;
    }

    if (periode.utsettelseÅrsak) {
        return periode.forelder === Forelder.farMedmor ? PeriodeColor.GREENOUTLINE : PeriodeColor.BLUEOUTLINE;
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return getKalenderFargeForPeriodeUtenUttak(periode, barn);
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return PeriodeColor.BLACK;
    }

    if (periode.overføringÅrsak || isUttaksperiode(periode)) {
        return getKalenderFargeForUttaksperiode(periode, allePerioder, erFarEllerMedmor);
    }

    if (periode.oppholdÅrsak && periode.forelder) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    if (!erPeriodeForSøker(periode, erFarEllerMedmor)) {
        return getKalenderFargeForAnnenPart(periode, erFarEllerMedmor);
    }

    return PeriodeColor.NONE;
};

export const getInneholderKalenderHelgedager = (periods: Period[]): boolean => {
    const førsteDag = periods[0].fom;
    const sisteDag = periods.at(-1)!.tom;
    if (dayjs(sisteDag).diff(dayjs(førsteDag), 'days') > 5) {
        return true;
    }
    const førsteDagNr = dayjs(førsteDag).get('day');
    const sisteDagNr = dayjs(sisteDag).get('day');
    return sisteDagNr < førsteDagNr;
};

export const getUnikeUtsettelsesårsaker = (allePerioderInklHull: KalenderPeriode[]) => {
    const utsettelseÅrsaker = allePerioderInklHull
        .map((u) => u.utsettelseÅrsak)
        .filter((utsettelseÅrsak): utsettelseÅrsak is UtsettelseÅrsakType => !!utsettelseÅrsak);
    return [...new Set(utsettelseÅrsaker)];
};

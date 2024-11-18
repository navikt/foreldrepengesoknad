import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FunctionComponent, ReactElement } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button } from '@navikt/ds-react';

import { BarnType, Forelder, PeriodeColor, StønadskontoType } from '@navikt/fp-constants';
import { Barn, SaksperiodeNy, UtsettelseÅrsakType, isFødtBarn, isUfødtBarn } from '@navikt/fp-types';
import { Calendar, Period } from '@navikt/fp-ui';
import {
    UttaksdagenString,
    formatDateIso,
    getFamiliehendelsedato,
    getForelderFarge,
    getUttaksperiodeFarge,
} from '@navikt/fp-utils';
import { PeriodeHullType, Planperiode, finnOgSettInnHull } from '@navikt/fp-uttaksplan-ny';

import { UttaksplanLegend } from './UttaksplanLegend';
import {
    getAnnenForelderSamtidigUttakPeriode,
    getIndexOfSistePeriodeFørDato,
    isAvslåttPeriode,
    isAvslåttPeriodeFørsteSeksUkerMor,
    isUttaksperiode,
} from './helpers/uttaksplanHelpers';
import styles from './uttaksplanKalender.module.css';
import { getKalenderSkjermlesertekstForPeriode } from './uttaksplanKalenderUtils';

type KalenderPeriode = {
    periodeHullÅrsak?: PeriodeHullType;
} & SaksperiodeNy;

const slåSammenPerioder = (periods: Period[]) => {
    if (periods.length <= 1) {
        return periods;
    }

    return periods.reduce((res, period, index) => {
        if (
            index !== 0 &&
            period.color === res[res.length - 1].color &&
            dayjs(UttaksdagenString(res[res.length - 1].tom).neste()).isSame(dayjs(period.fom), 'day')
        ) {
            res[res.length - 1].tom = period.tom;
            return res;
        } else {
            res.push(period);
            return res;
        }
    }, [] as Period[]);
};

const getPerioderForKalendervisning = (
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
            ? getKalenderFargeForPeriodeTypePlanlegger(periode, erFarEllerMedmor, foreldrepengerHarAktivitetskrav)
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

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(allePerioder, familiehendelsesdato) || 0;
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

const getKalenderFargeForUttaksperiode = (
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

const getKalenderFargeForPeriodeUtenUttak = (periode: KalenderPeriode, barn: Barn): PeriodeColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFødsel = isFødtBarn(barn) || isUfødtBarn(barn);
    const treUkerFørFamhendelse = dayjs(familiehendelsesdato).subtract(3, 'weeks');
    if (erFødsel && dayjs(periode.tom).isBetween(familiehendelsesdato, treUkerFørFamhendelse, 'd')) {
        return PeriodeColor.BLACK;
    }
    return PeriodeColor.NONE;
};

const getKalenderFargeForAnnenPart = (periode: KalenderPeriode, erFarEllerMedmor: boolean): PeriodeColor => {
    if (periode.utsettelseÅrsak) {
        return erFarEllerMedmor ? PeriodeColor.BLUEOUTLINE : PeriodeColor.GREENOUTLINE;
    }
    if (periode.forelder && (periode.overføringÅrsak || isUttaksperiode(periode))) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    return PeriodeColor.NONE;
};

const erPeriodeForSøker = (periode: KalenderPeriode, erFarEllerMedmor: boolean) =>
    (periode.forelder === Forelder.mor && !erFarEllerMedmor) ||
    (periode.forelder === Forelder.farMedmor && erFarEllerMedmor);

const getKalenderFargeForPeriodeTypePlanlegger = (
    periode: KalenderPeriode,
    erFarEllerMedmor: boolean,
    foreldrepengerHarAktivitetskrav: boolean,
): PeriodeColor => {
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

const getKalenderFargeForPeriodeType = (
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

const getInneholderKalenderHelgedager = (periods: Period[]): boolean => {
    const førsteDag = periods[0].fom;
    const sisteDag = periods[periods.length - 1].tom;
    if (dayjs(sisteDag).diff(dayjs(førsteDag), 'days') > 5) {
        return true;
    }
    const førsteDagNr = dayjs(førsteDag).get('day');
    const sisteDagNr = dayjs(sisteDag).get('day');
    return sisteDagNr < førsteDagNr;
};

const getUnikeUtsettelsesårsaker = (allePerioderInklHull: KalenderPeriode[]) => {
    const utsettelseÅrsaker = allePerioderInklHull
        .map((u) => u.utsettelseÅrsak)
        .filter((utsettelseÅrsak): utsettelseÅrsak is UtsettelseÅrsakType => !!utsettelseÅrsak);
    return [...new Set(utsettelseÅrsaker)];
};

interface UttaksplanKalenderProps {
    søkersPerioder: SaksperiodeNy[];
    annenPartsPerioder?: SaksperiodeNy[];
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erFarEllerMedmor: boolean;
    bareFarHarRett: boolean;
    barn: Barn;
    navnAnnenPart: string;
    førsteUttaksdagNesteBarnsSak?: string;
    planleggerLegend?: ReactElement<any>;
    barnehagestartdato?: string;
}

export const UttaksplanKalender: FunctionComponent<UttaksplanKalenderProps> = ({
    søkersPerioder,
    annenPartsPerioder,
    harAktivitetskravIPeriodeUtenUttak,
    erFarEllerMedmor,
    bareFarHarRett,
    barn,
    navnAnnenPart,
    førsteUttaksdagNesteBarnsSak,
    planleggerLegend,
    barnehagestartdato,
}) => {
    const intl = useIntl();
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erAdopsjon = barn.type === BarnType.ADOPTERT_ANNET_BARN || barn.type === BarnType.ADOPTERT_STEBARN;
    const erIPlanleggerModus = planleggerLegend !== undefined;

    const allePerioder = [...søkersPerioder.concat(annenPartsPerioder || [])].sort((p1, p2) =>
        dayjs(p1.fom).isBefore(p2.fom) ? -1 : 1,
    );

    const foreldrepengerHarAktivitetskrav =
        allePerioder.find((p) => p.kontoType === StønadskontoType.Foreldrepenger) !== undefined &&
        allePerioder.find((p) => p.kontoType === StønadskontoType.AktivitetsfriKvote) !== undefined;

    const søkersHullPerioder = finnOgSettInnHull(
        allePerioder as Planperiode[],
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    )
        .filter((p) => !!p.periodeHullÅrsak)
        .map<KalenderPeriode>((p) => ({
            fom: p.fom,
            tom: p.tom,
            forelder: søkersPerioder[0].forelder,
            periodeHullÅrsak: p.periodeHullÅrsak,
        }));

    const allePerioderInklHull = [...allePerioder.concat(søkersHullPerioder)].sort((p1, p2) =>
        dayjs(p1.fom).isBefore(p2.fom) ? -1 : 1,
    );

    const unikeUtsettelseÅrsaker = getUnikeUtsettelsesårsaker(allePerioderInklHull);

    const perioderForKalendervisning = getPerioderForKalendervisning(
        allePerioderInklHull,
        erFarEllerMedmor,
        barn,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        intl,
        erIPlanleggerModus,
        foreldrepengerHarAktivitetskrav,
        barnehagestartdato,
    );

    const inkludererHelg = getInneholderKalenderHelgedager(perioderForKalendervisning);
    const unikePeriodefarger = [...new Set(perioderForKalendervisning.map((period) => period.color))];
    if (inkludererHelg) {
        unikePeriodefarger.push(PeriodeColor.GRAY);
    }

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } as Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    const harAvslåttePerioderSomIkkeGirTapteDager = allePerioderInklHull.some(
        (p) => isAvslåttPeriode(p) && (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsesdato)),
    );

    return (
        <div>
            {harAvslåttePerioderSomIkkeGirTapteDager && (
                <Alert variant="info" style={{ margin: '1.5rem 0rem' }}>
                    <FormattedMessage id="kalender.avslåttePerioder" />
                </Alert>
            )}
            <div ref={targetRef}>
                <div className={styles.legend} style={{ display: 'flex', flexWrap: 'wrap' }} id="legend">
                    {planleggerLegend !== undefined ? (
                        <>{planleggerLegend}</>
                    ) : (
                        <UttaksplanLegend
                            uniqueColors={unikePeriodefarger}
                            barn={barn}
                            navnAnnenPart={navnAnnenPart}
                            unikeUtsettelseÅrsaker={unikeUtsettelseÅrsaker}
                            erFarEllerMedmor={erFarEllerMedmor}
                        />
                    )}
                </div>
                <Calendar periods={perioderForKalendervisning} />
            </div>
            <Button className={styles.button} variant="tertiary" icon={<DownloadIcon />} onClick={() => toPDF()}>
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </div>
    );
};

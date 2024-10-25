import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button } from '@navikt/ds-react';

import { BarnType, Forelder, PeriodeColor } from '@navikt/fp-constants';
import { Barn, SaksperiodeNy, UtsettelseÅrsakType, isFødtBarn, isUfødtBarn } from '@navikt/fp-types';
import { Calendar, Period } from '@navikt/fp-ui';
import {
    UttaksdagenString,
    formatDateIso,
    getFamiliehendelsedato,
    getForelderFarge,
    getUttaksperiodeFarge,
} from '@navikt/fp-utils';
import { finnOgSettInnHull } from '@navikt/fp-uttaksplan-ny';
import { PeriodeHullType, Planperiode } from '@navikt/fp-uttaksplan-ny/src/types/Planperiode';

import UttaksplanLegend from './UttaksplanLegend';
import {
    getAnnenForelderSamtidigUttakPeriode,
    getIndexOfSistePeriodeFørDato,
    isAvslåttPeriode,
    isAvslåttPeriodeFørsteSeksUkerMor,
    isUttaksperiode,
} from './helpers/uttaksplanHelpers';
import styles from './uttaksplanKalender.module.css';
import { getKalenderSkjermlesertekstForPeriode } from './uttaksplanKalenderUtils';

const slåSammenPeriods = (periods: Period[]) => {
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
): Period[] => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const pe = allePerioder.filter(
        (p) =>
            !(dayjs(p.fom).isSame(familiehendelsesdato, 'd') && dayjs(p.tom).isSame(familiehendelsesdato, 'd')) &&
            p.fom !== undefined &&
            p.tom !== undefined,
    );

    const perioderForVisning = pe.reduce((allPeriods, period) => {
        if (allPeriods.some((a) => a.fom === period.fom || a.tom === period.tom)) {
            return allPeriods;
        }
        return allPeriods.concat(period);
    }, [] as KalenderPeriode[]);

    const periods = perioderForVisning.map((p) => {
        const color = getKalenderFargeForPeriodeType(p, erFarEllerMedmor, allePerioder, barn);
        return {
            fom: dayjs(p.fom).isSame(dayjs(familiehendelsesdato), 'd')
                ? formatDateIso(UttaksdagenString(p.fom).neste())
                : formatDateIso(p.fom),
            tom: formatDateIso(p.tom),
            color,
        };
    });

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(allePerioder, familiehendelsesdato) || 0;
    periods.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: PeriodeColor.PINK,
    });
    const perioderSlåttSammen = slåSammenPeriods(periods);
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
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
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
    //TODO Bør denne visast?
    // if (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin) {
    //     return PeriodeColor.NONE;
    // }
    //TODO Blir sikkert feil?
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
    if (periode.overføringÅrsak || isUttaksperiode(periode)) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    return PeriodeColor.NONE;
};

const getKalenderFargeForPeriodeType = (
    periode: KalenderPeriode,
    erFarEllerMedmor: boolean,
    allePerioder: KalenderPeriode[],
    barn: Barn,
): PeriodeColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erPeriodeForSøker =
        (periode.forelder === Forelder.mor && !erFarEllerMedmor) ||
        (periode.forelder === Forelder.farMedmor && erFarEllerMedmor);

    if (isAvslåttPeriode(periode)) {
        return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato)
            ? PeriodeColor.BLACK
            : PeriodeColor.NONE;
    }
    if (periode.utsettelseÅrsak) {
        return periode.forelder === Forelder.farMedmor ? PeriodeColor.GREENOUTLINE : PeriodeColor.BLUEOUTLINE;
    }
    if (periode.periodeHullÅrsak && periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return getKalenderFargeForPeriodeUtenUttak(periode, barn);
    }
    if (periode.periodeHullÅrsak && periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return PeriodeColor.BLACK;
    }
    if (!erPeriodeForSøker) {
        return getKalenderFargeForAnnenPart(periode, erFarEllerMedmor);
    }
    if (periode.overføringÅrsak || isUttaksperiode(periode)) {
        return getKalenderFargeForUttaksperiode(periode, allePerioder, erFarEllerMedmor);
    }
    if (periode.oppholdÅrsak) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
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

type KalenderPeriode = {
    periodeHullÅrsak?: PeriodeHullType;
} & SaksperiodeNy;

export interface UttaksplanKalenderProps {
    søkersPerioder: KalenderPeriode[];
    annenPartsPerioder?: KalenderPeriode[];
    erFarEllerMedmor: boolean;
    barn: Barn;
    navnAnnenPart: string;
}

export const UttaksplanKalender: FunctionComponent<UttaksplanKalenderProps> = ({
    søkersPerioder,
    annenPartsPerioder,
    erFarEllerMedmor,
    barn,
    navnAnnenPart,
}) => {
    const intl = useIntl();
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erAdopsjon = barn.type === BarnType.ADOPTERT_ANNET_BARN || barn.type === BarnType.ADOPTERT_STEBARN;

    const allePerioder = [...søkersPerioder.concat(annenPartsPerioder || [])].sort((p1, p2) =>
        dayjs(p1.fom).isBefore(p2.fom) ? -1 : 1,
    );

    //FIXME Sjå på input til funksjon
    const søkersHullPerioder = finnOgSettInnHull(
        allePerioder as Planperiode[],
        false,
        familiehendelsesdato,
        erAdopsjon,
        false,
        erFarEllerMedmor,
        undefined,
    )
        .filter((p) => !!p.periodeHullÅrsak)
        .map<KalenderPeriode>((p) => ({
            fom: p.fom,
            tom: p.tom,
            forelder: søkersPerioder[0].forelder,
            periodeHullÅrsak: p.periodeHullÅrsak,
        }));

    const allePerioderInklHull = [...søkersPerioder.concat(søkersHullPerioder).concat(annenPartsPerioder || [])].sort(
        (p1, p2) => (dayjs(p1.fom).isBefore(p2.fom) ? -1 : 1),
    );

    const utsettelseÅrsaker = allePerioderInklHull
        .map((u) => u.utsettelseÅrsak)
        .filter((utsettelseÅrsak): utsettelseÅrsak is UtsettelseÅrsakType => !!utsettelseÅrsak);
    const unikeUtsettelseÅrsaker = [...new Set(utsettelseÅrsaker)];
    const periods = getPerioderForKalendervisning(
        allePerioderInklHull,
        erFarEllerMedmor,
        barn,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        intl,
    );
    const unikePeriodColors = [...new Set(periods.map((period) => period.color))];
    const harAvslåttePerioderSomIkkeGirTapteDager = allePerioderInklHull.some(
        (p) => isAvslåttPeriode(p) && (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsesdato)),
    );
    const inkludererHelg = getInneholderKalenderHelgedager(periods);
    if (inkludererHelg) {
        unikePeriodColors.push(PeriodeColor.GRAY);
    }

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } as Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    return (
        <>
            {harAvslåttePerioderSomIkkeGirTapteDager && (
                <Alert variant="info" style={{ margin: '1.5rem 0rem' }}>
                    <FormattedMessage id="kalender.avslåttePerioder" />
                </Alert>
            )}
            <div ref={targetRef}>
                <div className={styles.legend} style={{ display: 'flex', flexWrap: 'wrap' }} id="legend">
                    <UttaksplanLegend
                        uniqueColors={unikePeriodColors}
                        barn={barn}
                        navnAnnenPart={navnAnnenPart}
                        unikeUtsettelseÅrsaker={unikeUtsettelseÅrsaker}
                        erFarEllerMedmor={erFarEllerMedmor}
                    />
                </div>
                <Calendar periods={periods} />
            </div>
            <Button className={styles.button} variant="tertiary" icon={<DownloadIcon />} onClick={() => toPDF()}>
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </>
    );
};

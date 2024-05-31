import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button } from '@navikt/ds-react';

import {
    Barn,
    Forelder,
    InfoPeriode,
    Overføringsperiode,
    Periode,
    PeriodeInfoType,
    PeriodeUtenUttak,
    Periodetype,
    Utsettelsesperiode,
    Uttaksdagen,
    Uttaksperiode,
    bemUtils,
    getAnnenForelderSamtidigUttakPeriode,
    getFamiliehendelsedato,
    isAvslåttPeriode,
    isAvslåttPeriodeFørsteSeksUkerMor,
    isForeldrepengerFørFødselUttaksperiode,
    isFødtBarn,
    isInfoPeriode,
    isUfødtBarn,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '@navikt/fp-common';
import { PeriodeColor } from '@navikt/fp-constants';
import { ISOStringToDate, dateToISOString } from '@navikt/fp-formik';
import { Calendar, Period } from '@navikt/fp-ui';

import { getIndexOfSistePeriodeFørDato } from './../../components/periodeliste/Periodeliste';
import { getForelderFarge, getUttaksperiodeFarge } from './../../utils/styleUtils';
import UttaksplanLegend from './UttaksplanLegend';
import './uttaksplanKalender.css';

export interface UttaksplanKalenderProps {
    uttaksplan: Periode[];
    erFarEllerMedmor: boolean;
    barn: Barn;
    navnAnnenPart: string;
}

const getIndexOfFamiliehendelse = (uttaksplan: Periode[], familiehendelsesdato: string) => {
    const indexAvPeriodeUtenForeldrepengerFørFødsel = uttaksplan.findIndex(
        (p) => isForeldrepengerFørFødselUttaksperiode(p) && p.skalIkkeHaUttakFørTermin,
    );
    if (indexAvPeriodeUtenForeldrepengerFørFødsel !== -1) {
        return indexAvPeriodeUtenForeldrepengerFørFødsel;
    }
    return getIndexOfSistePeriodeFørDato(uttaksplan, ISOStringToDate(familiehendelsesdato)) || 0;
};

const slåSammenPeriods = (periods: Period[]) => {
    if (periods.length <= 1) {
        return periods;
    }

    return periods.reduce((res, period, index) => {
        if (index === 0) {
            res.push(period);
            return res;
        }

        if (
            period.color === res[res.length - 1].color &&
            dayjs(Uttaksdagen(ISOStringToDate(res[res.length - 1].tom)!).neste()).isSame(dayjs(period.fom), 'day')
        ) {
            res[res.length - 1].tom = period.tom;
            return res;
        } else {
            res.push(period);
            return res;
        }
    }, [] as Period[]);
};

const getPerioderForKalendervisning = (uttaksplan: Periode[], erFarEllerMedmor: boolean, barn: Barn): Period[] => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const perioderForVisning = uttaksplan.filter(
        (p) =>
            (!isInfoPeriode(p) || p.visPeriodeIPlan) &&
            !(
                dayjs(p.tidsperiode.fom).isSame(familiehendelsesdato, 'd') &&
                dayjs(p.tidsperiode.tom).isSame(familiehendelsesdato, 'd')
            ) &&
            p.tidsperiode.fom !== undefined &&
            p.tidsperiode.tom !== undefined,
    );
    const periods = perioderForVisning.map((p) => ({
        fom: dayjs(p.tidsperiode.fom).isSame(dayjs(familiehendelsesdato), 'd')
            ? dateToISOString(Uttaksdagen(p.tidsperiode.fom).neste())
            : dateToISOString(p.tidsperiode.fom),
        tom: dateToISOString(p.tidsperiode.tom),
        color: getKalenderFargeForPeriodeType(p, erFarEllerMedmor, uttaksplan, barn),
    }));

    const indexOfFamiliehendelse = getIndexOfFamiliehendelse(uttaksplan, familiehendelsesdato);
    periods.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: PeriodeColor.PINK,
    });
    return slåSammenPeriods(periods);
};

const getKalenderFargeForUttaksperiode = (
    periode: Uttaksperiode | Overføringsperiode,
    uttaksplan: Periode[],
    erFarEllerMedmor: boolean,
): PeriodeColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, uttaksplan)
        : undefined;
    if (annenForelderSamtidigUttaksperiode) {
        return erFarEllerMedmor ? PeriodeColor.LIGHTBLUEGREEN : PeriodeColor.LIGHTGREENBLUE;
    }
    if (!annenForelderSamtidigUttaksperiode && isUttaksperiode(periode) && periode.gradert) {
        return erFarEllerMedmor ? PeriodeColor.GREENSTRIPED : PeriodeColor.BLUESTRIPED;
    }
    if (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin) {
        return PeriodeColor.NONE;
    }
    return getUttaksperiodeFarge(periode.konto, periode.forelder, erFarEllerMedmor);
};

const getKalenderFargeForPeriodeUtenUttak = (periode: PeriodeUtenUttak, barn: Barn): PeriodeColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFødsel = isFødtBarn(barn) || isUfødtBarn(barn);
    const treUkerFørFamhendelse = dayjs(familiehendelsesdato).subtract(3, 'weeks');
    if (erFødsel && dayjs(periode.tidsperiode.tom).isBetween(familiehendelsesdato, treUkerFørFamhendelse, 'd')) {
        return PeriodeColor.ORANGE;
    }
    return PeriodeColor.NONE;
};

const getKalenderFargeForInfoperiode = (periode: InfoPeriode, erFarEllerMedmor: boolean, barn: Barn): PeriodeColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    switch (periode.infotype) {
        case PeriodeInfoType.utsettelseAnnenPart:
            return erFarEllerMedmor ? PeriodeColor.BLUEOUTLINE : PeriodeColor.GREENOUTLINE;
        case PeriodeInfoType.uttakAnnenPart:
            return getForelderFarge(periode.forelder, erFarEllerMedmor);
        case PeriodeInfoType.avslåttPeriode:
            return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato)
                ? PeriodeColor.ORANGE
                : PeriodeColor.NONE;
        default:
            return PeriodeColor.NONE;
    }
};

const getKalenderFargeForPeriodeType = (
    periode: Periode,
    erFarEllerMedmor: boolean,
    uttaksplan: Periode[],
    barn: Barn,
): PeriodeColor => {
    switch (periode.type) {
        case Periodetype.Utsettelse:
            return periode.forelder === Forelder.farMedmor ? PeriodeColor.GREENOUTLINE : PeriodeColor.BLUEOUTLINE;
        case Periodetype.PeriodeUtenUttak:
            return getKalenderFargeForPeriodeUtenUttak(periode, barn);
        case Periodetype.Hull:
            return PeriodeColor.ORANGE;
        case Periodetype.Overføring:
        case Periodetype.Uttak:
            return getKalenderFargeForUttaksperiode(periode, uttaksplan, erFarEllerMedmor);
        case Periodetype.Opphold:
            return getForelderFarge(periode.forelder, erFarEllerMedmor);
        case Periodetype.Info:
            return getKalenderFargeForInfoperiode(periode, erFarEllerMedmor, barn);
        default:
            return PeriodeColor.NONE;
    }
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

const UttaksplanKalender: FunctionComponent<UttaksplanKalenderProps> = ({
    uttaksplan,
    erFarEllerMedmor,
    barn,
    navnAnnenPart,
}) => {
    const bem = bemUtils('uttaksplanKalender');
    const periods = getPerioderForKalendervisning(uttaksplan, erFarEllerMedmor, barn);
    const unikePeriodColors = [...new Set(periods.map((period) => period.color))];
    const utsettelser = uttaksplan.filter((p) => isUtsettelsesperiode(p)) as Utsettelsesperiode[];
    const unikeUtsettelseÅrsaker = [...new Set(utsettelser.map((u) => u.årsak))];
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const harAvslåttePerioderSomIkkeGirTapteDager =
        uttaksplan.filter(
            (p) =>
                isAvslåttPeriode(p) &&
                (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsesdato)),
        ).length > 0;
    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } as Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);
    const inkludererHelg = getInneholderKalenderHelgedager(periods);
    if (inkludererHelg) {
        unikePeriodColors.push(PeriodeColor.GRAY);
    }

    return (
        <>
            {harAvslåttePerioderSomIkkeGirTapteDager && (
                <Alert variant="info" style={{ margin: '1.5rem 0rem' }}>
                    <FormattedMessage id="kalender.avslåttePerioder" />
                </Alert>
            )}
            <div ref={targetRef}>
                <div className={bem.element('legend')} style={{ display: 'flex', flexWrap: 'wrap' }} id="legend">
                    <UttaksplanLegend
                        uniqueColors={unikePeriodColors}
                        barn={barn}
                        navnAnnenPart={navnAnnenPart}
                        unikeUtsettelseÅrsaker={unikeUtsettelseÅrsaker}
                        erFarEllerMedmor={erFarEllerMedmor}
                    />
                </div>
                <Calendar periods={periods} familiehendelsesdato={familiehendelsesdato} />
            </div>
            <Button
                className={bem.element('button')}
                variant="tertiary"
                icon={<DownloadIcon />}
                onClick={() => toPDF()}
            >
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </>
    );
};

export default UttaksplanKalender;

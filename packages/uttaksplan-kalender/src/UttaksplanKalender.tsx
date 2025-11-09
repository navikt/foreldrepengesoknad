import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button } from '@navikt/ds-react';

import { PeriodeInfoType, Periodetype } from '@navikt/fp-constants';
import {
    Barn,
    BrukerRolleSak_fpoversikt,
    InfoPeriode,
    KontoTypeUttak_fpoversikt,
    Overføringsperiode,
    Periode,
    PeriodeUtenUttak,
    Utsettelsesperiode,
    UtsettelsesÅrsak,
    Uttaksperiode,
    isAvslåttPeriode,
    isForeldrepengerFørFødselUttaksperiode,
    isFødtBarn,
    isInfoPeriode,
    isUfødtBarn,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '@navikt/fp-types';
import { Calendar, type CalendarPeriod, type CalendarPeriodColor } from '@navikt/fp-ui';
import {
    Uttaksdagen,
    formatDateIso,
    getAnnenForelderSamtidigUttakPeriode,
    getFamiliehendelsedato,
    getIndexOfSistePeriodeFørDato,
    isAvslåttPeriodeFørsteSeksUkerMor,
} from '@navikt/fp-utils';

import { UttaksplanLegend } from './UttaksplanLegend';
import { getKalenderSkjermlesertekstForPeriode } from './uttaksplanKalenderUtils';

const getIndexOfFamiliehendelse = (uttaksplan: Periode[], familiehendelsesdato: string) => {
    const indexAvPeriodeUtenForeldrepengerFørFødsel = uttaksplan.findIndex(
        (p) => isForeldrepengerFørFødselUttaksperiode(p) && p.skalIkkeHaUttakFørTermin,
    );
    if (indexAvPeriodeUtenForeldrepengerFørFødsel !== -1) {
        return indexAvPeriodeUtenForeldrepengerFørFødsel;
    }
    return getIndexOfSistePeriodeFørDato(uttaksplan, familiehendelsesdato) || 0;
};

const slåSammenPeriods = (periods: CalendarPeriod[]) => {
    if (periods.length <= 1) {
        return periods;
    }

    return periods.reduce((res, period, index) => {
        const sisteRes = res.at(-1);

        if (
            index !== 0 &&
            sisteRes &&
            period.color === sisteRes.color &&
            dayjs(Uttaksdagen(new Date(sisteRes.tom)).neste()).isSame(dayjs(period.fom), 'day')
        ) {
            sisteRes.tom = period.tom;
            return res;
        } else {
            res.push(period);
            return res;
        }
    }, [] as CalendarPeriod[]);
};

const getPerioderForKalendervisning = (
    uttaksplan: Periode[],
    erFarEllerMedmor: boolean,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UtsettelsesÅrsak[],
    intl: IntlShape,
): CalendarPeriod[] => {
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
    const periods = perioderForVisning.map<CalendarPeriod>((p) => {
        const color = getKalenderFargeForPeriodeType(p, erFarEllerMedmor, uttaksplan, barn);
        return {
            fom: dayjs(p.tidsperiode.fom).isSame(dayjs(familiehendelsesdato), 'd')
                ? formatDateIso(Uttaksdagen(p.tidsperiode.fom).neste())
                : formatDateIso(p.tidsperiode.fom),
            tom: formatDateIso(p.tidsperiode.tom),
            color,
        };
    });

    const indexOfFamiliehendelse = getIndexOfFamiliehendelse(uttaksplan, familiehendelsesdato);
    periods.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: 'PINK',
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
    periode: Uttaksperiode | Overføringsperiode,
    uttaksplan: Periode[],
    erFarEllerMedmor: boolean,
): CalendarPeriodColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, uttaksplan)
        : undefined;
    const samtidigUttaksprosent = isUttaksperiode(periode) ? periode.samtidigUttakProsent : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && Number.parseInt(samtidigUttaksprosent) > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }
    if (!annenForelderSamtidigUttaksperiode && !samtidigUttaksprosent && isUttaksperiode(periode) && periode.gradert) {
        return erFarEllerMedmor ? 'GREENSTRIPED' : 'BLUESTRIPED';
    }
    if (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin) {
        return 'NONE';
    }

    return getUttaksperiodeFarge(periode.konto, periode.forelder, erFarEllerMedmor);
};

const getKalenderFargeForPeriodeUtenUttak = (periode: PeriodeUtenUttak, barn: Barn): CalendarPeriodColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFødsel = isFødtBarn(barn) || isUfødtBarn(barn);
    const treUkerFørFamhendelse = dayjs(familiehendelsesdato).subtract(3, 'weeks');
    if (erFødsel && dayjs(periode.tidsperiode.tom).isBetween(familiehendelsesdato, treUkerFørFamhendelse, 'd')) {
        return 'BLACK';
    }
    return 'NONE';
};

const getKalenderFargeForInfoperiode = (
    periode: InfoPeriode,
    erFarEllerMedmor: boolean,
    barn: Barn,
): CalendarPeriodColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    switch (periode.infotype) {
        case PeriodeInfoType.utsettelseAnnenPart:
            return erFarEllerMedmor ? 'BLUEOUTLINE' : 'GREENOUTLINE';
        case PeriodeInfoType.uttakAnnenPart:
            return getForelderFarge(periode.forelder, erFarEllerMedmor);
        case PeriodeInfoType.avslåttPeriode:
            return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato)
                ? 'BLACK'
                : 'NONE';
        default:
            return 'NONE';
    }
};

const getKalenderFargeForPeriodeType = (
    periode: Periode,
    erFarEllerMedmor: boolean,
    uttaksplan: Periode[],
    barn: Barn,
): CalendarPeriodColor => {
    switch (periode.type) {
        case Periodetype.Utsettelse:
            return periode.forelder === 'FAR_MEDMOR' ? 'GREENOUTLINE' : 'BLUEOUTLINE';
        case Periodetype.PeriodeUtenUttak:
            return getKalenderFargeForPeriodeUtenUttak(periode, barn);
        case Periodetype.Hull:
            return 'BLACK';
        case Periodetype.Overføring:
        case Periodetype.Uttak:
            return getKalenderFargeForUttaksperiode(periode, uttaksplan, erFarEllerMedmor);
        case Periodetype.Opphold:
            return getForelderFarge(periode.forelder, erFarEllerMedmor);
        case Periodetype.Info:
            return getKalenderFargeForInfoperiode(periode, erFarEllerMedmor, barn);
        default:
            return 'NONE';
    }
};

const getInneholderKalenderHelgedager = (periods: CalendarPeriod[]): boolean => {
    const førsteDag = periods[0].fom;
    const sisteDag = periods.at(-1)!.tom;
    if (dayjs(sisteDag).diff(dayjs(førsteDag), 'days') > 5) {
        return true;
    }
    const førsteDagNr = dayjs(førsteDag).get('day');
    const sisteDagNr = dayjs(sisteDag).get('day');
    return sisteDagNr < førsteDagNr;
};

interface Props {
    uttaksplan: Periode[];
    erFarEllerMedmor: boolean;
    barn: Barn;
    navnAnnenPart: string;
}

export const UttaksplanKalender = ({ uttaksplan, erFarEllerMedmor, barn, navnAnnenPart }: Props) => {
    const intl = useIntl();
    const utsettelser = uttaksplan.filter((p) => isUtsettelsesperiode(p)) as Utsettelsesperiode[];
    const unikeUtsettelseÅrsaker = [...new Set(utsettelser.map((u) => u.årsak))];
    const periods = getPerioderForKalendervisning(
        uttaksplan,
        erFarEllerMedmor,
        barn,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        intl,
    );
    const unikePeriodColors = [...new Set(periods.map((period) => period.color))];
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const harAvslåttePerioderSomIkkeGirTapteDager = uttaksplan.some(
        (p) => isAvslåttPeriode(p) && (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsesdato)),
    );
    const inkludererHelg = getInneholderKalenderHelgedager(periods);
    if (inkludererHelg) {
        unikePeriodColors.push('GRAY');
    }

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.MEDIUM,
        page: {
            margin: Margin.MEDIUM,
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    return (
        <>
            {harAvslåttePerioderSomIkkeGirTapteDager && (
                <Alert variant="info" className="my-6">
                    <FormattedMessage id="kalender.avslåttePerioder" />
                </Alert>
            )}
            <div ref={targetRef}>
                <div className="flex flex-wrap max-[768px]:pb-2" id="legend">
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
            <Button className="mt-8 print:hidden" variant="tertiary" icon={<DownloadIcon />} onClick={() => toPDF()}>
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </>
    );
};

const getKontoFarge = (konto: KontoTypeUttak_fpoversikt, erFarEllerMedmor: boolean): CalendarPeriodColor => {
    switch (konto) {
        case 'FEDREKVOTE':
        case 'AKTIVITETSFRI_KVOTE':
            return erFarEllerMedmor ? 'GREEN' : 'LIGHTGREEN';
        case 'FORELDREPENGER_FØR_FØDSEL':
        case 'MØDREKVOTE':
            return erFarEllerMedmor ? 'LIGHTBLUE' : 'BLUE';
        case 'FORELDREPENGER':
            return erFarEllerMedmor ? 'GREEN' : 'BLUE';
        case 'FELLESPERIODE':
            return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
        default:
            return 'NONE';
    }
};

export const getUttaksperiodeFarge = (
    konto: KontoTypeUttak_fpoversikt,
    forelder: BrukerRolleSak_fpoversikt | undefined,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
): CalendarPeriodColor => {
    if (harMidlertidigOmsorg) {
        return erFarEllerMedmor ? 'GREEN' : 'BLUE';
    }

    if (forelder === undefined) {
        return getKontoFarge(konto, erFarEllerMedmor);
    }
    return getForelderFarge(forelder, erFarEllerMedmor);
};

export const getForelderFarge = (
    forelder: BrukerRolleSak_fpoversikt,
    erFarEllerMedmor: boolean,
): CalendarPeriodColor => {
    if (forelder === 'MOR') {
        return erFarEllerMedmor ? 'LIGHTBLUE' : 'BLUE';
    }
    return erFarEllerMedmor ? 'GREEN' : 'LIGHTGREEN';
};

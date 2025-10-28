import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { ReactElement, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button, Checkbox, HStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { Barn, SaksperiodeNy, UttakUtsettelseÅrsak_fpoversikt, isFødtBarn, isUfødtBarn } from '@navikt/fp-types';
import { Calendar, Period } from '@navikt/fp-ui';
import {
    UttaksdagenString,
    formatDateIso,
    getFamiliehendelsedato,
    getForelderFarge,
    getUttaksperiodeFarge,
    omitMany,
    useMedia,
} from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { Uttaksplanbuilder } from '../builder/Uttaksplanbuilder';
import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplan } from '../context/useUttaksplan';
import { useUttaksplanBuilder } from '../context/useUttaksplanBuilder';
import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { isHull, isPeriodeUtenUttak } from '../utils/periodeUtils';
import { RedigeringPanel } from './RedigeringPanel';
import { UttaksplanLegend } from './UttaksplanLegend';
import {
    getAnnenForelderSamtidigUttakPeriode,
    getIndexOfSistePeriodeFørDato,
    isAvslåttPeriode,
    isAvslåttPeriodeFørsteSeksUkerMor,
    isUttaksperiode,
} from './helpers/uttaksplanHelpers';
import { getKalenderSkjermlesertekstForPeriode } from './uttaksplanKalenderUtils';

const slåSammenPerioder = (periods: Period[]) => {
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

const getPerioderForKalendervisning = (
    allePerioder: Planperiode[],
    erFarEllerMedmor: boolean,
    barn: Barn,
    navnAnnenPart: string,
    unikeUtsettelseÅrsaker: UttakUtsettelseÅrsak_fpoversikt[],
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
    }, [] as Planperiode[]);

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

const getKalenderFargeForUttaksperiode = (
    periode: Planperiode,
    allePerioder: Planperiode[],
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

const getKalenderFargeForPeriodeUtenUttak = (periode: Planperiode, barn: Barn): PeriodeColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFødsel = isFødtBarn(barn) || isUfødtBarn(barn);
    const treUkerFørFamhendelse = dayjs(familiehendelsesdato).subtract(3, 'weeks');
    if (erFødsel && dayjs(periode.tom).isBetween(familiehendelsesdato, treUkerFørFamhendelse, 'd')) {
        return PeriodeColor.BLACK;
    }
    return PeriodeColor.NONE;
};

const getKalenderFargeForAnnenPart = (periode: Planperiode, erFarEllerMedmor: boolean): PeriodeColor => {
    if (periode.utsettelseÅrsak) {
        return erFarEllerMedmor ? PeriodeColor.BLUEOUTLINE : PeriodeColor.GREENOUTLINE;
    }
    if (periode.forelder && (periode.overføringÅrsak || isUttaksperiode(periode))) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    return PeriodeColor.NONE;
};

const erPeriodeForSøker = (periode: Planperiode, erFarEllerMedmor: boolean) =>
    (periode.forelder === Forelder.mor && !erFarEllerMedmor) ||
    (periode.forelder === Forelder.farMedmor && erFarEllerMedmor);

const getKalenderFargeForPeriodeTypePlanlegger = (
    periode: Planperiode,
    erFarEllerMedmor: boolean,
    allePerioder: Planperiode[],
    foreldrepengerHarAktivitetskrav: boolean,
): PeriodeColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent = isUttaksperiode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
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

    if (periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return PeriodeColor.BLUE;
    }

    if (periode.kontoType === 'AKTIVITETSFRI_KVOTE') {
        return PeriodeColor.BLUE;
    }

    if (periode.kontoType === 'FORELDREPENGER') {
        if (foreldrepengerHarAktivitetskrav) {
            return erFarEllerMedmor ? PeriodeColor.LIGHTGREEN : PeriodeColor.BLUE;
        }

        return PeriodeColor.BLUE;
    }

    if (periode.forelder === 'MOR') {
        return PeriodeColor.BLUE;
    }

    if (periode.forelder === 'FAR_MEDMOR') {
        return PeriodeColor.LIGHTGREEN;
    }

    return PeriodeColor.NONE;
};

const getKalenderFargeForPeriodeType = (
    periode: Planperiode,
    erFarEllerMedmor: boolean,
    allePerioder: Planperiode[],
    barn: Barn,
): PeriodeColor => {
    if (isAvslåttPeriode(periode)) {
        const familiehendelsesdato = getFamiliehendelsedato(barn);
        return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato)
            ? PeriodeColor.BLACK
            : PeriodeColor.NONE;
    }

    if (periode.utsettelseÅrsak) {
        return periode.forelder === 'FAR_MEDMOR' ? PeriodeColor.GREENOUTLINE : PeriodeColor.BLUEOUTLINE;
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
    const sisteDag = periods.at(-1)!.tom;
    if (dayjs(sisteDag).diff(dayjs(førsteDag), 'days') > 5) {
        return true;
    }
    const førsteDagNr = dayjs(førsteDag).get('day');
    const sisteDagNr = dayjs(sisteDag).get('day');
    return sisteDagNr < førsteDagNr;
};

const getUnikeUtsettelsesårsaker = (allePerioderInklHull: Planperiode[]) => {
    const utsettelseÅrsaker = allePerioderInklHull
        .map((u) => u.utsettelseÅrsak)
        .filter((utsettelseÅrsak): utsettelseÅrsak is UttakUtsettelseÅrsak_fpoversikt => !!utsettelseÅrsak);
    return [...new Set(utsettelseÅrsaker)];
};

interface Props {
    saksperioder: SaksperiodeNy[];
    planleggerLegend?: ReactElement;
    barnehagestartdato?: string;
    handleOnPlanChange?: (perioder: SaksperiodeNy[]) => void;
}

export const UttaksplanKalender = ({
    saksperioder,
    planleggerLegend,
    barnehagestartdato,
    handleOnPlanChange,
}: Props) => {
    const intl = useIntl();

    const { barn, erFarEllerMedmor, familiehendelsedato, modus, navnPåForeldre } = useUttaksplanData();

    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    const uttaksplan = useUttaksplan(saksperioder);
    const uttaksplanBuilder = useUttaksplanBuilder(saksperioder);

    const isDesktop = useMedia('screen and (min-width: 768px)');

    const [isRangeSelectorMode, setRangeSelectorMode] = useState(false);
    const [valgtePerioder, setSelectedPeriods] = useState<Period[]>([]);

    const unikeUtsettelseÅrsaker = getUnikeUtsettelsesårsaker(uttaksplan);

    const foreldrepengerHarAktivitetskrav =
        uttaksplan.some((p) => p.kontoType === 'FORELDREPENGER') &&
        uttaksplan.some((p) => p.kontoType === 'AKTIVITETSFRI_KVOTE');

    const perioderForKalendervisning = getPerioderForKalendervisning(
        uttaksplan,
        erFarEllerMedmor,
        barn,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        intl,
        modus === 'planlegger',
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
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    const harAvslåttePerioderSomIkkeGirTapteDager = uttaksplan.some(
        (p) => isAvslåttPeriode(p) && (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsedato)),
    );

    const dateClickCallback = (selectedDate: string) => {
        if (isRangeSelectorMode) {
            setSelectedPeriods((old) =>
                old.some((p) => p.fom === selectedDate || p.tom === selectedDate)
                    ? []
                    : [
                          {
                              color: PeriodeColor.DARKBLUE,
                              fom: old.length === 0 ? selectedDate : findFomDate(old[0].fom, selectedDate),
                              tom: old.length === 0 ? selectedDate : findTomDate(old[0].fom, selectedDate),
                              isSelected: true,
                              srText: '',
                          },
                      ],
            );
        } else {
            setSelectedPeriods((old) =>
                valgtePerioder.some((p) => p.fom === selectedDate)
                    ? old.filter((p) => p.fom !== selectedDate)
                    : [
                          ...old,
                          {
                              color: PeriodeColor.DARKBLUE,
                              fom: selectedDate,
                              tom: selectedDate,
                              isSelected: true,
                              srText: '',
                          },
                      ].sort(sortPeriods),
            );
        }
    };

    return (
        <>
            {harAvslåttePerioderSomIkkeGirTapteDager && (
                <Alert variant="info" className="my-6">
                    <FormattedMessage id="kalender.avslåttePerioder" />
                </Alert>
            )}
            <div ref={targetRef}>
                <div className="flex flex-wrap max-[768px]:pb-2" id="legend">
                    {planleggerLegend !== undefined ? (
                        <>{planleggerLegend}</>
                    ) : (
                        <UttaksplanLegend
                            uniqueColors={unikePeriodefarger}
                            barn={barn}
                            navnAnnenPart={navnAnnenPart}
                            unikeUtsettelseÅrsaker={unikeUtsettelseÅrsaker}
                            erFarEllerMedmor={erFarEllerMedmor}
                            selectLegend={(color: PeriodeColor) => {
                                const periode = notEmpty(perioderForKalendervisning.find((p) => p.color === color));
                                setSelectedPeriods((old) =>
                                    old.some((p) => p.fom === periode.fom || p.tom === periode.tom)
                                        ? []
                                        : [
                                              {
                                                  color: PeriodeColor.DARKBLUE,
                                                  fom: periode?.fom,
                                                  tom: periode?.tom,
                                                  isSelected: true,
                                                  srText: '',
                                              },
                                          ],
                                );
                            }}
                        />
                    )}
                </div>
                <Checkbox
                    className="mb-4 print:hidden"
                    checked={isRangeSelectorMode}
                    onChange={() => {
                        setSelectedPeriods([]);
                        setRangeSelectorMode(!isRangeSelectorMode);
                    }}
                >
                    <FormattedMessage id="kalender.velgRange" />
                </Checkbox>

                <HStack gap="space-4">
                    <Calendar
                        periods={perioderForKalendervisning.concat(valgtePerioder).sort(sortPeriods)}
                        lastSelectedDate={valgtePerioder.at(-1)?.tom}
                        dateClickCallback={dateClickCallback}
                    >
                        {!isDesktop && handleOnPlanChange && (
                            <RedigeringPanel
                                valgtePerioder={valgtePerioder}
                                komplettPlan={uttaksplan}
                                handleOnPlanChange={getModifyPlan(uttaksplanBuilder, handleOnPlanChange)}
                                familiehendelsedato={familiehendelsedato}
                            />
                        )}
                    </Calendar>
                    {isDesktop && handleOnPlanChange && valgtePerioder.length > 0 && (
                        <RedigeringPanel
                            valgtePerioder={valgtePerioder}
                            komplettPlan={uttaksplan}
                            handleOnPlanChange={getModifyPlan(uttaksplanBuilder, handleOnPlanChange)}
                            familiehendelsedato={familiehendelsedato}
                        />
                    )}
                </HStack>
            </div>
            <Button
                className="mt-8 print:hidden"
                variant="tertiary"
                icon={<DownloadIcon aria-hidden />}
                onClick={() => toPDF()}
            >
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </>
    );
};

const findFomDate = (date1: string, date2: string) => (dayjs(date1).isBefore(dayjs(date2)) ? date1 : date2);

const findTomDate = (date1: string, date2: string) => (dayjs(date1).isBefore(dayjs(date2)) ? date2 : date1);

const sortPeriods = (a: Period, b: Period) => dayjs(a.fom).diff(dayjs(b.fom));

const getModifyPlan =
    (
        uttaksplanBuilder: ReturnType<typeof Uttaksplanbuilder>,
        handleOnPlanChange: (perioder: SaksperiodeNy[]) => void,
    ) =>
    (oppdatertPeriode: Planperiode, leggTil: boolean) => {
        const planperioder = leggTil
            ? uttaksplanBuilder.leggTilPeriode(oppdatertPeriode)
            : uttaksplanBuilder.oppdaterPeriode(oppdatertPeriode);
        const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        handleOnPlanChange(
            resultUtenHull.map((p) => omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin'])),
        );
    };

import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import {
    Barn,
    BrukerRolleSak_fpoversikt,
    KontoTypeUttak,
    SaksperiodeNy,
    UttakUtsettelseÅrsak_fpoversikt,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { Calendar, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { UttaksdagenString, formatDateIso, getFamiliehendelsedato, omitMany } from '@navikt/fp-utils';
import { assertUnreachable, notEmpty } from '@navikt/fp-validation';

import { Uttaksplanbuilder } from '../builder/Uttaksplanbuilder';
import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplan } from '../context/useUttaksplan';
import { useUttaksplanBuilder } from '../context/useUttaksplanBuilder';
import { LegendLabel } from '../types/LegendLabel';
import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { UttaksplanKalenderLegendInfo } from '../types/UttaksplanKalenderLegendInfo';
import {
    getAnnenForelderSamtidigUttakPeriode,
    getIndexOfSistePeriodeFørDato,
    isAvslåttPeriode,
    isAvslåttPeriodeFørsteSeksUkerMor,
    isHull,
    isPeriodeUtenUttak,
    isUttaksperiode,
} from '../utils/periodeUtils';
import { UttaksplanLegend } from './UttaksplanLegend';
import { RedigeringPanel } from './redigering/RedigeringPanel';
import { getFamiliehendelseKalendarLabel, getKalenderSkjermlesertekstForPeriode } from './uttaksplanKalenderUtils';

const getKontoFarge = (konto: KontoTypeUttak, erFarEllerMedmor: boolean): CalendarPeriodColor => {
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
    konto: KontoTypeUttak,
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

const slåSammenPerioder = (periods: CalendarPeriod[]) => {
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
    }, [] as CalendarPeriod[]);
};

const getLegendLabelFromPeriode = (p: Planperiode): LegendLabel => {
    if (p.kontoType) {
        switch (p.kontoType) {
            case 'FORELDREPENGER_FØR_FØDSEL':
                return 'FORELDREPENGER_FØR_FØDSEL';
            case 'MØDREKVOTE':
                return 'MØDREKVOTE';
            case 'FEDREKVOTE':
                return 'FEDREKVOTE';
            case 'FELLESPERIODE':
                return 'FELLESPERIODE';
            case 'FORELDREPENGER':
                return 'FORELDREPENGER';
            case 'AKTIVITETSFRI_KVOTE':
                if (p.forelder === 'FAR_MEDMOR') {
                    if (p.samtidigUttak && p.samtidigUttak > 0) {
                        return 'SAMTIDIG_UTTAK';
                    }

                    if (p.gradering && p.gradering.arbeidstidprosent) {
                        return 'FARS_DEL_GRADERT';
                    }

                    return 'FARS_DEL';
                }

                if (p.samtidigUttak && p.samtidigUttak > 0) {
                    return 'SAMTIDIG_UTTAK';
                }

                if (p.gradering && p.gradering.arbeidstidprosent) {
                    return 'MORS_DEL_GRADERT';
                }

                return 'MORS_DEL';
            default:
                return assertUnreachable('Error: ukjent kontoType i getLegendLabelFromPeriode');
        }
    }

    if (p.periodeHullÅrsak) {
        if (p.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
            return 'PERIODE_UTEN_UTTAK';
        }

        if (p.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
            return 'TAPTE_DAGER';
        }
    }

    return 'FERIE';
};

type CalendarPeriodWithLabel = CalendarPeriod & { legendLabel?: LegendLabel };

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
): CalendarPeriodWithLabel[] => {
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
                    legendLabel: getLegendLabelFromPeriode(periode),
                },
                {
                    fom: dayjs(barnehagestartdato).add(1, 'day').format('YYYY-MM-DD'),
                    tom: periode.tom,
                    color: color,
                    legendLabel: getLegendLabelFromPeriode(periode),
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
                legendLabel: getLegendLabelFromPeriode(periode),
            },
        ];
    }, [] as CalendarPeriodWithLabel[]);

    const perioderForVisning =
        barnehagestartdato !== undefined
            ? res
                  .concat({
                      fom: barnehagestartdato,
                      tom: barnehagestartdato,
                      color: 'PURPLE',
                      legendLabel: 'BARNEHAGEPLASS',
                  } satisfies CalendarPeriodWithLabel)
                  .sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)))
            : res;

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(allePerioder, familiehendelsesdato) ?? 0;
    perioderForVisning.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: 'PINK',
        legendLabel: getFamiliehendelseKalendarLabel(barn),
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
): CalendarPeriodColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent = isUttaksperiode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (
        !annenForelderSamtidigUttaksperiode &&
        !samtidigUttaksprosent &&
        isUttaksperiode(periode) &&
        periode.gradering
    ) {
        return erFarEllerMedmor ? 'GREENSTRIPED' : 'BLUESTRIPED';
    }

    if (!periode.kontoType) {
        return 'NONE';
    }

    return getUttaksperiodeFarge(periode.kontoType, periode.forelder, erFarEllerMedmor);
};

const getKalenderFargeForPeriodeUtenUttak = (periode: Planperiode, barn: Barn): CalendarPeriodColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFødsel = isFødtBarn(barn) || isUfødtBarn(barn);
    const treUkerFørFamhendelse = dayjs(familiehendelsesdato).subtract(3, 'weeks');
    if (erFødsel && dayjs(periode.tom).isBetween(familiehendelsesdato, treUkerFørFamhendelse, 'd')) {
        return 'BLACK';
    }
    return 'NONE';
};

const getKalenderFargeForAnnenPart = (periode: Planperiode, erFarEllerMedmor: boolean): CalendarPeriodColor => {
    if (periode.utsettelseÅrsak) {
        return erFarEllerMedmor ? 'BLUEOUTLINE' : 'GREENOUTLINE';
    }
    if (periode.forelder && (periode.overføringÅrsak || isUttaksperiode(periode))) {
        return getForelderFarge(periode.forelder, erFarEllerMedmor);
    }

    return 'NONE';
};

const erPeriodeForSøker = (periode: Planperiode, erFarEllerMedmor: boolean) =>
    (periode.forelder === 'MOR' && !erFarEllerMedmor) || (periode.forelder === 'FAR_MEDMOR' && erFarEllerMedmor);

const getKalenderFargeForPeriodeTypePlanlegger = (
    periode: Planperiode,
    erFarEllerMedmor: boolean,
    allePerioder: Planperiode[],
    foreldrepengerHarAktivitetskrav: boolean,
): CalendarPeriodColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, allePerioder)
        : undefined;

    const samtidigUttaksprosent = isUttaksperiode(periode) ? periode.samtidigUttak : undefined;
    if (annenForelderSamtidigUttaksperiode || (samtidigUttaksprosent && samtidigUttaksprosent > 0)) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (periode.utsettelseÅrsak) {
        return 'BLUEOUTLINE';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return 'BLACK';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return 'NONE';
    }

    if (periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return 'BLUE';
    }

    if (periode.kontoType === 'AKTIVITETSFRI_KVOTE') {
        return 'BLUE';
    }

    if (periode.kontoType === 'FORELDREPENGER') {
        if (foreldrepengerHarAktivitetskrav) {
            return erFarEllerMedmor ? 'LIGHTGREEN' : 'BLUE';
        }

        return 'BLUE';
    }

    if (periode.forelder === 'MOR') {
        if (periode.gradering && periode.gradering.arbeidstidprosent > 0) {
            return 'BLUESTRIPED';
        }

        return 'BLUE';
    }

    if (periode.forelder === 'FAR_MEDMOR') {
        if (periode.gradering && periode.gradering.arbeidstidprosent > 0) {
            return 'GREENSTRIPED';
        }

        return 'GREEN';
    }

    return 'NONE';
};

const getKalenderFargeForPeriodeType = (
    periode: Planperiode,
    erFarEllerMedmor: boolean,
    allePerioder: Planperiode[],
    barn: Barn,
): CalendarPeriodColor => {
    if (isAvslåttPeriode(periode)) {
        if (periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return 'BLACKOUTLINE';
        }
        const familiehendelsesdato = getFamiliehendelsedato(barn);
        return !erFarEllerMedmor && isAvslåttPeriodeFørsteSeksUkerMor(periode, familiehendelsesdato) ? 'BLACK' : 'NONE';
    }

    if (periode.utsettelseÅrsak) {
        return periode.forelder === 'FAR_MEDMOR' ? 'GREENOUTLINE' : 'BLUEOUTLINE';
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
        return getKalenderFargeForPeriodeUtenUttak(periode, barn);
    }

    if (periode.periodeHullÅrsak === PeriodeHullType.TAPTE_DAGER) {
        return 'BLACK';
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

    return 'NONE';
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

const getUnikeUtsettelsesårsaker = (allePerioderInklHull: Planperiode[]) => {
    const utsettelseÅrsaker = allePerioderInklHull
        .map((u) => u.utsettelseÅrsak)
        .filter((utsettelseÅrsak): utsettelseÅrsak is UttakUtsettelseÅrsak_fpoversikt => !!utsettelseÅrsak);
    return [...new Set(utsettelseÅrsaker)];
};

interface Props {
    saksperioder: SaksperiodeNy[];
    barnehagestartdato?: string;
    handleOnPlanChange?: (perioder: SaksperiodeNy[]) => void;
    readOnly: boolean;
}

export const UttaksplanKalender = ({ saksperioder, barnehagestartdato, handleOnPlanChange, readOnly }: Props) => {
    const intl = useIntl();

    const { barn, erFarEllerMedmor, familiehendelsedato, modus, navnPåForeldre } = useUttaksplanData();

    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    const uttaksplan = useUttaksplan(saksperioder);
    const uttaksplanBuilder = useUttaksplanBuilder(saksperioder);

    const [isRangeSelection, setRangeSelectorMode] = useState(true);
    const [valgtePerioder, setValgtePerioder] = useState<CalendarPeriod[]>([]);

    const unikeUtsettelseÅrsaker = getUnikeUtsettelsesårsaker(uttaksplan);

    const foreldrepengerHarAktivitetskrav =
        uttaksplan.some((p) => p.kontoType === 'FORELDREPENGER') &&
        uttaksplan.some((p) => p.kontoType === 'AKTIVITETSFRI_KVOTE');

    const perioderForKalendervisning = useMemo(
        () =>
            getPerioderForKalendervisning(
                uttaksplan,
                erFarEllerMedmor,
                barn,
                navnAnnenPart,
                unikeUtsettelseÅrsaker,
                intl,
                modus === 'planlegger',
                foreldrepengerHarAktivitetskrav,
                barnehagestartdato,
            ),
        [
            uttaksplan,
            erFarEllerMedmor,
            barn,
            navnAnnenPart,
            unikeUtsettelseÅrsaker,
            intl,
            modus,
            foreldrepengerHarAktivitetskrav,
            barnehagestartdato,
        ],
    );

    const inkludererHelg = getInneholderKalenderHelgedager(perioderForKalendervisning);
    const unikeLegendLabels = [...new Set(perioderForKalendervisning.map((period) => period.legendLabel))];
    const unikeLegendColors = [...new Set(perioderForKalendervisning.map((period) => period.color))];

    const legendInfo: UttaksplanKalenderLegendInfo[] = unikeLegendColors.map((color) => ({
        color,
        label: unikeLegendLabels.find((label) => {
            const periode = perioderForKalendervisning.find((p) => p.color === color && p.legendLabel === label);
            return periode !== undefined;
        }) as LegendLabel,
    }));

    if (inkludererHelg) {
        legendInfo.push({
            color: 'GRAY',
            label: 'HELG',
        });
    }

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    const harAvslåttePerioderSomIkkeGirTapteDager = saksperioder.some(
        (p) =>
            isAvslåttPeriode(p) &&
            p.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER' &&
            (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsedato)),
    );

    return (
        <VStack gap="space-8">
            {harAvslåttePerioderSomIkkeGirTapteDager && (
                <Alert variant="info" className="my-6">
                    <FormattedMessage id="kalender.avslåttePerioder" />
                </Alert>
            )}
            <VStack gap="space-16" ref={targetRef}>
                <div className="mb-4 flex flex-wrap max-[768px]:pb-2" id="legend">
                    <UttaksplanLegend
                        legendInfo={legendInfo}
                        uniqueColors={unikeLegendColors}
                        barn={barn}
                        navnAnnenPart={navnAnnenPart}
                        unikeUtsettelseÅrsaker={unikeUtsettelseÅrsaker}
                        erFarEllerMedmor={erFarEllerMedmor}
                        readOnly={readOnly}
                        selectLegend={(color: CalendarPeriodColor) => {
                            const periode = notEmpty(perioderForKalendervisning.find((p) => p.color === color));
                            setValgtePerioder((old) =>
                                old.some((p) => p.fom === periode.fom || p.tom === periode.tom)
                                    ? []
                                    : [
                                          {
                                              color: 'DARKBLUE',
                                              fom: periode?.fom,
                                              tom: periode?.tom,
                                              isSelected: true,
                                              srText: '',
                                          },
                                      ],
                            );
                        }}
                    />
                </div>

                {!readOnly && (
                    <RadioGroup
                        legend={<FormattedMessage id="UttaksplanKalender.VelgDagEllerPeriode" />}
                        onChange={() => {
                            setValgtePerioder([]);
                            setRangeSelectorMode(!isRangeSelection);
                        }}
                        value={isRangeSelection}
                    >
                        <HStack gap="space-16">
                            <Radio value={true}>
                                <FormattedMessage id="UttaksplanKalender.VelgPeriode" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="UttaksplanKalender.VelgEnkeltDager" />
                            </Radio>
                        </HStack>
                    </RadioGroup>
                )}

                <div className="ax-md:flex-row flex flex-col">
                    <div className={readOnly ? 'flex-1' : 'ax-md:w-[300px]'}>
                        <Calendar
                            periods={perioderForKalendervisning.concat(valgtePerioder).sort(sortPeriods)}
                            setSelectedPeriods={readOnly ? undefined : setValgtePerioder}
                            isRangeSelection={isRangeSelection}
                        />
                    </div>
                    {handleOnPlanChange && valgtePerioder.length > 0 && (
                        <div
                            className={[
                                'fixed bottom-0 left-0 right-0 z-40 w-full',
                                'ax-md:sticky ax-md:top-4 ax-md:ml-4 ax-md:max-w-[20.5rem] ax-md:self-start',
                            ].join(' ')}
                            style={{ paddingBottom: 'env(safe-area-inset-bottom, 1rem)' }}
                        >
                            <RedigeringPanel
                                valgtePerioder={valgtePerioder}
                                uttaksplan={uttaksplan}
                                setValgtePerioder={setValgtePerioder}
                                oppdaterUttaksplan={getModifyPlan(uttaksplanBuilder, handleOnPlanChange)}
                            />
                        </div>
                    )}
                </div>
            </VStack>

            <Button
                className="ax-md:pb-0 mt-8 pb-20 print:hidden"
                variant="tertiary"
                icon={<DownloadIcon aria-hidden />}
                onClick={() => toPDF()}
            >
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </VStack>
    );
};

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

const getModifyPlan =
    (
        uttaksplanBuilder: ReturnType<typeof Uttaksplanbuilder>,
        handleOnPlanChange: (perioder: SaksperiodeNy[]) => void,
    ) =>
    (oppdatertPeriode: Planperiode[]) => {
        const planperioder = uttaksplanBuilder.leggTilPerioder(oppdatertPeriode);
        const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        handleOnPlanChange(
            resultUtenHull.map((p) => omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin'])),
        );
    };

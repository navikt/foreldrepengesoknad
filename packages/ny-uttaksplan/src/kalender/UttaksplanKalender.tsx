import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Calendar, CalendarPeriod, CalendarPeriodColor, monthDiff } from '@navikt/fp-ui';
import { dateToISOString } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { isAvslåttPeriode, isAvslåttPeriodeFørsteSeksUkerMor } from '../utils/periodeUtils';
import { UttaksplanLegend } from './legend/UttaksplanLegend';
import { RedigerKalenderIndex } from './redigering/RedigerKalenderIndex';
import { usePerioderForKalendervisning } from './utils/usePerioderForKalendervisning';

interface Props {
    readOnly: boolean;
    barnehagestartdato?: string;
    oppdaterUttaksplan?: (perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>) => void;
    endreUttaksplan?: (handling: 'angre' | 'tilbakestill' | 'fjernAlt') => void;
}

export const UttaksplanKalender = ({ readOnly, barnehagestartdato, oppdaterUttaksplan, endreUttaksplan }: Props) => {
    const intl = useIntl();
    const { erFarEllerMedmor, navnPåForeldre, familiehendelsedato, uttaksplan, familiesituasjon } = useUttaksplanData();
    const [additionalMonthsToAddToLast, setAdditionalMonthsToAddToLast] = useState(0);

    const [isRangeSelection, setIsRangeSelection] = useState(true);
    const [valgtePerioder, setValgtePerioder] = useState<CalendarPeriod[]>([]);

    const perioderForKalendervisning = usePerioderForKalendervisning(barnehagestartdato);

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    const getSrTextForSelectedPeriod = useCallback(
        (periode: { fom: string; tom: string }) => {
            return intl.formatMessage(
                { id: 'UttaksplanKalender.ValgtPeriodeSrTekst' },
                {
                    fom: dayjs(periode.fom).format(DDMMYYYY_DATE_FORMAT),
                    tom: dayjs(periode.tom).format(DDMMYYYY_DATE_FORMAT),
                },
            );
        },
        [intl],
    );

    const firstDateInCalendar =
        familiesituasjon === 'adopsjon'
            ? familiehendelsedato
            : dateToISOString(dayjs(familiehendelsedato).subtract(3, 'month').toDate());
    let baseLastDateInCalendar = barnehagestartdato ?? (uttaksplan.length > 0 ? uttaksplan.at(-1)!.tom : undefined);

    if (!baseLastDateInCalendar) {
        baseLastDateInCalendar = dateToISOString(dayjs(familiehendelsedato).add(6, 'month').toDate());
    }

    // Beregn den absolutte maksgrensen (3 år etter familiehendelsedato)
    const absoluteMaksGrense = dateToISOString(dayjs(familiehendelsedato).add(3, 'year').toDate());

    // Beregn maksimalt antall ekstra måneder som kan legges til
    const maksAntallEkstraMåneder = useMemo(() => {
        const baseLastDate = dayjs(baseLastDateInCalendar);
        const maksGrense = dayjs(absoluteMaksGrense);

        // Beregn hvor mange hele måneder det er mellom base siste dato og maksgrensen
        return monthDiff(baseLastDate.toDate(), maksGrense.toDate());
    }, [baseLastDateInCalendar, absoluteMaksGrense]);

    // Beregn faktisk siste dato som skal vises i kalenderen
    let lastDateInCalendar = baseLastDateInCalendar;
    if (additionalMonthsToAddToLast > 0) {
        const proposedLastDate = dayjs(baseLastDateInCalendar).add(additionalMonthsToAddToLast, 'month');
        const maxDate = dayjs(absoluteMaksGrense);

        // Sørg for at vi ikke overskrider 3 år etter familiehendelsedato
        lastDateInCalendar = dateToISOString(
            proposedLastDate.isAfter(maxDate) ? maxDate.toDate() : proposedLastDate.toDate(),
        );
    }

    return (
        <VStack gap="space-8">
            <AvslåttePerioder />

            <VStack gap="space-16" ref={targetRef}>
                <div className="ax-md:pb-2 mb-4 flex flex-wrap" id="legend">
                    <UttaksplanLegend
                        perioderForKalendervisning={perioderForKalendervisning}
                        navnAnnenPart={navnAnnenPart}
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
                                              srText: getSrTextForSelectedPeriod(periode),
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
                            setIsRangeSelection(!isRangeSelection);
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
                    <div className={readOnly ? 'flex-1' : 'ax-md:w-[295px]'}>
                        <Calendar
                            periods={perioderForKalendervisning.concat(valgtePerioder).sort(sortPeriods)}
                            setSelectedPeriods={readOnly ? undefined : setValgtePerioder}
                            getSrTextForSelectedPeriod={readOnly ? undefined : getSrTextForSelectedPeriod}
                            isRangeSelection={isRangeSelection}
                            firstDateInCalendar={firstDateInCalendar}
                            lastDateInCalendar={lastDateInCalendar}
                        />
                        {additionalMonthsToAddToLast <= maksAntallEkstraMåneder && (
                            <Button
                                onClick={() => setAdditionalMonthsToAddToLast((value) => value + 3)}
                                type="button"
                                variant="secondary"
                                size="small"
                                className="mt-4 w-full"
                            >
                                <FormattedMessage id="Calendar.LeggTilMåneder" />
                            </Button>
                        )}
                        {additionalMonthsToAddToLast > maksAntallEkstraMåneder && (
                            <div className="pt-2">Du har lagt til maks antall måneder</div>
                        )}
                    </div>
                    {oppdaterUttaksplan && endreUttaksplan && (
                        <div
                            className={[
                                'fixed bottom-0 left-0 right-0 z-40 w-full',
                                'ax-md:sticky ax-md:top-24 ax-md:ml-4 ax-md:max-w-[20.5rem] ax-md:self-start',
                                'pb-[env(safe-area-inset-bottom,1rem)]',
                            ].join(' ')}
                        >
                            <RedigerKalenderIndex
                                valgtePerioder={valgtePerioder}
                                setValgtePerioder={setValgtePerioder}
                                oppdaterUttaksplan={oppdaterUttaksplan}
                                endreUttaksplan={endreUttaksplan}
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
                type="button"
            >
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </VStack>
    );
};

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

const AvslåttePerioder = () => {
    const { saksperioder, erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

    const harAvslåttePerioderSomIkkeGirTapteDager = saksperioder.some(
        (p) =>
            isAvslåttPeriode(p) &&
            !('trekkdager' in p) &&
            p.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER' &&
            (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsedato)),
    );

    return harAvslåttePerioderSomIkkeGirTapteDager ? (
        <Alert variant="info" className="my-6">
            <FormattedMessage id="kalender.avslåttePerioder" />
        </Alert>
    ) : null;
};

import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { set } from 'lodash';
import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button, Chips, HStack, InlineMessage, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { Calendar, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../context/UttaksplanRedigeringContext';
import { isAvslåttPeriode, isAvslåttPeriodeFørsteSeksUkerMor } from '../utils/periodeUtils';
import { UttaksplanLegend } from './legend/UttaksplanLegend';
import { RedigerKalenderIndex } from './redigering/RedigerKalenderIndex';
import { useAntallMånederIKalenderData } from './utils/useAntallMånederIKalenderData';
import { usePerioderForKalendervisning } from './utils/usePerioderForKalendervisning';

interface Props {
    readOnly: boolean;
    barnehagestartdato?: string;
    scrollToKvoteOppsummering?: () => void;
}

export const UttaksplanKalender = ({ readOnly, barnehagestartdato, scrollToKvoteOppsummering }: Props) => {
    const intl = useIntl();

    const [antallMånederLagtTilKalender, setAntallMånederLagtTilKalender] = useState(0);
    const [erRedigeringAktiv, setErRedigeringAktiv] = useState(false);
    const [isRangeSelection, setIsRangeSelection] = useState(true);
    const [valgtePerioder, setValgtePerioder] = useState<CalendarPeriod[]>([]);

    const setRedigeringAktivOgValgtePerioder = useCallback<React.Dispatch<React.SetStateAction<CalendarPeriod[]>>>(
        (periode) => {
            setErRedigeringAktiv(true);
            setValgtePerioder(periode);
        },
        [],
    );

    const uttaksplanRedigering = useUttaksplanRedigering();

    const perioderForKalendervisning = usePerioderForKalendervisning(barnehagestartdato);

    const { førsteDatoIKalender, sisteDatoIKalender, maksAntallEkstraMåneder } = useAntallMånederIKalenderData(
        antallMånederLagtTilKalender,
        barnehagestartdato,
    );

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.NORMAL,
        page: {
            margin: Margin.MEDIUM,
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

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

    const setValgtLegend = (color: CalendarPeriodColor) => {
        const perioder = perioderForKalendervisning.filter((p) => p.color === color);
        setRedigeringAktivOgValgtePerioder(
            perioder.map((periode) => ({
                color: 'DARKBLUE',
                fom: periode?.fom,
                tom: periode?.tom,
                isSelected: true,
                srText: getSrTextForSelectedPeriod(periode),
            })),
        );
    };

    const erRedigeringInaktiv = !erRedigeringAktiv && valgtePerioder.length === 0;

    return (
        <VStack gap="space-8">
            <AvslåttePerioder />

            <VStack gap="space-16" ref={targetRef}>
                {!readOnly && (
                    <RadioGroup
                        legend={<FormattedMessage id="UttaksplanKalender.VelgDagEllerPeriode" />}
                        onChange={() => {
                            setRedigeringAktivOgValgtePerioder([]);
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

                <Chips>
                    <Chips.Toggle
                        selected={erRedigeringAktiv}
                        onClick={() => {
                            setErRedigeringAktiv(!erRedigeringAktiv);
                            setValgtePerioder([]);
                        }}
                    >
                        {intl.formatMessage({ id: 'TilpassPlanenSteg.Redigeringsmodus' })}
                    </Chips.Toggle>
                </Chips>

                <div className="ax-md:pb-2 mb-4 flex flex-wrap" id="legend">
                    <UttaksplanLegend
                        perioderForKalendervisning={perioderForKalendervisning}
                        readOnly={readOnly}
                        selectLegend={setValgtLegend}
                    />
                </div>

                <div className="ax-md:flex-row flex flex-col">
                    <div className={erRedigeringInaktiv ? 'flex-1' : 'ax-md:w-[295px]'}>
                        <Calendar
                            periods={perioderForKalendervisning.concat(valgtePerioder).sort(sortPeriods)}
                            setSelectedPeriods={readOnly ? undefined : setRedigeringAktivOgValgtePerioder}
                            getSrTextForSelectedPeriod={readOnly ? undefined : getSrTextForSelectedPeriod}
                            nrOfColumns={erRedigeringInaktiv ? 2 : 1}
                            isRangeSelection={isRangeSelection}
                            firstDateInCalendar={førsteDatoIKalender}
                            lastDateInCalendar={sisteDatoIKalender}
                        />
                        {antallMånederLagtTilKalender <= maksAntallEkstraMåneder && !erRedigeringInaktiv && (
                            <Button
                                onClick={() => setAntallMånederLagtTilKalender((value) => value + 3)}
                                type="button"
                                variant="secondary"
                                size="small"
                                className="mt-4 w-full"
                            >
                                <FormattedMessage id="UttaksplanKalender.LeggTilMåneder" />
                            </Button>
                        )}
                        {antallMånederLagtTilKalender > maksAntallEkstraMåneder && !erRedigeringInaktiv && (
                            <InlineMessage className="mt-2" status="info" role="status">
                                <FormattedMessage id="UttaksplanKalender.Maks3År" />
                            </InlineMessage>
                        )}
                    </div>
                    {!readOnly && !erRedigeringInaktiv && uttaksplanRedigering && scrollToKvoteOppsummering && (
                        <div
                            className={[
                                'fixed right-0 bottom-0 left-0 z-40 w-full',
                                'ax-md:sticky ax-md:top-24 ax-md:ml-4 ax-md:max-w-82 ax-md:self-start',
                                'pb-[env(safe-area-inset-bottom,1rem)]',
                            ].join(' ')}
                        >
                            <RedigerKalenderIndex
                                valgtePerioder={valgtePerioder}
                                setValgtePerioder={setRedigeringAktivOgValgtePerioder}
                                scrollToKvoteOppsummering={scrollToKvoteOppsummering}
                                labels={
                                    <UttaksplanLegend
                                        perioderForKalendervisning={perioderForKalendervisning}
                                        readOnly
                                        selectLegend={setValgtLegend}
                                        skjulTekstSomDefault
                                    />
                                }
                            />
                        </div>
                    )}
                </div>
            </VStack>

            <HStack justify="center">
                <Button
                    className="ax-md:pb-0 mt-2 print:hidden"
                    variant="tertiary"
                    icon={<DownloadIcon aria-hidden />}
                    onClick={() => toPDF()}
                    type="button"
                >
                    <FormattedMessage id="kalender.lastNed" />
                </Button>
            </HStack>
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

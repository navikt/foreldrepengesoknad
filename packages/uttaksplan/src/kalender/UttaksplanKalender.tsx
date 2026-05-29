import { TrashIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Button, HStack, InlineMessage, Link, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, links } from '@navikt/fp-constants';
import { Calendar, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../context/UttaksplanRedigeringContext';
import { harPeriodeDerMorsAktivitetIkkeErValgt } from '../utils/periodeUtils';
import { UttaksplanLegend } from './legend/UttaksplanLegend';
import { KalenderPdf } from './pdf/KalenderPdf';
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

    const [antallMånederLagtTilPåSluttenAvKalender, setAntallMånederLagtTilPåSluttenAvKalender] = useState(0);
    const [skalViseFørsteMuligeDatoIKalender, setSkalViseFørsteMuligeDatoIKalender] = useState(false);

    const [erRedigeringAktiv, setErRedigeringAktiv] = useState(false);
    const [isRangeSelection, setIsRangeSelection] = useState(true);
    const [valgtePerioder, setValgtePerioder] = useState<CalendarPeriod[]>([]);
    const [endredePerioder, setEndredePerioder] = useState<Array<{ fom: string; tom: string }>>([]);

    const scrollAbortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => scrollAbortRef.current?.abort();
    }, []);

    const setEndredePerioderMedScroll = useCallback(
        (perioder: Array<{ fom: string; tom: string }>) => {
            if (perioder.length === 0) {
                setEndredePerioder([]);
                return;
            }

            const førsteDato = dayjs(perioder[0]!.fom);
            const element = document.querySelector(
                `[data-month-key="${førsteDato.year()}-${førsteDato.month()}"]`,
            );

            scrollAbortRef.current?.abort();
            scrollAbortRef.current = new AbortController();
            const signal = scrollAbortRef.current.signal;

            ventPåScrollFerdig(element, signal).then(() => {
                if (!signal.aborted) {
                    setEndredePerioder(perioder);
                }
            });
        },
        [],
    );

    const setRedigeringAktivOgValgtePerioder = useCallback<React.Dispatch<React.SetStateAction<CalendarPeriod[]>>>(
        (perioder) => {
            setErRedigeringAktiv(true);
            setValgtePerioder(perioder);
            setEndredePerioder([]);
        },
        [],
    );

    const {
        uttakPerioder,
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const perioderForKalendervisning = usePerioderForKalendervisning(endredePerioder, barnehagestartdato);

    const {
        førsteDatoIKalender,
        sisteDatoIKalender,
        kanLeggeTilFlereMånederPåStarten,
        kanLeggeTilFlereMånederPåSlutten,
    } = useAntallMånederIKalenderData(
        antallMånederLagtTilPåSluttenAvKalender,
        skalViseFørsteMuligeDatoIKalender,
        barnehagestartdato,
    );

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
            <VStack gap="space-24">
                {!readOnly && (
                    <HStack gap="space-16">
                        <Button
                            type="button"
                            size="small"
                            variant="primary"
                            onClick={() => {
                                setErRedigeringAktiv((prev) => !prev);
                                setValgtePerioder([]);
                            }}
                        >
                            {erRedigeringAktiv ? (
                                <FormattedMessage id="UttaksplanKalender.StopRedigering" />
                            ) : (
                                <FormattedMessage id="UttaksplanKalender.StartRedigering" />
                            )}
                        </Button>
                        {uttaksplanRedigering && (
                            <Button
                                type="button"
                                size="small"
                                variant="secondary"
                                icon={<TrashIcon aria-hidden height={24} width={24} />}
                                onClick={() => uttaksplanRedigering.setVisFjernAltModal(true)}
                                aria-haspopup="dialog"
                                aria-expanded={uttaksplanRedigering.visFjernAltModal}
                                aria-controls={
                                    uttaksplanRedigering.visFjernAltModal ? 'FjernAltIUttaksplanModal' : undefined
                                }
                            >
                                <FormattedMessage id="UttaksplanHandlingKnapper.FjernAlt" />
                            </Button>
                        )}
                    </HStack>
                )}
                {!readOnly && !erRedigeringInaktiv && (
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

                {harPeriodeDerMorsAktivitetIkkeErValgt(rettighetType, uttakPerioder) && (
                    <Alert variant="warning">
                        <VStack gap="space-2">
                            <BodyShort>
                                <FormattedMessage id="UttaksplanKalender.MarkertePerioder" />
                            </BodyShort>
                            <Link href={links.aktivitetskrav} target="_blank" rel="noopener noreferrer">
                                <FormattedMessage id="UttaksplanKalender.HvaErAktivitetskrav" />
                            </Link>
                        </VStack>
                    </Alert>
                )}

                {erRedigeringInaktiv && (
                    <div className="ax-md:pb-2 mb-4 flex flex-wrap" id="legend">
                        <UttaksplanLegend
                            perioderForKalendervisning={perioderForKalendervisning}
                            readOnly={readOnly}
                            selectLegend={setValgtLegend}
                            barnehagestartdato={barnehagestartdato}
                        />
                    </div>
                )}

                <div className="ax-md:flex-row flex flex-col">
                    <div className={erRedigeringInaktiv ? 'flex-1' : 'ax-md:w-full'}>
                        {kanLeggeTilFlereMånederPåStarten && !erRedigeringInaktiv && (
                            <Button
                                onClick={() => setSkalViseFørsteMuligeDatoIKalender(true)}
                                type="button"
                                variant="secondary"
                                size="small"
                                className="mb-4 w-full"
                            >
                                <FormattedMessage id="UttaksplanKalender.LeggTilMåneder" />
                            </Button>
                        )}
                        <Calendar
                            periods={perioderForKalendervisning.concat(valgtePerioder).sort(sortPeriods)}
                            setSelectedPeriods={readOnly ? undefined : setRedigeringAktivOgValgtePerioder}
                            getSrTextForSelectedPeriod={readOnly ? undefined : getSrTextForSelectedPeriod}
                            nrOfColumns={2}
                            isRangeSelection={isRangeSelection}
                            firstDateInCalendar={førsteDatoIKalender}
                            lastDateInCalendar={sisteDatoIKalender}
                        />
                        {kanLeggeTilFlereMånederPåSlutten && !erRedigeringInaktiv && (
                            <Button
                                onClick={() => setAntallMånederLagtTilPåSluttenAvKalender((value) => value + 3)}
                                type="button"
                                variant="secondary"
                                size="small"
                                className="mt-4 w-full"
                            >
                                <FormattedMessage id="UttaksplanKalender.LeggTilMåneder" />
                            </Button>
                        )}
                        {!kanLeggeTilFlereMånederPåSlutten && !erRedigeringInaktiv && (
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
                                setEndredePerioder={setEndredePerioderMedScroll}
                                scrollToKvoteOppsummering={scrollToKvoteOppsummering}
                                labels={
                                    <UttaksplanLegend
                                        perioderForKalendervisning={perioderForKalendervisning}
                                        readOnly
                                        selectLegend={setValgtLegend}
                                        skjulTekstSomDefault
                                        barnehagestartdato={barnehagestartdato}
                                    />
                                }
                            />
                        </div>
                    )}
                </div>
            </VStack>

            <KalenderPdf
                perioderForKalendervisning={perioderForKalendervisning}
                førsteDatoIKalender={førsteDatoIKalender}
                sisteDatoIKalender={sisteDatoIKalender}
                barnehagestartdato={barnehagestartdato}
            />
        </VStack>
    );
};

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

const HEADER_HØGDE = 80;

/** Sjekkar om ein del av elementet er synleg i viewporten (under headeren). */
const erElementSynlegIViewport = (el: Element): boolean => {
    const rect = el.getBoundingClientRect();
    return rect.bottom > HEADER_HØGDE && rect.top < window.innerHeight;
};

/**
 * Scrollar elementet inn i viewporten om naudsynt, og resolvar når scrollen er ferdig.
 * Detekterer scroll-slutt ved å overvake scroll-posisjonen kvar frame — når posisjonen
 * er stabil i fleire frames på rad, er scrollen ferdig.
 */
const ventPåScrollFerdig = (element: Element | null, signal: AbortSignal): Promise<void> => {
    if (!element || erElementSynlegIViewport(element)) {
        return Promise.resolve();
    }

    element.scrollIntoView?.({ behavior: 'smooth', block: 'center' });

    return new Promise((resolve) => {
        const scrollTarget = document.scrollingElement ?? document.documentElement;
        let førreScrollTop = scrollTarget.scrollTop;
        let stabileFrames = 0;
        let rafId = 0;

        const sjekkScrollPosisjon = () => {
            if (signal.aborted) {
                resolve();
                return;
            }
            const noverandeScrollTop = scrollTarget.scrollTop;
            if (noverandeScrollTop === førreScrollTop) {
                stabileFrames++;
                if (stabileFrames >= 3) {
                    resolve();
                    return;
                }
            } else {
                stabileFrames = 0;
                førreScrollTop = noverandeScrollTop;
            }
            rafId = requestAnimationFrame(sjekkScrollPosisjon);
        };

        signal.addEventListener('abort', () => cancelAnimationFrame(rafId), { once: true });
        rafId = requestAnimationFrame(sjekkScrollPosisjon);
    });
};

import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Button, HStack, InlineMessage, Link, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, links } from '@navikt/fp-constants';
import { Calendar, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../context/UttaksplanRedigeringContext';
import { erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import { isAvslåttPeriode, isAvslåttPeriodeFørsteSeksUkerMor } from '../utils/periodeUtils';
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

    const setRedigeringAktivOgValgtePerioder = useCallback<React.Dispatch<React.SetStateAction<CalendarPeriod[]>>>(
        (periode) => {
            setErRedigeringAktiv(true);
            setValgtePerioder(periode);
            setEndredePerioder([]);
        },
        [],
    );

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
            <AvslåttePerioder />

            <VStack gap="space-24">
                {!readOnly && (
                    <VStack gap="space-24">
                        <div>
                            <Button
                                type="button"
                                size="small"
                                variant="primary"
                                onClick={() => {
                                    setErRedigeringAktiv(!erRedigeringAktiv);
                                    setValgtePerioder([]);
                                }}
                            >
                                {erRedigeringAktiv ? (
                                    <FormattedMessage id="UttaksplanKalender.StopRedigering" />
                                ) : (
                                    <FormattedMessage id="UttaksplanKalender.StartRedigering" />
                                )}
                            </Button>
                        </div>
                        {!erRedigeringInaktiv && (
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
                    </VStack>
                )}

                {perioderForKalendervisning.some((p) => p.isMarked) && (
                    <Alert variant="warning">
                        <FormattedMessage id="UttaksplanKalender.MarkertePerioder" />
                        <Link href={links.aktivitetskrav} target="_blank">
                            <FormattedMessage id="UttaksplanKalender.HvaErAktivitetskrav" />
                        </Link>
                    </Alert>
                )}

                {erRedigeringInaktiv && (
                    <div className="ax-md:pb-2 mb-4 flex flex-wrap" id="legend">
                        <UttaksplanLegend
                            perioderForKalendervisning={perioderForKalendervisning}
                            readOnly={readOnly}
                            selectLegend={setValgtLegend}
                        />
                    </div>
                )}

                <div className="ax-md:flex-row flex flex-col">
                    <div className={erRedigeringInaktiv ? 'flex-1' : 'ax-md:w-[295px]'}>
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
                            nrOfColumns={erRedigeringInaktiv ? 2 : 1}
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
                                setEndredePerioder={setEndredePerioder}
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

            <KalenderPdf
                perioderForKalendervisning={perioderForKalendervisning}
                førsteDatoIKalender={førsteDatoIKalender}
                sisteDatoIKalender={sisteDatoIKalender}
            />
        </VStack>
    );
};

const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));

const AvslåttePerioder = () => {
    const { uttakPerioder, foreldreInfo, familiehendelsedato } = useUttaksplanData();

    const harAvslåttePerioderSomIkkeGirTapteDager = uttakPerioder.some(
        (p) =>
            isAvslåttPeriode(p) &&
            erVanligUttakPeriode(p) &&
            p.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER' &&
            (foreldreInfo.søker === 'FAR_MEDMOR' || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsedato)),
    );

    return harAvslåttePerioderSomIkkeGirTapteDager ? (
        <Alert variant="info" className="my-6">
            <FormattedMessage id="kalender.avslåttePerioder" />
        </Alert>
    ) : null;
};

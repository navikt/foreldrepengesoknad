import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Box, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { DDMMM_DATE_FORMAT } from '@navikt/fp-constants';
import { CalendarPeriod } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { EksisterendeValgtePerioder } from './EksisterendeValgtePerioder';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

type Props = {
    children: React.ReactNode[] | React.ReactNode;
    kanLeggeTilFerie: boolean;
};

export const RedigeringPanel = ({ children, kanLeggeTilFerie }: Props) => {
    const intl = useIntl();

    const {
        erMinimert,
        erIRedigeringsmodus,
        sammenslåtteValgtePerioder,
        eksisterendePerioderSomErValgt,
        setErMinimert,
    } = useKalenderRedigeringContext();

    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(!erIRedigeringsmodus);

    return (
        <VStack
            gap="space-24"
            className={
                erIRedigeringsmodus && !erMinimert
                    ? 'bg-ax-bg-default fixed inset-0 z-50 overflow-y-auto md:static md:overflow-visible'
                    : undefined
            }
        >
            <Box.New background="accent-soft" padding="4">
                <VStack gap="space-8">
                    {!erIRedigeringsmodus && (
                        <HStack gap="space-8" align="center" wrap={false}>
                            <PencilIcon title="a11y-title" fontSize="1.5rem" />
                            <Heading size="small">
                                <FormattedMessage id="RedigeringPanel.EndreTil" />
                            </Heading>
                        </HStack>
                    )}
                    <HStack justify="space-between" align="center" wrap={false}>
                        <Heading size="xsmall">
                            <FormattedMessage
                                id="RedigeringPanel.ValgteDager"
                                values={{ antall: finnAntallDager(sammenslåtteValgtePerioder) }}
                            />
                        </Heading>
                        <Show below="md" asChild>
                            {erMinimert ? (
                                <ChevronUpIcon
                                    title={intl.formatMessage({ id: 'RedigeringPanel.Maksimer' })}
                                    fontSize="1.5rem"
                                    onClick={() => setErMinimert(false)}
                                />
                            ) : (
                                <ChevronDownIcon
                                    title={intl.formatMessage({ id: 'RedigeringPanel.Minimer' })}
                                    fontSize="1.5rem"
                                    onClick={() => setErMinimert(true)}
                                />
                            )}
                        </Show>
                        {erIRedigeringsmodus && (
                            <Show above="md" asChild>
                                {visPeriodeDetaljer ? (
                                    <ChevronUpIcon
                                        title={intl.formatMessage({ id: 'RedigeringPanel.SkjulDetaljer' })}
                                        fontSize="1.5rem"
                                        onClick={() => setVisPeriodeDetaljer(false)}
                                    />
                                ) : (
                                    <ChevronDownIcon
                                        title={intl.formatMessage({ id: 'RedigeringPanel.VisDetaljer' })}
                                        fontSize="1.5rem"
                                        onClick={() => setVisPeriodeDetaljer(true)}
                                    />
                                )}
                            </Show>
                        )}
                    </HStack>
                    <BodyShort>
                        {eksisterendePerioderSomErValgt.length === 0 ? (
                            <FormattedMessage id="RedigeringPanel.DuHarMarkertNyeDager" />
                        ) : (
                            <FormattedMessage
                                id="RedigeringPanel.EksisterendePerioder"
                                values={{ antall: eksisterendePerioderSomErValgt.length }}
                            />
                        )}
                    </BodyShort>
                    {erIRedigeringsmodus && visPeriodeDetaljer && (
                        <Show above="md">
                            <PeriodeDetaljerOgInfoMeldinger kanLeggeTilFerie={kanLeggeTilFerie} />
                        </Show>
                    )}
                    {erIRedigeringsmodus && !erMinimert && (
                        <Show below="md">
                            <PeriodeDetaljerOgInfoMeldinger kanLeggeTilFerie={kanLeggeTilFerie} />
                        </Show>
                    )}
                </VStack>
            </Box.New>

            <div className={erMinimert ? 'hidden' : 'block px-4 pb-4'}>
                <VStack gap="space-24">
                    {!erIRedigeringsmodus && <PeriodeDetaljerOgInfoMeldinger kanLeggeTilFerie={kanLeggeTilFerie} />}
                    {children}
                </VStack>
            </div>
        </VStack>
    );
};

const PeriodeDetaljerOgInfoMeldinger = ({ kanLeggeTilFerie }: { kanLeggeTilFerie: boolean }) => {
    const { erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, eksisterendePerioderSomErValgt, oppdaterUttaksplan, setValgtePerioder } =
        useKalenderRedigeringContext();

    const slettPeriode = getSlettPeriodeFn(
        sammenslåtteValgtePerioder,
        erFarEllerMedmor,
        oppdaterUttaksplan,
        setValgtePerioder,
    );

    const harValgtPerioderBådeFørOgEtterFamiliehendelsedato = harValgtBådeFørOgEtterFamiliehendelsedato(
        sammenslåtteValgtePerioder,
        familiehendelsedato,
    );

    return (
        <VStack gap="space-16">
            {eksisterendePerioderSomErValgt.length === 0 && (
                <BodyShort>
                    <FormattedMessage id="RedigeringPanel.NyeDagerForklaring" />
                </BodyShort>
            )}

            {eksisterendePerioderSomErValgt.length > 0 && (
                <EksisterendeValgtePerioder perioder={eksisterendePerioderSomErValgt} slettPeriode={slettPeriode} />
            )}

            {!kanLeggeTilFerie && !harValgtPerioderBådeFørOgEtterFamiliehendelsedato && (
                <Alert variant="info" size="small">
                    <FormattedMessage id="RedigeringPanel.KanIkkeLeggeTilPeriode" />
                </Alert>
            )}
            {!kanLeggeTilFerie && harValgtPerioderBådeFørOgEtterFamiliehendelsedato && (
                <Alert variant="info" size="small">
                    <FormattedMessage
                        id="RedigeringPanel.KanIkkeLeggeTilPeriodeValgForOgEtter"
                        values={{ dato: dayjs(familiehendelsedato).format(DDMMM_DATE_FORMAT) }}
                    />
                </Alert>
            )}
        </VStack>
    );
};

const finnAntallDager = (perioder: CalendarPeriod[]): number => {
    return perioder.reduce((acc, periode) => {
        const dager = dayjs(periode.tom).diff(dayjs(periode.fom), 'day') + 1;
        return acc + dager;
    }, 0);
};

const harValgtBådeFørOgEtterFamiliehendelsedato = (
    perioder: CalendarPeriod[],
    familiehendelsedato: string,
): boolean => {
    const harPeriodeFør = perioder.some((p) => dayjs(p.fom).isBefore(familiehendelsedato));
    const harPeriodeEtter = perioder.some((p) => dayjs(p.tom).isSameOrAfter(familiehendelsedato));

    return harPeriodeFør && harPeriodeEtter;
};

const getSlettPeriodeFn =
    (
        sammenslåtteValgtePerioder: CalendarPeriod[],
        erFarEllerMedmor: boolean,
        oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void,
        setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>,
    ) =>
    (periode: { fom: string; tom: string }) => {
        const start = dayjs(periode.fom);
        const end = dayjs(periode.tom);

        const perioder = sammenslåtteValgtePerioder.filter((p) => {
            const pStart = dayjs(p.fom);
            const pEnd = dayjs(p.tom);

            return start.isSameOrBefore(pEnd, 'day') && end.isSameOrAfter(pStart, 'day');
        });

        oppdaterUttaksplan(
            perioder.map<Planperiode>((p) => ({
                forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                fom: p.fom,
                tom: p.tom,
                readOnly: false,
                id: uniqueId(),
            })),
        );

        const erPerioderOverlappendeFn = getErPerioderOverlappende(perioder);
        setValgtePerioder((oldPeriods) => oldPeriods.filter(erPerioderOverlappendeFn));
    };

const getErPerioderOverlappende = (perioder: CalendarPeriod[]) => (p: CalendarPeriod) =>
    !perioder.some((rp) => dayjs(p.fom).isSameOrBefore(rp.tom, 'day') && dayjs(p.tom).isSameOrAfter(rp.fom, 'day'));

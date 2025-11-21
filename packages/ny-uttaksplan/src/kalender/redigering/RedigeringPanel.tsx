import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Box, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types/src/genererteTyper';
import { CalendarPeriod } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { EksisterendeValgtePerioder } from './EksisterendeValgtePerioder';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { usePeriodeValidator } from './utils/usePeriodeValidator';

type Props = {
    children: React.ReactNode[] | React.ReactNode;
};

export const RedigeringPanel = ({ children }: Props) => {
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
                            <PencilIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.EndreTil' })}
                                fontSize="1.5rem"
                            />
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
                            <PeriodeDetaljerOgInfoMeldinger />
                        </Show>
                    )}
                    {erIRedigeringsmodus && !erMinimert && (
                        <Show below="md">
                            <PeriodeDetaljerOgInfoMeldinger />
                        </Show>
                    )}
                </VStack>
            </Box.New>

            <div className={erMinimert ? 'hidden' : 'block px-4 pb-4'}>
                <VStack gap="space-24">
                    {!erIRedigeringsmodus && <PeriodeDetaljerOgInfoMeldinger />}
                    {children}
                </VStack>
            </div>
        </VStack>
    );
};

const PeriodeDetaljerOgInfoMeldinger = () => {
    const { familiehendelsedato } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, eksisterendePerioderSomErValgt, oppdaterUttaksplan, setValgtePerioder } =
        useKalenderRedigeringContext();

    const slettPeriode = getSlettPeriodeFn(sammenslåtteValgtePerioder, oppdaterUttaksplan, setValgtePerioder);

    const harPeriodeFørEllerEtter = sammenslåtteValgtePerioder.some(
        (p) => dayjs(p.fom).isBefore(familiehendelsedato) || dayjs(p.tom).isSameOrAfter(familiehendelsedato),
    );

    const { erFeriePerioderGyldige } = usePeriodeValidator(sammenslåtteValgtePerioder);
    const erFerieValgbart = erFeriePerioderGyldige();

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

            {!erFerieValgbart && harPeriodeFørEllerEtter && (
                <Alert variant="info" size="small">
                    <Heading size="xsmall" level="3">
                        <FormattedMessage id="RedigeringPanel.OmFerie" />
                    </Heading>
                    <FormattedMessage id="RedigeringPanel.FerieForEllerEtterTermin" />
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

const getSlettPeriodeFn =
    (
        sammenslåtteValgtePerioder: CalendarPeriod[],
        oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void,
        setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>,
    ) =>
    (periode: { fom: string; tom: string; forelder?: BrukerRolleSak_fpoversikt }) => {
        const start = dayjs(periode.fom);
        const end = dayjs(periode.tom);

        const perioder = sammenslåtteValgtePerioder.filter((p) => {
            const pStart = dayjs(p.fom);
            const pEnd = dayjs(p.tom);

            return start.isSameOrBefore(pEnd, 'day') && end.isSameOrAfter(pStart, 'day');
        });

        oppdaterUttaksplan(
            perioder.map<Planperiode>((p) => ({
                erAnnenPartEøs: false,
                forelder: periode.forelder,
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                fom: dayjs(p.fom).isBefore(periode.fom) ? periode.fom : p.fom,
                tom: dayjs(p.tom).isAfter(periode.tom) ? periode.tom : p.tom,
                readOnly: false,
                id: uniqueId(),
            })),
        );

        const erPerioderOverlappendeFn = getErPerioderOverlappende(perioder);
        setValgtePerioder((oldPeriods) => oldPeriods.filter(erPerioderOverlappendeFn));
    };

const getErPerioderOverlappende = (perioder: CalendarPeriod[]) => (p: CalendarPeriod) =>
    !perioder.some((rp) => dayjs(p.fom).isSameOrBefore(rp.tom, 'day') && dayjs(p.tom).isSameOrAfter(rp.fom, 'day'));

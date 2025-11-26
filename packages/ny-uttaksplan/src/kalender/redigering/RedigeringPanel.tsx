import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Box, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types/src/genererteTyper';
import { CalendarPeriod } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { EksisterendeValgtePerioder } from './EksisterendeValgtePerioder';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { countWeekdaysBetween } from './utils/kalenderPeriodeUtils';
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
            gap="space-16"
            className={
                erIRedigeringsmodus && !erMinimert
                    ? 'bg-ax-bg-default fixed inset-0 z-50 overflow-y-auto md:static md:max-h-[calc(100vh-100px)] md:overflow-visible'
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
    const { familiehendelsedato, familiesituasjon, bareFarMedmorHarRett } = useUttaksplanData();

    const erAdopsjon = familiesituasjon === 'adopsjon';

    const { sammenslåtteValgtePerioder, eksisterendePerioderSomErValgt, oppdaterUttaksplan, setValgtePerioder } =
        useKalenderRedigeringContext();

    const slettPeriode = getSlettPeriodeFn(sammenslåtteValgtePerioder, oppdaterUttaksplan, setValgtePerioder);

    const harPeriodeFør = sammenslåtteValgtePerioder.some((p) => dayjs(p.fom).isBefore(familiehendelsedato));
    const harPeriodeEtter = sammenslåtteValgtePerioder.some((p) => dayjs(p.tom).isSameOrAfter(familiehendelsedato));
    const harPeriodeFørEllerEtter = harPeriodeFør || harPeriodeEtter;

    const harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato = !sammenslåtteValgtePerioder.some((periode) =>
        dayjs(periode.tom).isAfter(dayjs(familiehendelsedato).subtract(22, 'days')),
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

            {erAdopsjon && harPeriodeFør && (
                <Alert variant="info" size="small">
                    <FormattedMessage id="RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato" />
                </Alert>
            )}

            {!erAdopsjon &&
                !bareFarMedmorHarRett &&
                !erFerieValgbart &&
                harPeriodeFørEllerEtter &&
                !harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato && (
                    <Alert variant="info" size="small">
                        <FormattedMessage id="RedigeringPanel.KanMisteDager" />
                    </Alert>
                )}
        </VStack>
    );
};

const finnAntallDager = (perioder: CalendarPeriod[]): number => {
    return perioder.reduce((acc, periode) => {
        const dager = countWeekdaysBetween(dayjs(periode.fom), dayjs(periode.tom));
        return acc + dager;
    }, 0);
};

const getSlettPeriodeFn =
    (
        sammenslåtteValgtePerioder: CalendarPeriod[],
        oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void,
        setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>,
    ) =>
    (periodeSomSkalSlettes: { fom: string; tom: string; forelder?: BrukerRolleSak_fpoversikt }) => {
        const fomPeriodeSomSkalSlettes = dayjs(periodeSomSkalSlettes.fom);
        const tomPeriodeSomSkalSlettes = dayjs(periodeSomSkalSlettes.tom);

        const perioder = sammenslåtteValgtePerioder.filter(
            (p) =>
                fomPeriodeSomSkalSlettes.isSameOrBefore(dayjs(p.tom), 'day') &&
                tomPeriodeSomSkalSlettes.isSameOrAfter(dayjs(p.fom), 'day'),
        );

        oppdaterUttaksplan(
            perioder.map<Planperiode>((p) => ({
                erAnnenPartEøs: false,
                forelder: periodeSomSkalSlettes.forelder,
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                fom: dayjs(p.fom).isBefore(periodeSomSkalSlettes.fom) ? periodeSomSkalSlettes.fom : p.fom,
                tom: dayjs(p.tom).isAfter(periodeSomSkalSlettes.tom) ? periodeSomSkalSlettes.tom : p.tom,
                readOnly: false,
                id: uniqueId(),
            })),
        );

        setValgtePerioder((oldPeriods) => justerPerioder(oldPeriods, periodeSomSkalSlettes));
    };

const justerPerioder = (valgtePerioder: CalendarPeriod[], periodeSomSkalSlettes: { fom: string; tom: string }) => {
    const fomSlett = dayjs(periodeSomSkalSlettes.fom);
    const tomSlett = dayjs(periodeSomSkalSlettes.tom);

    return valgtePerioder.flatMap((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);

        // Hvis perioden ikke overlapper perioden som skal slettes, behold hele perioden
        if (tom.isBefore(fomSlett, 'day') || fom.isAfter(tomSlett, 'day')) {
            return [periode];
        }

        const nyePerioder = [];

        // Behold delen av valgt periode som ligger før perioden som skal slettes
        if (fom.isBefore(fomSlett, 'day')) {
            nyePerioder.push({
                ...periode,
                fom: fom.format(ISO_DATE_FORMAT),
                tom: fomSlett.subtract(1, 'day').format(ISO_DATE_FORMAT),
            });
        }

        // Behold delen av valgt periode som ligger etter delen som skal slettes
        if (tom.isAfter(tomSlett, 'day')) {
            nyePerioder.push({
                ...periode,
                fom: tomSlett.add(1, 'day').format(ISO_DATE_FORMAT),
                tom: tom.format(ISO_DATE_FORMAT),
            });
        }

        return nyePerioder;
    });
};

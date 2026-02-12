import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { getVarighetString } from '../../utils/dateUtils';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import { ForskyvEllerErstattPeriode } from './ForskyvEllerErstattPeriode';
import { PeriodeDetaljerOgInfoMeldinger } from './PeriodeDetaljerOgInfoMeldinger';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { RødRamme } from './utils/RødRamme';
import { finnAntallDager, finnValgtePerioder } from './utils/kalenderPeriodeUtils';
import { useErDesktop, useMediaResetMinimering } from './utils/useMediaActions';

interface Props {
    åpneRedigeringsmodus: () => void;
    labels: React.ReactNode;
}

export const PeriodeOversiktPanel = ({ åpneRedigeringsmodus, labels }: Props) => {
    const intl = useIntl();
    const [visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel] = useState(false);

    const {
        foreldreInfo: { søker },
        erPeriodeneTilAnnenPartLåst,
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, setValgtePerioder, leggTilUttaksplanPerioder, setEndredePerioder } =
        useKalenderRedigeringContext();

    const erDesktop = useErDesktop();

    const [erMinimert, setErMinimert] = useState(!erDesktop);

    useMediaResetMinimering(setErMinimert);

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const eksisterendePerioderSomErValgt = finnValgtePerioder(
        sammenslåtteValgtePerioder,
        uttakPerioderInkludertTapteDager,
    );

    const harValgtEøsPeriode = eksisterendePerioderSomErValgt.some((p) => erEøsUttakPeriode(p));

    const skalViseLeggTilKnappetekst =
        eksisterendePerioderSomErValgt.length === 0 ||
        (erPeriodeneTilAnnenPartLåst &&
            eksisterendePerioderSomErValgt.some((p) => erVanligUttakPeriode(p) && p.forelder !== søker));

    const leggTilEllerForskyvPeriode = (skalForskyve: boolean) => {
        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.map(
                (p) =>
                    ({
                        forelder: søker,
                        fom: p.fom,
                        tom: p.tom,
                        utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                    }) satisfies UttakPeriode_fpoversikt,
            ),
            skalForskyve,
        );

        setValgtePerioder([]);
        setEndredePerioder(sammenslåtteValgtePerioder);
    };

    if (visEndreEllerForskyvPanel) {
        return (
            <Box padding="space-24">
                <ForskyvEllerErstattPeriode
                    setVisEndreEllerForskyvPanel={setVisEndreEllerForskyvPanel}
                    leggTilEllerForskyvPeriode={leggTilEllerForskyvPeriode}
                />
            </Box>
        );
    }

    return (
        <VStack
            gap="space-16"
            className={erMinimert ? undefined : 'max-h-[calc(100vh-100px)] overflow-y-auto md:max-h-full'}
        >
            <Show above="md">
                <Box background="accent-soft" padding="space-8" style={{ cursor: 'pointer' }}>
                    <VStack gap="space-8">
                        <HStack gap="space-8" align="center" wrap={false}>
                            <PencilIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.EndreTil' })}
                                fontSize="1.5rem"
                            />
                            <Heading size="small">
                                <FormattedMessage id="RedigeringPanel.EndreTil" />
                            </Heading>
                        </HStack>
                        <HStack>
                            <RødRamme>
                                <BodyShort size="small">
                                    <FormattedMessage
                                        id="RedigeringPanel.ValgteDager"
                                        values={{
                                            varighet: getVarighetString(
                                                finnAntallDager(sammenslåtteValgtePerioder),
                                                intl,
                                            ),
                                        }}
                                    />
                                </BodyShort>
                            </RødRamme>
                        </HStack>
                    </VStack>
                </Box>
            </Show>
            <Show below="md">
                <Box
                    padding="space-12"
                    onClick={() => setErMinimert(!erMinimert)}
                    className="bg-ax-bg-accent-soft hover:bg-ax-bg-accent-moderate cursor-pointer"
                >
                    <VStack gap="space-4" align="center">
                        {erMinimert ? (
                            <ChevronUpIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Maksimer' })}
                                height={24}
                                width={24}
                            />
                        ) : (
                            <ChevronDownIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Minimer' })}
                                height={24}
                                width={24}
                            />
                        )}

                        <HStack gap="space-8" align="center" wrap={false}>
                            <PencilIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.EndreTil' })}
                                fontSize="1.5rem"
                            />
                            <HStack gap="space-32" wrap={false}>
                                <Heading size="small">
                                    <FormattedMessage id="RedigeringPanel.EndreTil" />
                                </Heading>
                                {erMinimert && <RødRamme>{finnAntallDager(sammenslåtteValgtePerioder)}</RødRamme>}
                            </HStack>
                        </HStack>

                        {!erMinimert && (
                            <RødRamme>
                                <FormattedMessage
                                    id="RedigeringPanel.ValgteDager"
                                    values={{
                                        varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                                    }}
                                />
                            </RødRamme>
                        )}
                    </VStack>
                </Box>
            </Show>
            {!erMinimert && (
                <div className="block px-4 pb-4">
                    <VStack gap="space-12">
                        {labels}
                        <PeriodeDetaljerOgInfoMeldinger />
                        {harValgtEøsPeriode && (
                            <HStack justify="end">
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    size="small"
                                    onClick={() => setValgtePerioder([])}
                                >
                                    <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                                </Button>
                            </HStack>
                        )}
                        {!harValgtEøsPeriode && (
                            <VStack gap="space-12">
                                <Show above="md">
                                    <LeggTilOgEndreKnapp
                                        åpneRedigeringsmodus={åpneRedigeringsmodus}
                                        skalViseLeggTilKnappetekst={skalViseLeggTilKnappetekst}
                                    />
                                </Show>
                                <HStack gap="space-12" justify="space-between" className="w-full">
                                    <Show below="md" className="flex-1">
                                        <LeggTilOgEndreKnapp
                                            åpneRedigeringsmodus={åpneRedigeringsmodus}
                                            skalViseLeggTilKnappetekst={skalViseLeggTilKnappetekst}
                                        />
                                    </Show>
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        onClick={() => setVisEndreEllerForskyvPanel(true)}
                                        type="button"
                                    >
                                        {skalViseLeggTilKnappetekst ? (
                                            <FormattedMessage id="RedigeringPanel.LeggTilFerie" />
                                        ) : (
                                            <FormattedMessage id="RedigeringPanel.EndreTilFerie" />
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="tertiary"
                                        size="small"
                                        onClick={() => setValgtePerioder([])}
                                    >
                                        <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                                    </Button>
                                </HStack>
                            </VStack>
                        )}
                    </VStack>
                </div>
            )}
        </VStack>
    );
};

const LeggTilOgEndreKnapp = ({
    åpneRedigeringsmodus,
    skalViseLeggTilKnappetekst,
}: {
    åpneRedigeringsmodus: () => void;
    skalViseLeggTilKnappetekst: boolean;
}) => {
    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const harValgtPeriodeFørFamDato = sammenslåtteValgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(familiehendelsedato),
    );

    if (!(harValgtPeriodeFørFamDato && familiesituasjon === 'adopsjon')) {
        return (
            <Button variant="primary" size="small" onClick={åpneRedigeringsmodus} type="button" className="w-full">
                {skalViseLeggTilKnappetekst ? (
                    <FormattedMessage id="RedigeringPanel.AddUttaksplan" />
                ) : (
                    <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                )}
            </Button>
        );
    }

    return null;
};

import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { ReactNode, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { getVarighetString } from '../../utils/dateUtils';
import { PeriodeDetaljerOgInfoMeldinger } from './PeriodeDetaljerOgInfoMeldinger';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { finnAntallDager } from './utils/kalenderPeriodeUtils';
import { useErDesktop, useMediaResetMinimering } from './utils/useMediaActions';

interface Props {
    åpneRedigeringsmodus: () => void;
}

export const PeriodeOversiktPanel = ({ åpneRedigeringsmodus }: Props) => {
    const intl = useIntl();

    const { erFarEllerMedmor } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, oppdaterUttaksplan, setValgtePerioder } = useKalenderRedigeringContext();

    const erDesktop = useErDesktop();

    const [erMinimert, setErMinimert] = useState(!erDesktop);

    useMediaResetMinimering(setErMinimert);

    const leggTilFerie = () => {
        oppdaterUttaksplan(
            sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
                erAnnenPartEøs: false,
                forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
                fom: p.fom,
                tom: p.tom,
                readOnly: false,
                id: uniqueId(),
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            })),
        );

        setValgtePerioder([]);
    };

    return (
        <VStack
            gap="space-16"
            className={!erMinimert ? 'max-h-[calc(100vh-100px)] overflow-y-auto md:max-h-full' : undefined}
        >
            <Show above="md">
                <Box.New background="accent-soft" padding="2" style={{ cursor: 'pointer' }}>
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
                        <HStack justify="space-between" align="center" wrap={false}>
                            <Heading size="xsmall">
                                <FormattedMessage
                                    id="RedigeringPanel.ValgteDager"
                                    values={{
                                        varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                                    }}
                                />
                            </Heading>
                        </HStack>
                    </VStack>
                </Box.New>
            </Show>

            <Show below="md">
                <Box.New
                    background="accent-soft"
                    padding="space-12"
                    onClick={() => setErMinimert(!erMinimert)}
                    className="hover:bg-ax-shadow-dialog cursor-pointer hover:border-b hover:border-t"
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
                                {erMinimert && <RødSirkel>{finnAntallDager(sammenslåtteValgtePerioder)}</RødSirkel>}
                            </HStack>
                        </HStack>

                        {!erMinimert && (
                            <RødSirkel>
                                <FormattedMessage
                                    id="RedigeringPanel.ValgteDager"
                                    values={{
                                        varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                                    }}
                                />
                            </RødSirkel>
                        )}
                    </VStack>
                </Box.New>
            </Show>

            {!erMinimert && (
                <div className="block px-4 pb-4">
                    <VStack gap="space-24">
                        <PeriodeDetaljerOgInfoMeldinger />
                        <VStack gap="space-12">
                            <Show above="md">
                                <LeggTilOgEndreKnapp åpneRedigeringsmodus={åpneRedigeringsmodus} />
                            </Show>
                            <HStack gap="space-12" justify="space-between" className="w-full">
                                <Show below="md" className="flex-1">
                                    <LeggTilOgEndreKnapp åpneRedigeringsmodus={åpneRedigeringsmodus} />
                                </Show>
                                <Button variant="secondary" size="small" onClick={leggTilFerie} type="button">
                                    <FormattedMessage id="RedigeringPanel.LeggInnFerie" />
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
                    </VStack>
                </div>
            )}
        </VStack>
    );
};

const RødSirkel = ({ children }: { children: ReactNode }) => (
    <span
        className={
            'bg-ax-bg-danger-strong text-ax-bg-default inline-flex h-7 min-w-7 ' +
            'items-center justify-center rounded-full px-2'
        }
    >
        {children}
    </span>
);

const LeggTilOgEndreKnapp = ({ åpneRedigeringsmodus }: { åpneRedigeringsmodus: () => void }) => {
    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, erKunEnHelEksisterendePeriodeValgt } = useKalenderRedigeringContext();

    const harValgtPeriodeFørFamDato = sammenslåtteValgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(familiehendelsedato),
    );

    if (!(harValgtPeriodeFørFamDato && familiesituasjon === 'adopsjon')) {
        return (
            <Button variant="primary" size="small" onClick={åpneRedigeringsmodus} type="button" className="w-full">
                {erKunEnHelEksisterendePeriodeValgt ? (
                    <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                ) : (
                    <FormattedMessage id="RedigeringPanel.NyUttaksplan" />
                )}
            </Button>
        );
    }

    return null;
};

import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { getVarighetString } from '../../utils/dateUtils';
import { LeggTilEllerEndrePeriodeForm } from './LeggTilEllerEndrePeriodeForm';
import { PeriodeDetaljerOgInfoMeldinger } from './PeriodeDetaljerOgInfoMeldinger';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { RødRamme } from './utils/RødRamme';
import { finnAntallDager } from './utils/kalenderPeriodeUtils';
import { useMediaRemoveScrollingOnMobile, useMediaResetMinimering } from './utils/useMediaActions';

interface Props {
    lukkRedigeringsmodus: () => void;
    labels: React.ReactNode;
}

export const LeggTilEllerEndrePeriodePanel = ({ lukkRedigeringsmodus, labels }: Props) => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(false);

    const [erMinimert, setErMinimert] = useState(false);

    useMediaResetMinimering(setErMinimert);
    useMediaRemoveScrollingOnMobile(erMinimert);

    return (
        <VStack
            gap="space-2"
            className={
                erMinimert
                    ? undefined
                    : 'bg-ax-bg-default fixed inset-0 z-50 overflow-y-auto md:static md:max-h-[calc(100vh-100px)] md:overflow-visible'
            }
        >
            <Show above="md">
                <Box background="accent-soft" padding="space-16">
                    <VStack gap="space-16">
                        <HStack justify="space-between" align="center" wrap={false}>
                            <RødRamme>
                                <Heading size="xsmall">
                                    <FormattedMessage
                                        id="RedigeringPanel.ValgteDager"
                                        values={{
                                            varighet: getVarighetString(
                                                finnAntallDager(sammenslåtteValgtePerioder),
                                                intl,
                                            ),
                                        }}
                                    />
                                </Heading>
                            </RødRamme>
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
                        </HStack>
                        {labels}
                        {visPeriodeDetaljer && <PeriodeDetaljerOgInfoMeldinger />}
                    </VStack>
                </Box>
            </Show>
            <Show below="md">
                <VStack gap="space-12">
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

                            <HStack>
                                <RødRamme>
                                    <Heading size="xsmall">
                                        <FormattedMessage
                                            id="RedigeringPanel.ValgteDager"
                                            values={{
                                                varighet: getVarighetString(
                                                    finnAntallDager(sammenslåtteValgtePerioder),
                                                    intl,
                                                ),
                                            }}
                                        />
                                    </Heading>
                                </RødRamme>
                            </HStack>
                        </VStack>
                    </Box>
                    {!erMinimert && (
                        <VStack gap="space-16" className="px-4 pb-4">
                            {labels}
                            <PeriodeDetaljerOgInfoMeldinger />
                        </VStack>
                    )}
                </VStack>
            </Show>
            <div className={erMinimert ? 'hidden' : 'block px-4 pb-4'}>
                <div className={erMinimert ? 'hidden' : 'block'}>
                    <div className="px-4 pt-4 pb-4">
                        <LeggTilEllerEndrePeriodeForm lukkRedigeringsmodus={lukkRedigeringsmodus} />
                    </div>
                </div>
            </div>
        </VStack>
    );
};

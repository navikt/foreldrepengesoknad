import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, Show, VStack } from '@navikt/ds-react';

import { KvoteOppsummeringsTittel } from '../../KvoteOppsummering';
import { UttaksplanHandlingKnapper } from '../../components/UttaksplanHandlingKnapper';
import { useUttaksplanRedigering } from '../../context/UttaksplanRedigeringContext';
import { useErDesktop, useMediaResetMinimering } from './utils/useMediaActions';

export const PeriodeIkkeValgtPanel = () => {
    const intl = useIntl();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const erDesktop = useErDesktop();

    const [erMinimert, setErMinimert] = useState(!erDesktop);

    useMediaResetMinimering(setErMinimert);

    return (
        <VStack gap="space-16">
            <Box.New
                background="accent-soft"
                padding="space-12"
                onClick={erDesktop ? undefined : () => setErMinimert(!erMinimert)}
                className={
                    erDesktop ? undefined : 'hover:bg-ax-shadow-dialog cursor-pointer hover:border-b hover:border-t'
                }
            >
                <Show below="md">
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
                        <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                    </VStack>
                </Show>
                <Show above="md">
                    <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                </Show>
            </Box.New>
            {!erMinimert && (
                <VStack gap="space-16" className="px-4 pb-4">
                    <KvoteOppsummeringsTittel visStatusIkoner={false} brukEnkelVisning />
                    <FormattedMessage id="RedigeringKalenderIndex.SeDetaljer" />
                    <UttaksplanHandlingKnapper
                        visKnapper={false}
                        tilbakestillPlan={
                            uttaksplanRedigering?.harEndretPlan
                                ? () => uttaksplanRedigering.tilbakestillUttaksplan()
                                : undefined
                        }
                        angreEndring={
                            uttaksplanRedigering && uttaksplanRedigering.uttaksplanVersjoner.length > 0
                                ? () => uttaksplanRedigering.angreSisteEndring()
                                : undefined
                        }
                        fjernAltIPlanen={() => uttaksplanRedigering?.setVisFjernAltModal(true)}
                    />
                </VStack>
            )}
        </VStack>
    );
};

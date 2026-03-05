import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Link, Show, VStack } from '@navikt/ds-react';

import { KvoteOppsummeringsTittel } from '../../../KvoteOppsummering';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { UttaksplanHandlingKnapper } from '../../../felles/UttaksplanHandlingKnapper';
import { useTellDagerIUttaksPeriodene } from '../../../utils/kvoteOppsummeringUtils';
import { RødRamme } from '../utils/RødRamme';
import { useErDesktop, useMediaResetMinimering } from '../utils/useMediaActions';

interface Props {
    scrollToKvoteOppsummering: () => void;
    labels: React.ReactNode;
}

export const IngenDagerValgtPanel = ({ scrollToKvoteOppsummering, labels }: Props) => {
    const intl = useIntl();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const erDesktop = useErDesktop();

    const [erMinimert, setErMinimert] = useState(!erDesktop);

    useMediaResetMinimering(setErMinimert);

    return (
        <VStack gap="space-16">
            <Box
                padding="space-12"
                onClick={erDesktop ? undefined : () => setErMinimert(!erMinimert)}
                className={
                    erDesktop
                        ? 'bg-ax-bg-accent-soft'
                        : 'bg-ax-bg-accent-soft hover:bg-ax-bg-accent-moderate cursor-pointer'
                }
            >
                <Show below="md">
                    <VStack gap="space-1" align="center">
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
                        <BodyShort size="small">
                            <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                        </BodyShort>
                        <Tittel />
                    </VStack>
                </Show>
                <Show above="md">
                    <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                </Show>
            </Box>
            {!erMinimert && (
                <VStack gap="space-16" className="px-4 pb-4">
                    {labels}
                    <VStack gap="space-16">
                        <Show above="md">
                            <Tittel />
                        </Show>
                        <Link as="button" onClick={scrollToKvoteOppsummering}>
                            <FormattedMessage id="RedigeringKalenderIndex.SeDetaljer" />
                        </Link>
                    </VStack>
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
                        visFjernAltModal={uttaksplanRedigering?.visFjernAltModal}
                    />
                </VStack>
            )}
        </VStack>
    );
};

const Tittel = () => {
    const { antallUbrukteDager } = useTellDagerIUttaksPeriodene();

    if (antallUbrukteDager === 0) {
        return (
            <Box className="px-2" borderWidth="2" borderRadius="8">
                <KvoteOppsummeringsTittel erInnsyn={false} visStatusIkoner={false} brukEnkelVisning />
            </Box>
        );
    }

    return (
        <RødRamme>
            <KvoteOppsummeringsTittel erInnsyn={false} visStatusIkoner={false} brukEnkelVisning />
        </RødRamme>
    );
};

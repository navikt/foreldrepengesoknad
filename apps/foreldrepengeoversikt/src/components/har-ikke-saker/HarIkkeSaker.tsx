import { FormattedMessage } from 'react-intl';

import { Alert, Heading, VStack } from '@navikt/ds-react';

import { SøkelenkerPanel } from '../søkelenker/SøkelenkerPanel';

interface Props {
    harOppdatertSak: boolean;
}

export const HarIkkeSaker = ({ harOppdatertSak }: Props) => {
    return (
        <VStack gap="space-32">
            {harOppdatertSak && (
                <Alert variant="info">
                    <Heading spacing size="small" level="3">
                        <FormattedMessage id="HarIkkeSaker.IngenSoknader" />
                    </Heading>
                    <FormattedMessage id="HarIkkeSaker.ToUker" />
                </Alert>
            )}
            <SøkelenkerPanel />
        </VStack>
    );
};

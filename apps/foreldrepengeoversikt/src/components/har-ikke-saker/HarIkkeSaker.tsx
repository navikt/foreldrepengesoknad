import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, Heading, VStack } from '@navikt/ds-react';

import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { SøkelenkerPanel } from '../søkelenker/SøkelenkerPanel';

interface Props {
    harOppdatertSak: boolean;
}

export const HarIkkeSaker: FunctionComponent<Props> = ({ harOppdatertSak }) => {
    useSetBackgroundColor('blue');

    return (
        <VStack gap="8">
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

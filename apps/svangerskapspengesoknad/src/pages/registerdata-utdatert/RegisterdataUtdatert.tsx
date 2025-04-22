import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { ContentWrapper } from '@navikt/fp-ui';

interface Props {
    slettMellomlagringOgLastSidePåNytt: () => void;
}

export const RegisterdataUtdatert = ({ slettMellomlagringOgLastSidePåNytt }: Props) => {
    loggAmplitudeEvent({
        origin: 'svangerskapspengesoknad',
        eventName: 'besøk',
        eventData: { tittel: 'registerdataUtdatert' },
    });

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large" level="2">
                    <FormattedMessage id="RegisterdataUtdatert.Svangerskapspenger" />
                </Heading>
                <Alert variant="warning">
                    <VStack gap="4">
                        <Heading size="small" level="3">
                            <FormattedMessage id="RegisterdataUtdatert.Heading" />
                        </Heading>
                        <BodyShort>
                            <FormattedMessage id="RegisterdataUtdatert.Message" />
                        </BodyShort>
                    </VStack>
                </Alert>
                <div>
                    <Button type="button" variant="primary" onClick={slettMellomlagringOgLastSidePåNytt}>
                        <FormattedMessage id="RegisterdataUtdatert.StartPaNytt" />
                    </Button>
                </div>
            </VStack>
        </ContentWrapper>
    );
};

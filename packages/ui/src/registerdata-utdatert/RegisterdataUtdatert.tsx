import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { AppName } from '@navikt/fp-types';

import { ContentWrapper } from '../content-wrapper/ContentWrapper';

interface Props {
    slettMellomlagringOgLastSidePåNytt: () => void;
    appName: AppName;
}

export const RegisterdataUtdatert = ({ slettMellomlagringOgLastSidePåNytt, appName }: Props) => {
    loggAmplitudeEvent({
        origin: appName,
        eventName: 'besøk',
        eventData: { tittel: 'registerdataUtdatert' },
    });

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large" level="2">
                    {appName === 'engangsstonad' && <FormattedMessage id="RegisterdataUtdatert.Engangsstønad" />}
                    {appName === 'foreldrepengesoknad' && <FormattedMessage id="RegisterdataUtdatert.Foreldrepenger" />}
                    {appName === 'svangerskapspengesoknad' && (
                        <FormattedMessage id="RegisterdataUtdatert.Svangerskapspenger" />
                    )}
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

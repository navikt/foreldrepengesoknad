import { LaptopTriangleIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';

import { ContentWrapper } from '@navikt/fp-ui';

const retryCallback = async () => {
    window.location.href = window.location.origin;
};

const ErrorPage: React.FunctionComponent = () => (
    <ContentWrapper>
        <Box background="surface-alt-2-subtle" borderRadius="large" padding="6">
            <VStack gap="16">
                <VStack gap="6">
                    <LaptopTriangleIcon aria-hidden height={44} width={44} />
                    <VStack gap="2">
                        <Heading size="medium">
                            <FormattedMessage id="ErrorPage.ErrorHeader" />
                        </Heading>
                        <BodyShort>
                            <FormattedMessage id="ErrorPage.ErrorBody" />
                        </BodyShort>
                    </VStack>
                </VStack>
                <Button onClick={retryCallback}>
                    <FormattedMessage id="ErrorPage.TryAgain" />
                </Button>
            </VStack>
        </Box>
    </ContentWrapper>
);

export default ErrorPage;

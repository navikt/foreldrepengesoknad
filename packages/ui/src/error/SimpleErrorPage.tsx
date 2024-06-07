import { LaptopTriangleIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';

import ContentWrapper from '../contentWrapper/ContentWrapper';

const retryCallback = async () => {
    window.location.href = window.location.origin;
};

const SimpleErrorPage: React.FunctionComponent = () => (
    <ContentWrapper>
        <Box background="surface-alt-2-subtle" borderRadius="large" padding="6">
            <VStack gap="16">
                <VStack gap="6">
                    <LaptopTriangleIcon aria-hidden height={44} width={44} />
                    <VStack gap="2">
                        <Heading size="medium">
                            <FormattedMessage id="SimpleErrorPage.ErrorHeader" />
                        </Heading>
                        <BodyShort>
                            <FormattedMessage id="SimpleErrorPage.ErrorBody" />
                        </BodyShort>
                    </VStack>
                </VStack>
                <Button onClick={retryCallback}>
                    <FormattedMessage id="SimpleErrorPage.TryAgain" />
                </Button>
            </VStack>
        </Box>
    </ContentWrapper>
);

export default SimpleErrorPage;

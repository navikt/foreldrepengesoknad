import { LaptopTriangleIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';

import ContentWrapper from '../contentWrapper/ContentWrapper';

const defaultRetryCallback = async () => {
    window.location.href = window.location.origin;
};

interface Props {
    retryCallback?: () => void;
}

const SimpleErrorPage: React.FunctionComponent<Props> = ({ retryCallback }) => (
    <ContentWrapper>
        <Box background="surface-alt-3-subtle" borderRadius="large" padding="6">
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
                <Button onClick={retryCallback || defaultRetryCallback}>
                    <FormattedMessage id="SimpleErrorPage.TryAgain" />
                </Button>
            </VStack>
        </Box>
    </ContentWrapper>
);

export default SimpleErrorPage;

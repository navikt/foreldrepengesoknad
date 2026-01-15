import { LaptopTriangleIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';

import { SkjemaRotLayout } from '../skjema-rotlayout/SkjemaRotLayout';

const defaultRetryCallback = () => {
    globalThis.location.href = globalThis.location.origin;
};

interface Props {
    retryCallback?: () => void;
}

export const SimpleErrorPage = ({ retryCallback }: Props) => (
    <SkjemaRotLayout pageTitle="">
        <Box.New background="brand-blue-moderate" borderRadius="large" padding="6">
            <VStack gap="space-64">
                <VStack gap="space-24">
                    <LaptopTriangleIcon aria-hidden height={44} width={44} />
                    <VStack gap="space-8">
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
        </Box.New>
    </SkjemaRotLayout>
);

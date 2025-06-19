import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Box, Button, HStack, Heading, Label, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { AppName } from '@navikt/fp-types';

import { ContentWrapper } from '../content-wrapper/ContentWrapper';

interface Props {
    appName: AppName;
    errorMessage: string;
    retryCallback: () => void;
}

export const ErrorPage = ({ appName, errorMessage, retryCallback }: Props) => (
    <ContentWrapper
        pageTitle={
            <>
                {appName === 'engangsstonad' && <FormattedMessage id="ErrorPage.Engangsstønad" />}
                {appName === 'foreldrepengesoknad' && <FormattedMessage id="ErrorPage.Foreldrepenger" />}
                {appName === 'svangerskapspengesoknad' && <FormattedMessage id="ErrorPage.Svangerskapspenger" />}
            </>
        }
    >
        <VStack gap="10">
            <Alert variant="warning">
                <VStack gap="4">
                    <Heading size="small" level="3">
                        <FormattedMessage id="ErrorPage.Heading" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id="ErrorPage.Message" />
                    </BodyShort>
                </VStack>
            </Alert>
            <HStack gap="4" justify="center">
                <Link href={links.kontaktOss} target="_blank">
                    <Button type="button" variant="secondary">
                        <FormattedMessage id="ErrorPage.Contact" />
                    </Button>
                </Link>
                <Button type="button" variant="primary" onClick={retryCallback}>
                    <FormattedMessage id="ErrorPage.TryAgain" />
                </Button>
            </HStack>
            <Box background="surface-neutral-moderate" padding="4">
                <VStack gap="2">
                    <Label>
                        <FormattedMessage id="ErrorPage.ErrorMessage" />
                    </Label>
                    <BodyShort>Error: {errorMessage}</BodyShort>
                </VStack>
            </Box>
        </VStack>
    </ContentWrapper>
);

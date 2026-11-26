import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Box, Button, HStack, Heading, Label, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { AppName } from '@navikt/fp-types';

import { SkjemaRotLayout } from '../skjema-rotlayout/SkjemaRotLayout';

interface Props {
    appName: AppName;
    errorMessage: string;
    retryCallback: () => void;
}

export const ErrorPage = ({ appName, errorMessage, retryCallback }: Props) => (
    <SkjemaRotLayout
        pageTitle={
            <>
                {appName === 'engangsstonad' && <FormattedMessage id="ErrorPage.Engangsstønad" />}
                {appName === 'foreldrepengesoknad' && <FormattedMessage id="ErrorPage.Foreldrepenger" />}
                {appName === 'svangerskapspengesoknad' && <FormattedMessage id="ErrorPage.Svangerskapspenger" />}
            </>
        }
    >
        <VStack gap="space-40">
            <Alert variant="warning">
                <VStack gap="space-16">
                    <Heading size="small" level="3">
                        <FormattedMessage id="ErrorPage.Heading" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id="ErrorPage.Message" />
                    </BodyShort>
                </VStack>
            </Alert>
            <HStack gap="space-16" justify="center">
                {/* Aksel setter role="button" når as="a". Lenken navigerer, så den skal ha lenkerolle. */}
                <Button
                    as="a"
                    role="link"
                    href={links.kontaktOss}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                >
                    <FormattedMessage id="ErrorPage.Contact" />
                </Button>
                <Button type="button" variant="primary" onClick={retryCallback}>
                    <FormattedMessage id="ErrorPage.TryAgain" />
                </Button>
            </HStack>
            <Box background="neutral-moderate" padding="space-16">
                <VStack gap="space-8">
                    <Label>
                        <FormattedMessage id="ErrorPage.ErrorMessage" />
                    </Label>
                    <BodyShort>Error: {errorMessage}</BodyShort>
                </VStack>
            </Box>
        </VStack>
    </SkjemaRotLayout>
);

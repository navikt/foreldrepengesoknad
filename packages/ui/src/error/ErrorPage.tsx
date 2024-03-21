import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Box, Button, HStack, Heading, Label, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import ContentWrapper from '../contentWrapper/ContentWrapper';

export type AppName = 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger' | 'Foreldrepengeplanlegger';

export interface Props {
    appName: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger' | 'Foreldrepengeplanlegger';
    errorMessage: string;
    retryCallback: () => void;
}

const ErrorPage: FunctionComponent<Props> = ({ appName, errorMessage, retryCallback }) => (
    <ContentWrapper>
        <VStack gap="20">
            <Heading size="large" level="2">
                {appName === 'Engangsstønad' && <FormattedMessage id="ErrorPage.Engangsstønad" />}
                {appName === 'Foreldrepenger' && <FormattedMessage id="ErrorPage.Foreldrepenger" />}
                {appName === 'Svangerskapspenger' && <FormattedMessage id="ErrorPage.Svangerskapspenger" />}
                {appName === 'Foreldrepengeplanlegger' && <FormattedMessage id="ErrorPage.Foreldrepengeplanlegger" />}
            </Heading>
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
        </VStack>
    </ContentWrapper>
);

export default ErrorPage;

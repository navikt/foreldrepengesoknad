import { FunctionComponent, useCallback } from 'react';
import { links } from '@navikt/fp-constants';
import { Alert, BodyShort, Button, HStack, Heading, Label, Link, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import UiIntlProvider from '../i18n/UiIntlProvider';
import ContentWrapper from '../contentWrapper/ContentWrapper';

export interface Props {
    appnavn: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger';
    feilmelding: string;
}

const ErrorPage: FunctionComponent<Props> = ({ appnavn, feilmelding }) => {
    const søkPåNytt = useCallback(() => location.reload(), []);
    //TODO Bytt ut div under med Box frå ds-react når oppdatert til siste versjon
    return (
        <UiIntlProvider>
            <ContentWrapper>
                <VStack gap="20">
                    <Heading size="large">
                        {appnavn === 'Engangsstønad' && <FormattedMessage id="ErrorPage.Engangsstønad" />}
                        {appnavn === 'Foreldrepenger' && <FormattedMessage id="ErrorPage.Foreldrepenger" />}
                        {appnavn === 'Svangerskapspenger' && <FormattedMessage id="ErrorPage.Svangerskapspenger" />}
                    </Heading>
                    <VStack gap="10">
                        <Alert variant="warning">
                            <VStack gap="4">
                                <Heading size="small">
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
                            <Button type="button" variant="primary" onClick={søkPåNytt}>
                                <FormattedMessage id="ErrorPage.TryAgain" />
                            </Button>
                        </HStack>
                        <div style={{ backgroundColor: 'var(--a-gray-200)', padding: '16px', borderRadius: '4px' }}>
                            <VStack gap="2">
                                <Label>
                                    <FormattedMessage id="ErrorPage.ErrorMessage" />
                                </Label>
                                <BodyShort>Error: {feilmelding}</BodyShort>
                            </VStack>
                        </div>
                    </VStack>
                </VStack>
            </ContentWrapper>
        </UiIntlProvider>
    );
};

export default ErrorPage;

import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import { LayoutWrapper } from '../../sections/LayoutWrapper.tsx';

export const BruktOpplysniungerOmArbeidsforhold = () => {
    return (
        <>
            <LayoutWrapper className="md:pb-28 p-4">
                <Alert variant="info">
                    <VStack gap="2">
                        <Heading size="small" level="2">
                            <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tekst.1" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tekst.2" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage
                                id="BruktOpplysningerOmArbeidsforhold.tekst.3"
                                values={{
                                    a: (msg) => (
                                        <Link href={links.personvernerklæringOm} rel="noreferrer" target="_blank">
                                            {msg}
                                        </Link>
                                    ),
                                }}
                            />
                        </BodyLong>
                    </VStack>
                </Alert>
            </LayoutWrapper>
        </>
    );
};

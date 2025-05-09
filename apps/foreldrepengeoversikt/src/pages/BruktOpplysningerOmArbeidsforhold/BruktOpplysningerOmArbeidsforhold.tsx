import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, BodyShort, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import { ForsideHeader } from '../../components/header/Header';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';

export const BruktOpplysniungerOmArbeidsforhold = () => {
    return (
        <PageRouteLayout header={<ForsideHeader />}>
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
        </PageRouteLayout>
    );
};

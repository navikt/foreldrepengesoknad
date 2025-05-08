import { FormattedMessage } from 'react-intl';

import { BodyShort, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import { ForsideHeader } from '../../components/header/Header';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';

export const BruktOpplysniungerOmArbeidsforhold = () => {
    return (
        <PageRouteLayout header={<ForsideHeader />}>
            <VStack gap="2">
                <Heading size="medium">
                    <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tittel" />
                </Heading>
                <BodyShort className="flex">
                    <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tekst.1" />
                </BodyShort>
                <BodyShort className="flex">
                    <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tekst.2" />
                </BodyShort>
                <BodyShort>
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
                </BodyShort>
            </VStack>
        </PageRouteLayout>
    );
};

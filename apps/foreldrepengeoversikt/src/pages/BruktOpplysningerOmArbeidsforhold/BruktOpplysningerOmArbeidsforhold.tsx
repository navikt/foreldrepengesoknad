import { FormattedMessage } from 'react-intl';

import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import { LayoutWrapper } from '../../sections/LayoutWrapper.tsx';

export const BruktOpplysningerOmArbeidsforhold = () => {
    return (
        <LayoutWrapper className="p-4 md:pb-28">
            <VStack className="bg-ax-bg-default border-ax-brand-blue-300 rounded-2xl border-2 p-4 shadow">
                <Heading size="small" level="2" spacing>
                    <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tittel" />
                </Heading>
                <BodyLong spacing>
                    <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tekst.1" />
                </BodyLong>
                <BodyLong spacing>
                    <FormattedMessage
                        id="BruktOpplysningerOmArbeidsforhold.tekst.2"
                        values={{
                            a: (msg) => (
                                <Link href={links.arbeidsforholdMineSider} rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </BodyLong>
                <BodyLong spacing>
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
                <BodyLong spacing>
                    <FormattedMessage
                        id="BruktOpplysningerOmArbeidsforhold.tekst.4"
                        values={{
                            a: (msg) => (
                                <Link href={links.forelderpengerHvorLenge} rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </BodyLong>
            </VStack>
        </LayoutWrapper>
    );
};

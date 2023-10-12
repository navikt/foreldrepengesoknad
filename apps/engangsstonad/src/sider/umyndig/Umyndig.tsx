import { FormattedMessage, useIntl } from 'react-intl';
import { HStack, Heading, Link, VStack } from '@navikt/ds-react';
import { Sidebanner, useDocumentTitle } from '@navikt/fp-common';
import Person from 'types/Person';
import { links } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';

export interface Props {
    person: Person;
}

const Umyndig: React.FunctionComponent<Props> = ({ person }) => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'Søknad.Pageheading' }));

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: 'umyndig',
    });

    return (
        <>
            <Sidebanner
                dialog={{
                    title: intl.formatMessage(
                        { id: 'Umyndig.Bobletittel' },
                        {
                            name: person.fornavn.toLowerCase(),
                        },
                    ),
                    textRich: (
                        <VStack gap="4" align="center">
                            <FormattedMessage id="Umyndig.Under18.Bobletekst" />
                            <Link href={links.papirsøknad}>
                                <FormattedMessage id="Umyndig.Under18.Boblelenketekst" />
                            </Link>
                        </VStack>
                    ),
                }}
            />
            <HStack justify="center">
                <Heading size="large">
                    <FormattedMessage id="Søknad.Pageheading" />
                </Heading>
            </HStack>
        </>
    );
};

export default Umyndig;

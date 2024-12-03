import { ArrowRightIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { Button, GuidePanel, HStack, Heading, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { ContentWrapper } from '@navikt/fp-ui';

export const IkkeKvinne = () => {
    logAmplitudeEvent('sidevisning', {
        app: 'svangerskapspengerny',
        team: 'foreldrepenger',
        pageKey: 'ikkeKvinne',
    });

    return (
        <ContentWrapper>
            <Heading level="1" size="xlarge">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <VStack gap="10">
                <GuidePanel poster>
                    <VStack gap="4">
                        <Heading level="2" size="small">
                            <FormattedMessage id="ikkeKvinne.tittel" />
                        </Heading>
                        <FormattedMessage id="ikkeKvinne.tekst" />
                    </VStack>
                </GuidePanel>

                <HStack justify="center">
                    <Button as="a" icon={<ArrowRightIcon aria-hidden />} iconPosition="right" href={links.nav}>
                        <FormattedMessage id="ikkeKvinne.knappetekst" />
                    </Button>
                </HStack>
            </VStack>
        </ContentWrapper>
    );
};

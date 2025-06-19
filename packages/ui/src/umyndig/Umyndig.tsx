import { ArrowRightIcon } from '@navikt/aksel-icons';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Button, GuidePanel, HStack, Heading, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { AppName } from '@navikt/fp-types';
import { useDocumentTitle } from '@navikt/fp-utils';

import { ContentWrapper } from '../content-wrapper/ContentWrapper';

interface Props {
    appName: AppName;
}

const getTitleText = (appnavn: Props['appName'], intl: IntlShape): string => {
    switch (appnavn) {
        case 'engangsstonad':
            return intl.formatMessage({ id: 'Umyndig.Pageheading.Engangsstonad' });
        case 'foreldrepengesoknad':
            return intl.formatMessage({ id: 'Umyndig.Pageheading.Foreldrepenger' });
        case 'svangerskapspengesoknad':
            return intl.formatMessage({ id: 'Umyndig.Pageheading.Svangerskapspenger' });
        default:
            throw new Error(`App ikke supportert: ${appnavn}`);
    }
};

export const Umyndig = ({ appName }: Props) => {
    const intl = useIntl();

    const titleText = getTitleText(appName, intl);
    useDocumentTitle(titleText);

    return (
        <ContentWrapper pageTitle={titleText}>
            <VStack gap="10">
                <GuidePanel poster>
                    <VStack gap="8">
                        <Heading level="3" size="small">
                            <FormattedMessage id="Umyndig.Tittel" />
                        </Heading>
                        <FormattedMessage id="Umyndig.Tekst" />
                    </VStack>
                </GuidePanel>
                <HStack justify="center">
                    <Button as="a" icon={<ArrowRightIcon />} iconPosition="right" href={links.papirsøknad}>
                        <FormattedMessage id="Umyndig.Knapp.Papirsøknad" />
                    </Button>
                </HStack>
            </VStack>
        </ContentWrapper>
    );
};

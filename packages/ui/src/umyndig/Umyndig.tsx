import { ArrowRightIcon } from '@navikt/aksel-icons';
import { FormattedMessage, IntlShape } from 'react-intl';

import { Button, GuidePanel, HStack, Heading, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { useDocumentTitle } from '@navikt/fp-utils';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import UiIntlProvider from '../i18n/ui/UiIntlProvider';
import useUiIntl from '../i18n/ui/useUiIntl';

export interface Props {
    appnavn: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger';
}

const getTitleText = (appnavn: Props['appnavn'], intl: IntlShape): string => {
    switch (appnavn) {
        case 'Engangsstønad':
            return intl.formatMessage({ id: 'Umyndig.Pageheading.Engangsstonad' });
        case 'Foreldrepenger':
            return intl.formatMessage({ id: 'Umyndig.Pageheading.Foreldrepenger' });
        case 'Svangerskapspenger':
            return intl.formatMessage({ id: 'Umyndig.Pageheading.Svangerskapspenger' });
    }
};

const Umyndig: React.FunctionComponent<Props> = ({ appnavn }) => {
    const intl = useUiIntl();

    const titleText = getTitleText(appnavn, intl);
    useDocumentTitle(titleText);

    logAmplitudeEvent('sidevisning', {
        app: appnavn,
        team: 'foreldrepenger',
        pageKey: 'umyndig',
    });

    return (
        <UiIntlProvider>
            <ContentWrapper>
                <VStack gap="10">
                    <Heading level="2" size="xlarge">
                        {titleText}
                    </Heading>
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
        </UiIntlProvider>
    );
};

export default Umyndig;

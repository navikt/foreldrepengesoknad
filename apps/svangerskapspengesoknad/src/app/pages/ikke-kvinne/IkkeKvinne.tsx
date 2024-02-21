import { ArrowRightIcon } from '@navikt/aksel-icons';
import { Button, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { FormattedMessage } from 'react-intl';

import { links } from '@navikt/fp-constants';
import './ikkeKvinne.css';

const IkkeKvinne: React.FunctionComponent = () => {
    const bem = bemUtils('ikke-kvinne');

    logAmplitudeEvent('sidevisning', {
        app: 'svangerskapspengerny',
        team: 'foreldrepenger',
        pageKey: 'ikkeKvinne',
    });

    return (
        <>
            <div className={bem.block}>
                <Heading level="1" size="xlarge" className={`${bem.element('tittel')}`}>
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

                    <div style={{ textAlign: 'center' }} className={bem.element('papirsøknadKnapp')}>
                        <Button as="a" icon={<ArrowRightIcon aria-hidden />} iconPosition="right" href={links.nav}>
                            <FormattedMessage id="ikkeKvinne.knappetekst" />
                        </Button>
                    </div>
                </VStack>
            </div>
        </>
    );
};

export default IkkeKvinne;

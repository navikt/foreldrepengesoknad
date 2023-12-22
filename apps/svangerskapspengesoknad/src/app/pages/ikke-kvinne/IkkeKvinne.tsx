import { Block, bemUtils } from '@navikt/fp-common';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { FormattedMessage } from 'react-intl';
import { PageKeys } from 'app/types/PageKeys';
import { Button, GuidePanel, Heading } from '@navikt/ds-react';

import './ikkeKvinne.css';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import links from 'app/links/links';

const IkkeKvinne: React.FunctionComponent = () => {
    const bem = bemUtils('ikke-kvinne');

    logAmplitudeEvent('sidevisning', {
        app: 'svangerskapspengerny',
        team: 'foreldrepenger',
        pageKey: PageKeys.IkkeKvinne,
    });

    return (
        <>
            <div className={bem.block}>
                <Heading level="1" size="xlarge" className={`${bem.element('tittel')}`}>
                    <FormattedMessage id="søknad.pageheading" />
                </Heading>
                <Block padBottom="xxl">
                    <GuidePanel poster>
                        <Block padBottom="xl">
                            <Heading level="2" size="small">
                                <FormattedMessage id="ikkeKvinne.tittel" />
                            </Heading>
                        </Block>
                        <FormattedMessage id="ikkeKvinne.tekst" />
                    </GuidePanel>
                </Block>

                <div style={{ textAlign: 'center' }} className={bem.element('papirsøknadKnapp')}>
                    <Block padBottom="xxxl">
                        <Button as="a" icon={<ArrowRightIcon aria-hidden />} iconPosition="right" href={links.nav}>
                            <FormattedMessage id="ikkeKvinne.knappetekst" />
                        </Button>
                    </Block>
                </div>
            </div>
        </>
    );
};

export default IkkeKvinne;

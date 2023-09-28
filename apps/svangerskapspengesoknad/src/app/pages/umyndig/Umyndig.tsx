import { Block, bemUtils, intlUtils, useDocumentTitle } from '@navikt/fp-common';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { FormattedMessage, useIntl } from 'react-intl';
import { PageKeys } from 'app/types/PageKeys';
import { Button, GuidePanel, Heading } from '@navikt/ds-react';

import './umyndig.css';
import { lenker } from 'app/util/lenker';
import { ArrowRightIcon } from '@navikt/aksel-icons';

export interface UmyndigProps {
    fornavn: string;
}

const Umyndig: React.FunctionComponent<UmyndigProps> = ({}) => {
    const bem = bemUtils('umyndig');
    const intl = useIntl();
    useDocumentTitle(intlUtils(intl, 'søknad.pageheading'));

    logAmplitudeEvent('sidevisning', {
        app: 'svangerskapspengerny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Umyndig,
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
                                <FormattedMessage id="umyndig.tittel" />
                            </Heading>
                        </Block>
                        <FormattedMessage id="umyndig.tekst" />
                    </GuidePanel>
                </Block>

                <div style={{ textAlign: 'center' }} className={bem.element('papirsøknadKnapp')}>
                    <Block padBottom="xxxl">
                        <Button
                            as="a"
                            icon={<ArrowRightIcon />}
                            iconPosition="right"
                            href={lenker.papirsøknadForeldrepenger}
                        >
                            <FormattedMessage id="umyndig.knapp.papirsøknad" />
                        </Button>
                    </Block>
                </div>
            </div>
        </>
    );
};

export default Umyndig;

import { FormattedMessage, useIntl } from 'react-intl';
import { BodyLong, GuidePanel } from '@navikt/ds-react';
import Block from '@navikt/fp-common/src/common/components/block/Block';
import { bemUtils, intlUtils, useDocumentTitle } from '@navikt/fp-common';
import { PageKeys, logAmplitudeEvent } from 'app/amplitude/amplitude';

const FlereArbeidsforholdGuidePanel: React.FunctionComponent = () => {
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
                <GuidePanel>
                    <Block>
                        <BodyLong>
                            <FormattedMessage id="velgArbeid.guidepanel.tekst" />
                            <li>
                                <FormattedMessage id="velgArbeid.guidepanel.liste.del1" />
                            </li>
                            <li>
                                <FormattedMessage id="velgArbeid.guidepanel.liste.del2" />
                            </li>
                        </BodyLong>
                    </Block>
                </GuidePanel>
            </div>
        </>
    );
};

export default FlereArbeidsforholdGuidePanel;

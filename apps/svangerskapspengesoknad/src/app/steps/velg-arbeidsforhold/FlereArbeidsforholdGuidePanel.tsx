import { FormattedMessage } from 'react-intl';
import { BodyLong, GuidePanel } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { logAmplitudeEvent } from '@navikt/fp-metrics';

const FlereArbeidsforholdGuidePanel: React.FunctionComponent = () => {
    logAmplitudeEvent('sidevisning', {
        app: 'svangerskapspengerny',
        team: 'foreldrepenger',
        pageKey: 'umyndig',
    });
    return (
        <Block padBottom="xl">
            <GuidePanel>
                <BodyLong>
                    <FormattedMessage id="velgArbeid.guidepanel.tekst" />
                </BodyLong>
                <ul>
                    <li>
                        <BodyLong>
                            <FormattedMessage id="velgArbeid.guidepanel.liste.del1" />
                        </BodyLong>
                    </li>
                    <li>
                        <BodyLong>
                            <FormattedMessage id="velgArbeid.guidepanel.liste.del2" />
                        </BodyLong>
                    </li>
                </ul>
            </GuidePanel>
        </Block>
    );
};

export default FlereArbeidsforholdGuidePanel;

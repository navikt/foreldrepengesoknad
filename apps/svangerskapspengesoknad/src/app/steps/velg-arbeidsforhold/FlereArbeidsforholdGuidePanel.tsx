import { BodyLong, GuidePanel } from '@navikt/ds-react';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { FormattedMessage } from 'react-intl';

const FlereArbeidsforholdGuidePanel: React.FunctionComponent = () => {
    logAmplitudeEvent('sidevisning', {
        app: 'svangerskapspengerny',
        team: 'foreldrepenger',
        pageKey: 'umyndig',
    });
    return (
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
    );
};

export default FlereArbeidsforholdGuidePanel;

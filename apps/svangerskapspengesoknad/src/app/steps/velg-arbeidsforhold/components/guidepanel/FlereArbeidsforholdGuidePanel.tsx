import { FormattedMessage } from 'react-intl';
import { BodyLong, GuidePanel } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { PageKeys } from 'app/types/PageKeys';

const FlereArbeidsforholdGuidePanel: React.FunctionComponent = () => {
    logAmplitudeEvent('sidevisning', {
        app: 'svangerskapspengerny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Umyndig,
    });
    return (
        <Block padBottom="xl">
            <GuidePanel>
                <BodyLong>
                    <FormattedMessage id="velgArbeid.guidepanel.tekst" />
                    <ul>
                        <li>
                            <FormattedMessage id="velgArbeid.guidepanel.liste.del1" />
                        </li>
                        <li>
                            <FormattedMessage id="velgArbeid.guidepanel.liste.del2" />
                        </li>
                    </ul>
                </BodyLong>
            </GuidePanel>
        </Block>
    );
};

export default FlereArbeidsforholdGuidePanel;

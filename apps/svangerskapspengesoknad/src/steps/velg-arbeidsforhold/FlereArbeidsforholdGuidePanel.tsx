import { FormattedMessage } from 'react-intl';

import { BodyLong, GuidePanel, List } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-metrics';

export const FlereArbeidsforholdGuidePanel = () => {
    loggUmamiEvent({ origin: 'svangerskapspengesoknad', eventName: 'besøk', eventData: { tittel: 'umyndig' } });

    return (
        <GuidePanel>
            <BodyLong>
                <FormattedMessage id="velgArbeid.guidepanel.tekst" />
            </BodyLong>
            <List>
                <List.Item>
                    <BodyLong>
                        <FormattedMessage id="velgArbeid.guidepanel.liste.del1" />
                    </BodyLong>
                </List.Item>
                <List.Item>
                    <BodyLong>
                        <FormattedMessage id="velgArbeid.guidepanel.liste.del2" />
                    </BodyLong>
                </List.Item>
            </List>
        </GuidePanel>
    );
};

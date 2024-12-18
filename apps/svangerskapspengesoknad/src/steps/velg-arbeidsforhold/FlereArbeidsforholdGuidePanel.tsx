import { FormattedMessage } from 'react-intl';

import { BodyLong, GuidePanel } from '@navikt/ds-react';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';

export const FlereArbeidsforholdGuidePanel = () => {
    loggAmplitudeEvent({ origin: 'Svangerskapspenger', eventName: 'besøk', eventData: { tittel: 'umyndig' } });

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

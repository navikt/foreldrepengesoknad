import { FormattedMessage, useIntl } from 'react-intl';

import { ReadMore } from '@navikt/ds-react';

import { logAmplitudeEventOnOpen } from '@navikt/fp-metrics';

export const InfoOmArbeidIUtlandet = () => {
    const intl = useIntl();
    return (
        <ReadMore
            onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'Hvordan_påvirke_SVP')}
            header={intl.formatMessage({ id: 'InfoOmArbeidIUtlandet.apneLabel' })}
        >
            <div>
                <FormattedMessage id="InfoOmArbeidIUtlandet.innhold" />
            </div>
        </ReadMore>
    );
};

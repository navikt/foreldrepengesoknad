import { FormattedMessage, useIntl } from 'react-intl';

import { ReadMore } from '@navikt/ds-react';

import { logAmplitudeEventOnOpen } from '@navikt/fp-metrics';

const InfoOmArbeidIUtlandet = () => {
    const intl = useIntl();
    return (
        <ReadMore
            onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'Hvordan_påvirke_SVP')}
            header={intl.formatMessage({ id: 'arbeidIUtlandet.apneLabel' })}
        >
            <div>
                <FormattedMessage id="arbeidIUtlandet.innhold" />
            </div>
        </ReadMore>
    );
};

export default InfoOmArbeidIUtlandet;

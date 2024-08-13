import { FormattedMessage, useIntl } from 'react-intl';

import { ReadMore } from '@navikt/ds-react';

import { onToggleInfo } from 'app/steps/barnet/amplitudeLoggerUtils';

const InfoOmArbeidIUtlandet = () => {
    const intl = useIntl();
    return (
        <ReadMore
            onOpenChange={onToggleInfo('Hvordan_påvirke_SVP')}
            header={intl.formatMessage({ id: 'arbeidIUtlandet.apneLabel' })}
        >
            <div>
                <FormattedMessage id="arbeidIUtlandet.innhold" />
            </div>
        </ReadMore>
    );
};

export default InfoOmArbeidIUtlandet;

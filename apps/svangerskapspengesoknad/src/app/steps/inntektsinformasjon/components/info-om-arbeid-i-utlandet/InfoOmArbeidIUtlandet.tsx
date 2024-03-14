import { FormattedMessage, useIntl } from 'react-intl';

import { ReadMore } from '@navikt/ds-react';

const InfoOmArbeidIUtlandet = () => {
    const intl = useIntl();
    return (
        <ReadMore header={intl.formatMessage({ id: 'arbeidIUtlandet.apneLabel' })}>
            <div>
                <FormattedMessage id="arbeidIUtlandet.innhold" />
            </div>
        </ReadMore>
    );
};

export default InfoOmArbeidIUtlandet;

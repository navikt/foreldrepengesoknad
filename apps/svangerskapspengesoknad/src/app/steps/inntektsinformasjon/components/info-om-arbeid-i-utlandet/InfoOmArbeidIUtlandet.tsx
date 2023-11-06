import { ReadMore } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { useIntl } from 'react-intl';

const InfoOmArbeidIUtlandet = () => {
    const intl = useIntl();
    return (
        <ReadMore header={intlUtils(intl, 'arbeidIUtlandet.apneLabel')}>
            <div> {intlUtils(intl, 'arbeidIUtlandet.innhold')}</div>
        </ReadMore>
    );
};

export default InfoOmArbeidIUtlandet;

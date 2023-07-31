import { ReadMore } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { useIntl } from 'react-intl';

const ArbeidIUtlandetReadMore = () => {
    const intl = useIntl();
    return (
        <ReadMore header={intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.apneLabel')}>
            <div> {intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.innhold')}</div>
        </ReadMore>
    );
};

export default ArbeidIUtlandetReadMore;

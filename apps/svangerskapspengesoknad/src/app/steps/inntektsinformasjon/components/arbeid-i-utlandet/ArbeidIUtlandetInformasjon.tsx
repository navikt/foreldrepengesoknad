import { ReadMore } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { useIntl } from 'react-intl';

const ArbeidIUtlandetInformasjon = () => {
    const intl = useIntl();
    return (
        //TODO: Mer informasjon
        <ReadMore header={intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.apneLabel')}>
            <div> TODO: Mer informasjon</div>
        </ReadMore>
    );
};

export default ArbeidIUtlandetInformasjon;

import { BodyShort, ReadMore } from '@navikt/ds-react';
import HarArbeidsforhold from './HarArbeidsforhold';
import HarIkkeArbeidsforhold from './HarIkkeArbeidsforhold';

import { intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import './arbeidsforholdInformasjon.css';
import { Arbeidsforhold } from '@navikt/fp-types';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    visManglerInfo?: boolean;
}
const ArbeidsforholdInformasjon: React.FunctionComponent<Props> = ({ arbeidsforhold, visManglerInfo = true }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;
    const intl = useIntl();

    return (
        <div style={{ marginTop: '1rem' }}>
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            {visManglerInfo && (
                <ReadMore header={intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.info')}>
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.arbeidsforhold.tekst" />
                    </BodyShort>
                </ReadMore>
            )}
        </div>
    );
};

export default ArbeidsforholdInformasjon;

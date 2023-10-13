import Arbeidsforhold from 'app/types/Arbeidsforhold';
import HarIkkeArbeidsforhold from './HarIkkeArbeidsforhold';
import HarArbeidsforhold from './HarArbeidsforhold';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import './arbeidsforholdInformasjon.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { intlUtils } from '@navikt/fp-common';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    visManglerInfo?: boolean;
}
const ArbeidsforholdInformasjon: React.FunctionComponent<Props> = ({ arbeidsforhold, visManglerInfo = true }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;
    const intl = useIntl();

    return (
        <>
            <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
            <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            {visManglerInfo && (
                <ReadMore header={intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.info')}>
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.arbeidsforhold.tekst" />
                    </BodyShort>
                </ReadMore>
            )}
        </>
    );
};

export default ArbeidsforholdInformasjon;

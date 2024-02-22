import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore } from '@navikt/ds-react';

import { Arbeidsforhold } from '@navikt/fp-types';

import HarArbeidsforhold from './HarArbeidsforhold';
import HarIkkeArbeidsforhold from './HarIkkeArbeidsforhold';

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
                <ReadMore header={intl.formatMessage({ id: 'inntektsinformasjon.arbeidsforhold.info' })}>
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.arbeidsforhold.tekst" />
                    </BodyShort>
                </ReadMore>
            )}
        </div>
    );
};

export default ArbeidsforholdInformasjon;

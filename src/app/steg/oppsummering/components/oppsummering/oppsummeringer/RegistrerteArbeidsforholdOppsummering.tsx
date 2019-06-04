import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Oppsummeringsseksjon from 'app/steg/oppsummering/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import Arbeidsforhold from '../../../../../types/Arbeidsforhold';

interface RegistrerteArbeidsforholdOppsummeringProps {
    arbeidsforhold: Arbeidsforhold[];
}

type Props = RegistrerteArbeidsforholdOppsummeringProps & InjectedIntlProps;

const RegistrerteArbeidsforholdOppsummering: React.StatelessComponent<Props> = ({ arbeidsforhold, intl }) => {
    return (
        <Oppsummeringsseksjon ingress={getMessage(intl, 'oppsummering.inntekt.registrerteArbeidsforhold')}>
            <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />
        </Oppsummeringsseksjon>
    );
};

export default injectIntl(RegistrerteArbeidsforholdOppsummering);

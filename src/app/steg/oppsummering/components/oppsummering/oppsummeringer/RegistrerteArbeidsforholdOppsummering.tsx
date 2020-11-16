import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';
import Oppsummeringsseksjon from 'app/steg/oppsummering/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import InformasjonOmArbeidsforholdWrapper from 'app/steg/andreInntekter/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import Arbeidsforhold from '../../../../../types/Arbeidsforhold';

interface RegistrerteArbeidsforholdOppsummeringProps {
    arbeidsforhold: Arbeidsforhold[];
}

type Props = RegistrerteArbeidsforholdOppsummeringProps;

const RegistrerteArbeidsforholdOppsummering: React.FunctionComponent<Props> = ({ arbeidsforhold }) => {
    const intl = useIntl();
    return (
        <Oppsummeringsseksjon tittel={getMessage(intl, 'oppsummering.inntekt.registrerteArbeidsforhold')}>
            <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />
        </Oppsummeringsseksjon>
    );
};

export default RegistrerteArbeidsforholdOppsummering;

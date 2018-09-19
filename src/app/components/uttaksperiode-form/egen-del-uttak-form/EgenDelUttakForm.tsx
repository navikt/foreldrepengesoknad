import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål from '../../../spørsmål/SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål';

interface EgenDelUttakFormProps {
    ønskerSamtidigUttak?: boolean;
    onChange: (ønskerSamtidigUttak: boolean) => void;
}

type Props = EgenDelUttakFormProps & InjectedIntlProps;

class EgenDelUttakForm extends React.Component<Props> {
    render() {
        const { ønskerSamtidigUttak, onChange } = this.props;
        return (
            <SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål
                ønskerSamtidigUttak={ønskerSamtidigUttak}
                onChange={(v) => onChange(v)}
            />
        );
    }
}

export default injectIntl(EgenDelUttakForm);

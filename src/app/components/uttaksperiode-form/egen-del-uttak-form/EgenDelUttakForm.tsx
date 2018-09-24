import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål from '../../../spørsmål/SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Block from 'common/components/block/Block';

interface EgenDelUttakFormProps {
    ønskerSamtidigUttak?: boolean;
    onChange: (ønskerSamtidigUttak: boolean) => void;
}

class EgenDelUttakForm extends React.Component<EgenDelUttakFormProps> {
    render() {
        const { ønskerSamtidigUttak, onChange } = this.props;
        return (
            <>
                <Block margin={ønskerSamtidigUttak ? 's' : 'm'}>
                    <SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål
                        ønskerSamtidigUttak={ønskerSamtidigUttak}
                        onChange={(v) => onChange(v)}
                    />
                </Block>
                <Block margin="none" visible={ønskerSamtidigUttak === true}>
                    <Veilederinfo>
                        <FormattedMessage id="egenDelUttakForm.samtidigUttak.veiledertekst" />
                    </Veilederinfo>
                </Block>
            </>
        );
    }
}

export default EgenDelUttakForm;

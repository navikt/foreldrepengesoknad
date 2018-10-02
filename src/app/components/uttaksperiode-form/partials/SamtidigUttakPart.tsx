import * as React from 'react';
import SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål from '../../../spørsmål/SkalDuV\u00E6reHjemmeSamtidigMedDenAndreForelderenSpørsmål';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

export interface Props {
    ønskerSamtidigUttak: boolean | undefined;
    onChange: (ønskerSamtidigUttak: boolean) => void;
}

const SamtidigUttakPart: React.StatelessComponent<Props> = ({ onChange, ønskerSamtidigUttak }) => (
    <>
        <Block margin={ønskerSamtidigUttak ? 'xs' : 'm'}>
            <SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål
                onChange={(øs) => onChange(øs)}
                ønskerSamtidigUttak={ønskerSamtidigUttak}
            />
        </Block>
        <Block visible={ønskerSamtidigUttak === true} margin="none">
            <Veilederinfo>Veiledertekst ved samtidig uttak</Veilederinfo>
        </Block>
    </>
);

export default SamtidigUttakPart;

import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål from '../../../spørsmål/SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../../util/routing/lenker';

export interface Props {
    ønskerSamtidigUttak: boolean | undefined;
    onChange: (ønskerSamtidigUttak: boolean) => void;
}

const SamtidigUttakPart: React.StatelessComponent<Props & InjectedIntlProps> = ({
    onChange,
    ønskerSamtidigUttak,
    intl
}) => (
    <>
        <Block margin={ønskerSamtidigUttak ? 'xs' : 'm'}>
            <SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål
                onChange={(øs) => onChange(øs)}
                ønskerSamtidigUttak={ønskerSamtidigUttak}
            />
        </Block>
        <Block visible={ønskerSamtidigUttak === true} margin="none">
            <Veilederinfo>
                <FormattedMessage
                    id="egenDelUttakForm.samtidigUttak.veiledertekst"
                    values={{
                        link: (
                            <Lenke href={lenker.fleksibeltuttak}>
                                <FormattedMessage id="egenDelUttakForm.samtidigUttak.veiledertekst.lenke" />
                            </Lenke>
                        )
                    }}
                />
            </Veilederinfo>
        </Block>
    </>
);

export default injectIntl(SamtidigUttakPart);

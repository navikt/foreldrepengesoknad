import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

interface SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmålProps {
    onChange: (ønskerSamtidigUttak: boolean) => void;
    ønskerSamtidigUttak?: boolean;
}

type Props = SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmålProps & InjectedIntlProps;

const SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål: React.StatelessComponent<Props> = ({
    intl,
    ønskerSamtidigUttak,
    onChange
}) => (
    <>
        <Block margin={ønskerSamtidigUttak === true ? 's' : 'm'}>
            <JaNeiSpørsmål
                navn="samtidigGradertUttak"
                spørsmål={getMessage(intl, 'uttaksplan.fellesdel.samtidigUttak.spørsmål')}
                valgtVerdi={ønskerSamtidigUttak}
                onChange={(v) => onChange(v)}
            />
        </Block>
        <Block visible={ønskerSamtidigUttak === true} margin="none">
            <Veilederinfo>
                <FormattedMessage id="uttaksplan.fellesdel.samtidigUttak.veileder" />
            </Veilederinfo>
        </Block>
    </>
);

export default injectIntl(SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål);

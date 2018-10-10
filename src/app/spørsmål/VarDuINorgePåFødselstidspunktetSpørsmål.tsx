import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface VarDuINorgePåFødselstidspunktetSpørsmålProps {
    fødselINorge?: boolean;
    onChange: (fødselINorge: boolean) => void;
}

type Props = VarDuINorgePåFødselstidspunktetSpørsmålProps & InjectedIntlProps;

const VarDuINorgePåFødselstidspunktetSpørsmål = (props: Props) => {
    const { onChange, fødselINorge, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'varDuINorgePåFødselstidspunktet.spørsmål')}
            navn="varDuINorgePåFødselstidspunktet"
            onChange={onChange}
            valgtVerdi={fødselINorge}
        />
    );
};

export default injectIntl(VarDuINorgePåFødselstidspunktetSpørsmål);

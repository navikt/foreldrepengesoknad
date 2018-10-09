import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface BleBarnetFødtINorgeSpørsmålProps {
    fødselINorge?: boolean;
    onChange: (fødselINorge: boolean) => void;
}

type Props = BleBarnetFødtINorgeSpørsmålProps & InjectedIntlProps;

const BleBarnetFødtINorgeSpørsmål = (props: Props) => {
    const { onChange, fødselINorge, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'bleBarnetFødtINorge.spørsmål')}
            navn="bleBarnetFødtINorge"
            onChange={onChange}
            valgtVerdi={fødselINorge}
        />
    );
};

export default injectIntl(BleBarnetFødtINorgeSpørsmål);

import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';

interface BarnFødtBolkProps {
    erBarnetFødt?: boolean;
    onChange: (erBarnetFødt: boolean) => void;
}

type Props = BarnFødtBolkProps & InjectedIntlProps;

const ErBarnetFødtSpørsmål = (props: Props) => {
    const { onChange, erBarnetFødt, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erBarnetFødt.spørsmål')}
            navn="barnFødt"
            valgtVerdi={erBarnetFødt}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(ErBarnetFødtSpørsmål);

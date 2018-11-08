import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface AdopsjonAvEktefellesBarnSpørsmålProps {
    adopsjonAvEktefellesBarn?: boolean;
    onChange: (adopsjonAvEktefellesBarn: boolean) => void;
}

type Props = AdopsjonAvEktefellesBarnSpørsmålProps & InjectedIntlProps;

const AdopsjonAvEktefellesBarnSpørsmål = (props: Props) => {
    const { onChange, adopsjonAvEktefellesBarn, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'adopsjonAvEktefellesBarn.spørsmål')}
            navn="adopsjonAvEktefellesBarn"
            valgtVerdi={adopsjonAvEktefellesBarn}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(AdopsjonAvEktefellesBarnSpørsmål);

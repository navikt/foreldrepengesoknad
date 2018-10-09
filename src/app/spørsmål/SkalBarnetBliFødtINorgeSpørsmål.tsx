import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface SkalBarnetBliFødtINorgeSpørsmålProps {
    fødselINorge?: boolean;
    onChange: (fødselINorge: boolean) => void;
}

type Props = SkalBarnetBliFødtINorgeSpørsmålProps & InjectedIntlProps;

const SkalBarnetBliFødtINorgeSpørsmål = (props: Props) => {
    const { onChange, fødselINorge, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'væreINorgeVedFødsel.spørsmål')}
            navn="skalBarnetBliFødtINorge"
            onChange={onChange}
            valgtVerdi={fødselINorge}
        />
    );
};

export default injectIntl(SkalBarnetBliFødtINorgeSpørsmål);

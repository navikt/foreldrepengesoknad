import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';

interface BarnFødtBolkProps {
    adoptertIUtlandet?: boolean;
    onChange: (fødtIUtlandet: boolean) => void;
}

type Props = BarnFødtBolkProps & InjectedIntlProps;

const AdoptertIUtlandetSpørsmål = (props: Props) => {
    const { onChange, adoptertIUtlandet, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'adoptertIUtlandet.spørsmål')}
            navn="adoptertIUtlandet"
            valgtVerdi={adoptertIUtlandet}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(AdoptertIUtlandetSpørsmål);

import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface BarnFødtBolkProps {
    erBarnetFødt?: boolean;
    onChange: (erBarnetFødt: boolean) => void;
}

type Props = BarnFødtBolkProps;

const ErBarnetFødtSpørsmål = (props: Props) => {
    const { onChange, erBarnetFødt } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erBarnetFødt.spørsmål')}
            navn="barnFødt"
            valgtVerdi={erBarnetFødt}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default ErBarnetFødtSpørsmål;

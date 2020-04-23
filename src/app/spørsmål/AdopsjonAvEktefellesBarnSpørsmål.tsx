import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface AdopsjonAvEktefellesBarnSpørsmålProps {
    adopsjonAvEktefellesBarn?: boolean;
    onChange: (adopsjonAvEktefellesBarn: boolean) => void;
}

type Props = AdopsjonAvEktefellesBarnSpørsmålProps;

const AdopsjonAvEktefellesBarnSpørsmål = (props: Props) => {
    const { onChange, adopsjonAvEktefellesBarn } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'adopsjonAvEktefellesBarn.spørsmål')}
            navn="adopsjonAvEktefellesBarn"
            valgtVerdi={adopsjonAvEktefellesBarn}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default AdopsjonAvEktefellesBarnSpørsmål;

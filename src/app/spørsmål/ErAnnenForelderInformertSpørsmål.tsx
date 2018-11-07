import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface ErAnnenForelderInformertSpørsmålProps {
    navn?: string;
    erAnnenForelderInformert?: boolean;
    onChange: (erAnnenForelderInformert: boolean) => void;
}

type Props = ErAnnenForelderInformertSpørsmålProps & InjectedIntlProps;

const ErAnnenForelderInformertSpørsmål = (props: Props) => {
    const { onChange, intl, erAnnenForelderInformert, navn } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erAnnenForelderInformert.spørsmål', {
                navn
            })}
            valgtVerdi={erAnnenForelderInformert}
            navn="erAnnenForelderInformert"
            onChange={(erInformert) => onChange(erInformert)}
        />
    );
};
export default injectIntl(ErAnnenForelderInformertSpørsmål);

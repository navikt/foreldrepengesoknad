import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface ErAnnenForelderInformertSpørsmålProps {
    navn?: string;
    erAnnenForelderInformert?: boolean;
    onChange: (erAnnenForelderInformert: boolean) => void;
}

type Props = ErAnnenForelderInformertSpørsmålProps;

const ErAnnenForelderInformertSpørsmål = (props: Props) => {
    const { onChange, erAnnenForelderInformert, navn } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erAnnenForelderInformert.spørsmål', {
                navn,
            })}
            valgtVerdi={erAnnenForelderInformert}
            navn="erAnnenForelderInformert"
            onChange={(erInformert) => onChange(erInformert)}
        />
    );
};
export default ErAnnenForelderInformertSpørsmål;

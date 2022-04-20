import * as React from 'react';
import { useIntl } from 'react-intl';
import JaNeiSpørsmål from 'common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';

interface ErMorForSykSpørsmålProps {
    onChange: (v: boolean) => void;
    erMorForSyk: boolean | undefined;
}

type Props = ErMorForSykSpørsmålProps;

const ErMorForSykSpørsmål = (props: Props) => {
    const { erMorForSyk, onChange } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            onChange={(v) => onChange(v)}
            navn="erMorForSyk"
            valgtVerdi={erMorForSyk}
            spørsmål={getMessage(intl, 'erMorForSyk.spørsmål')}
        />
    );
};

export default ErMorForSykSpørsmål;

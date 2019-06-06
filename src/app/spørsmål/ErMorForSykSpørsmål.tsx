import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import JaNeiSpørsmål from 'common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';

interface ErMorForSykSpørsmålProps {
    onChange: (v: boolean) => void;
    erMorForSyk: boolean | undefined;
}

type Props = ErMorForSykSpørsmålProps & InjectedIntlProps;

const ErMorForSykSpørsmål = (props: Props) => {
    const { intl, erMorForSyk, onChange } = props;

    return (
        <JaNeiSpørsmål
            onChange={(v) => onChange(v)}
            navn="erMorForSyk"
            valgtVerdi={erMorForSyk}
            spørsmål={getMessage(intl, 'erMorForSyk.spørsmål')}
        />
    );
};

export default injectIntl(ErMorForSykSpørsmål);

import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface ErMorUførProps {
    navn?: string;
    erUfør?: boolean;
    onChange: (erFrilanser: boolean) => void;
}

type Props = ErMorUførProps & InjectedIntlProps;

const ErMorUfør = (props: Props) => {
    const { onChange, navn, intl, erUfør } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erMorUfør.spørsmål', { navn })}
            navn="erMorUfør"
            valgtVerdi={erUfør}
            onChange={(morErUfør) => onChange(morErUfør)}
        />
    );
};

export default injectIntl(ErMorUfør);

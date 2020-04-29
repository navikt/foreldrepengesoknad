import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface ErMorUførProps {
    navn?: string;
    erUfør?: boolean;
    onChange: (erFrilanser: boolean) => void;
}

type Props = ErMorUførProps;

const ErMorUfør = (props: Props) => {
    const { onChange, navn, erUfør } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erMorUfør.spørsmål', { navn })}
            navn="erMorUfør"
            valgtVerdi={erUfør}
            onChange={(morErUfør) => onChange(morErUfør)}
        />
    );
};

export default ErMorUfør;

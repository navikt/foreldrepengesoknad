import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface ErArbeidsgiverNærVennEllerFamilieSpørsmålProps {
    erArbeidsgiverNærVennEllerFamilie?: boolean;
    onChange: (nærVennEllerFamilie: boolean) => void;
}

type Props = ErArbeidsgiverNærVennEllerFamilieSpørsmålProps;

const ErArbeidsgiverNærVennEllerFamilieSpørsmål = (props: Props) => {
    const { onChange, erArbeidsgiverNærVennEllerFamilie } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erArbeidsgiverNærVennEllerFamilie.spørsmål')}
            navn="erArbeidsgiverNærVennEllerFamilie"
            valgtVerdi={erArbeidsgiverNærVennEllerFamilie}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default ErArbeidsgiverNærVennEllerFamilieSpørsmål;

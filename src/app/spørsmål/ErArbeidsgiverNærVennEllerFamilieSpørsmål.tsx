import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';

interface ErArbeidsgiverNærVennEllerFamilieSpørsmålProps {
    erArbeidsgiverNærVennEllerFamilie?: boolean;
    onChange: (nærVennEllerFamilie: boolean) => void;
}

type Props = ErArbeidsgiverNærVennEllerFamilieSpørsmålProps & InjectedIntlProps;

const ErArbeidsgiverNærVennEllerFamilieSpørsmål = (props: Props) => {
    const { onChange, erArbeidsgiverNærVennEllerFamilie, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'erArbeidsgiverNærVennEllerFamilie.spørsmål')}
            navn="erArbeidsgiverNærVennEllerFamilie"
            valgtVerdi={erArbeidsgiverNærVennEllerFamilie}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(ErArbeidsgiverNærVennEllerFamilieSpørsmål);

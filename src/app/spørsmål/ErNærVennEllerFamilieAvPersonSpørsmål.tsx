import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';

interface ErNærVennEllerFamilieAvPersonSpørsmålProps {
    erNærVennEllerFamilieAvPerson?: boolean;
    onChange: (erNærVennEllerFamilieAvPerson: boolean) => void;
}

type Props = ErNærVennEllerFamilieAvPersonSpørsmålProps & InjectedIntlProps;

const ErNærVennEllerFamilieAvPersonSpørsmål = (props: Props) => {
    const { onChange, erNærVennEllerFamilieAvPerson, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'næringsrelasjon.nærVennEllerFamilie')}
            navn="erNærVennEllerFamilieAvPerson"
            valgtVerdi={erNærVennEllerFamilieAvPerson}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(ErNærVennEllerFamilieAvPersonSpørsmål);

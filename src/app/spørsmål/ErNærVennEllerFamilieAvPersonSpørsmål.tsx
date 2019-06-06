import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

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

import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmålProps {
    harJobbetForNærVennEllerFamilieSiste10Mnd?: boolean;
    onChange: (harJobbetForNærVennEllerFamilieSiste10Mnd: boolean) => void;
}

type Props = HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmålProps & InjectedIntlProps;

const HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål = (props: Props) => {
    const { onChange, harJobbetForNærVennEllerFamilieSiste10Mnd, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harJobbetForNærVennEllerFamilieSiste10Mnd.spørsmål')}
            navn="harJobbetForNærVennEllerFamilieSiste12Mnd"
            valgtVerdi={harJobbetForNærVennEllerFamilieSiste10Mnd}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål);

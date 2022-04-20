import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmålProps {
    harJobbetForNærVennEllerFamilieSiste10Mnd?: boolean;
    onChange: (harJobbetForNærVennEllerFamilieSiste10Mnd: boolean) => void;
}

type Props = HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmålProps;

const HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål = (props: Props) => {
    const { onChange, harJobbetForNærVennEllerFamilieSiste10Mnd } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harJobbetForNærVennEllerFamilieSiste10Mnd.spørsmål')}
            navn="harJobbetForNærVennEllerFamilieSiste12Mnd"
            valgtVerdi={harJobbetForNærVennEllerFamilieSiste10Mnd}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål;

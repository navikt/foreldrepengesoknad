import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface SkalDereHaGradertUttakSamtidigSpørsmålProps {
    samtidigGradertUttak?: boolean;
    onChange: (samtidigGradertUttak: boolean) => void;
}

type Props = SkalDereHaGradertUttakSamtidigSpørsmålProps;

const SkalDereHaGradertUttakSamtidigSpørsmål = (props: Props) => {
    const { samtidigGradertUttak, onChange } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'skalDereHaGradertUttakSamtidig.spørsmål')}
            navn="samtidigGradertUttak"
            valgtVerdi={samtidigGradertUttak}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default SkalDereHaGradertUttakSamtidigSpørsmål;

import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';

interface SkalDereHaGradertUttakSamtidigSpørsmålProps {
    samtidigGradertUttak?: boolean;
    onChange: (samtidigGradertUttak: boolean) => void;
}

type Props = SkalDereHaGradertUttakSamtidigSpørsmålProps & InjectedIntlProps;

const SkalDereHaGradertUttakSamtidigSpørsmål = (props: Props) => {
    const { samtidigGradertUttak, onChange, intl } = props;
    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'skalDereHaGradertUttakSamtidig.spørsmål')}
            navn="samtidigGradertUttak"
            valgtVerdi={samtidigGradertUttak}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(SkalDereHaGradertUttakSamtidigSpørsmål);

import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';

interface SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmålProps {
    onChange: (ønskerSamtidigUttak: boolean) => void;
    ønskerSamtidigUttak?: boolean;
}

type Props = SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmålProps & InjectedIntlProps;

const SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål: React.StatelessComponent<Props> = ({
    intl,
    ønskerSamtidigUttak,
    onChange
}) => (
    <>
        <JaNeiSpørsmål
            navn="samtidigGradertUttak"
            spørsmål={getMessage(intl, 'uttaksplan.fellesdel.samtidigUttak.spørsmål')}
            valgtVerdi={ønskerSamtidigUttak}
            onChange={(v) => onChange(v)}
        />
    </>
);

export default injectIntl(SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål);

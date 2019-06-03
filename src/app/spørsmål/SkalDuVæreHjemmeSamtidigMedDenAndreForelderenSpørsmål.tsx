import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/skjema/ja-nei-spørsmål/JaNeiSpørsmål';

interface SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmålProps {
    onChange: (ønskerSamtidigUttak: boolean) => void;
    ønskerSamtidigUttak?: boolean;
    navnAnnenForelder: string;
}

type Props = SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmålProps & InjectedIntlProps;

const SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål: React.StatelessComponent<Props> = ({
    intl,
    ønskerSamtidigUttak,
    navnAnnenForelder,
    onChange
}) => (
    <>
        <JaNeiSpørsmål
            navn="samtidigUttak"
            spørsmål={getMessage(intl, 'uttaksplan.fellesdel.samtidigUttak.spørsmål', { navnAnnenForelder })}
            valgtVerdi={ønskerSamtidigUttak}
            onChange={(v) => onChange(v)}
        />
    </>
);

export default injectIntl(SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål);

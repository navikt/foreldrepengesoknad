import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';

interface RettPåForeldrepengerSpørsmålProps {
    navnAnnenForelder?: string;
    harAnnenForelderRettPåForeldrepenger?: boolean;
    onChange: (harAnnenForelderRettPåForeldrepenger: boolean) => void;
}

type Props = RettPåForeldrepengerSpørsmålProps & InjectedIntlProps;
const RettPåForeldrepengerSpørsmål = (props: Props) => {
    const { onChange, harAnnenForelderRettPåForeldrepenger, navnAnnenForelder, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'annenForelderRettPåForeldrepenger.spørsmål', { navn: navnAnnenForelder })}
            navn="annenForelderRettPåForeldrepenger"
            onChange={(harRett) => onChange(harRett)}
            valgtVerdi={
                harAnnenForelderRettPåForeldrepenger === undefined ? undefined : harAnnenForelderRettPåForeldrepenger
            }
        />
    );
};

export default injectIntl(RettPåForeldrepengerSpørsmål);

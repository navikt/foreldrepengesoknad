import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface RettPåForeldrepengerSpørsmålProps {
    navnAnnenForelder?: string;
    harAnnenForelderRettPåForeldrepenger?: boolean;
    onChange: (harAnnenForelderRettPåForeldrepenger: boolean) => void;
}

type Props = RettPåForeldrepengerSpørsmålProps;
const RettPåForeldrepengerSpørsmål = (props: Props) => {
    const { onChange, harAnnenForelderRettPåForeldrepenger, navnAnnenForelder } = props;
    const intl = useIntl();

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

export default RettPåForeldrepengerSpørsmål;

import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmålProps {
    onChange: (ønskerSamtidigUttak: boolean) => void;
    ønskerSamtidigUttak?: boolean;
    navnAnnenForelder: string;
}

type Props = SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmålProps;

const SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål: React.FunctionComponent<Props> = ({
    ønskerSamtidigUttak,
    navnAnnenForelder,
    onChange,
}) => {
    const intl = useIntl();
    return (
        <>
            <JaNeiSpørsmål
                navn="samtidigUttak"
                spørsmål={getMessage(intl, 'uttaksplan.fellesdel.samtidigUttak.spørsmål', { navnAnnenForelder })}
                valgtVerdi={ønskerSamtidigUttak}
                onChange={(v) => onChange(v)}
            />
        </>
    );
};

export default SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål;

import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';

interface DriverFosterhjemSpørsmålProps {
    driverFosterhjem?: boolean;
    onChange: (harJobbetForNærVennEllerFamilieSiste12Mnd: boolean) => void;
}

type Props = DriverFosterhjemSpørsmålProps;

const DriverDuFosterhjemSpørsmål = (props: Props) => {
    const { onChange, driverFosterhjem } = props;
    const intl = useIntl();

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'driverFosterhjem.spørsmål')}
            navn="driverFosterhjem"
            valgtVerdi={driverFosterhjem}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default DriverDuFosterhjemSpørsmål;

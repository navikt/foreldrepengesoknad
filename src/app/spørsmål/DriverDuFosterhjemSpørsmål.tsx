import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';

interface DriverFosterhjemSpørsmålProps {
    driverFosterhjem?: boolean;
    onChange: (harJobbetForNærVennEllerFamilieSiste12Mnd: boolean) => void;
}

type Props = DriverFosterhjemSpørsmålProps & InjectedIntlProps;

const DriverDuFosterhjemSpørsmål = (props: Props) => {
    const { onChange, driverFosterhjem, intl } = props;

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'driverFosterhjem.spørsmål')}
            navn="driverFosterhjem"
            valgtVerdi={driverFosterhjem}
            onChange={(verdi) => onChange(verdi)}
        />
    );
};

export default injectIntl(DriverDuFosterhjemSpørsmål);

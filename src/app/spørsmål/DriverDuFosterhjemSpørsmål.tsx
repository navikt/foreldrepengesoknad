import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum DriverFosterhjem {
    'DRIVER_FOSTERHJEM' = 'driverFosterhjem',
    'DRIVER_IKKE_FOSTERHJEM' = 'driverIkkeFosterhjem'
}

interface DriverFosterhjemSpørsmålProps {
    driverFosterhjem?: boolean;
    onChange: (
        harJobbetForNærVennEllerFamilieSiste12Mnd: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = DriverFosterhjemSpørsmålProps & InjectedIntlProps;

const DriverDuFosterhjemSpørsmål = (props: Props) => {
    const { onChange, driverFosterhjem, intl } = props;

    let checked;
    if (driverFosterhjem === true) {
        checked = DriverFosterhjem.DRIVER_FOSTERHJEM;
    } else if (driverFosterhjem === false) {
        checked = DriverFosterhjem.DRIVER_IKKE_FOSTERHJEM;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'driverFosterhjem.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: DriverFosterhjem.DRIVER_FOSTERHJEM
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: DriverFosterhjem.DRIVER_IKKE_FOSTERHJEM
                }
            ]}
            name="driverFosterhjem"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: DriverFosterhjem
            ) => onChange(v === DriverFosterhjem.DRIVER_FOSTERHJEM, e)}
        />
    );
};

export default injectIntl(DriverDuFosterhjemSpørsmål);

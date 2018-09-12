import * as React from 'react';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

const MorSinSisteUttaksdagSpørsmål: React.StatelessComponent<UttaksplanSkjemaspørsmålProps & InjectedIntlProps> = ({
    visible,
    intl
}) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <DatoInput
                id="morSinSisteUttaksdag"
                label={getMessage(intl, 'spørsmål.morSinSisteUttaksdag.label')}
                onChange={(morSinSisteUttaksdag: Date) => onChange({ morSinSisteUttaksdag })}
                dato={data.morSinSisteUttaksdag}
            />
        )}
    />
);

export default injectIntl(MorSinSisteUttaksdagSpørsmål);

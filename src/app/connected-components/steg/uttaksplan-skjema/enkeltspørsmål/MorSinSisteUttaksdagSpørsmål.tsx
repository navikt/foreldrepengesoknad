import * as React from 'react';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

interface OwnProps {
    navnMor: string;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const MorSinSisteUttaksdagSpørsmål: React.StatelessComponent<Props> = ({ visible, navnMor, intl }) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <DatoInput
                id="morSinSisteUttaksdag"
                label={getMessage(intl, 'spørsmål.morSinSisteUttaksdag.label', { navnMor })}
                onChange={(morSinSisteUttaksdag: Date) => onChange({ morSinSisteUttaksdag })}
                dato={data.morSinSisteUttaksdag}
            />
        )}
    />
);

export default injectIntl(MorSinSisteUttaksdagSpørsmål);

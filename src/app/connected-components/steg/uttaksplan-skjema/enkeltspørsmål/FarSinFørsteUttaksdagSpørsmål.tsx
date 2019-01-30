import * as React from 'react';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { uttaksplanDatoavgrensninger } from 'app/util/validation/uttaksplan/uttaksplanDatoavgrensninger';

interface FarSinFørsteUttaksdagSpørsmålProps {
    familiehendelsesdato: Date;
}

type Props = FarSinFørsteUttaksdagSpørsmålProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const FarSinFørsteUttaksdagSpørsmål: React.StatelessComponent<Props> = ({ visible, familiehendelsesdato, intl }) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <DatoInput
                name="farSinFørsteUttaksdagSpørsmål"
                id="farSinFørsteUttaksdagSpørsmål"
                label={getMessage(intl, 'spørsmål.farSinFørsteUttaksdagSpørsmål.label')}
                onChange={(farSinFørsteUttaksdag: Date) => onChange({ farSinFørsteUttaksdag })}
                dato={data.farSinFørsteUttaksdag}
                avgrensninger={uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato)}
            />
        )}
    />
);

export default injectIntl(FarSinFørsteUttaksdagSpørsmål);

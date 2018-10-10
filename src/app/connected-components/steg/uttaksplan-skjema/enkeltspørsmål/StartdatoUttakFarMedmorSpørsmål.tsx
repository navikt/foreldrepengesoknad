import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { uttaksplanDatoavgrensninger } from '../../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import startdatoFarMedmorValidation from '../../../../util/validation/uttaksplan/startdatoFarMedmorValidation';

interface OwnProps {
    familiehendelsesdato: Date;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const StartdatoPermisjonSpørsmål = (props: Props) => {
    const { visible, familiehendelsesdato, intl } = props;

    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <ValiderbarDatoInput
                    id="permisjonStartdato"
                    name="permisjonStartdato"
                    label={getMessage(intl, 'spørsmål.startdatoPermisjonFarMedmor.label')}
                    onChange={(startdatoPermisjon: Date | undefined) => onChange({ startdatoPermisjon })}
                    dato={data.startdatoPermisjon}
                    disabled={data.skalIkkeHaUttakFørTermin}
                    avgrensninger={uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato)}
                    validators={startdatoFarMedmorValidation(intl, data.startdatoPermisjon)}
                />
            )}
        />
    );
};

export default injectIntl(StartdatoPermisjonSpørsmål);

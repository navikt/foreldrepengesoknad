import * as React from 'react';
import { useIntl } from 'react-intl';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import getMessage from 'common/util/i18nUtils';
import startdatoFarMedmorValidation from '../../../util/validation/uttaksplan/startdatoFarMedmorValidation';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { DatoInputVerdi } from 'common/components/skjema/elements/dato-input/DatoInput';

interface OwnProps {
    familiehendelsesdato: Date;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps;

const StartdatoPermisjonSpørsmål = (props: Props) => {
    const { visible, familiehendelsesdato } = props;
    const intl = useIntl();

    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <ValiderbarDatoInput
                    id="permisjonStartdato"
                    name="permisjonStartdato"
                    label={getMessage(intl, 'spørsmål.startdatoPermisjonFarMedmor.label')}
                    onChange={(startdatoPermisjon: DatoInputVerdi) => onChange({ startdatoPermisjon })}
                    datoVerdi={data.startdatoPermisjon}
                    disabled={data.skalIkkeHaUttakFørTermin}
                    datoAvgrensinger={uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato)}
                    validators={startdatoFarMedmorValidation(intl, data.startdatoPermisjon?.date)}
                />
            )}
        />
    );
};

export default StartdatoPermisjonSpørsmål;

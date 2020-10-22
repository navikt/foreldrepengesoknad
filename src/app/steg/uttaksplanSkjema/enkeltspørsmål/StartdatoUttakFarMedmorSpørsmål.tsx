import * as React from 'react';
import { useIntl } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import getMessage from 'common/util/i18nUtils';
import startdatoFarMedmorValidation from '../../../util/validation/uttaksplan/startdatoFarMedmorValidation';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

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
                    onChange={(startdatoPermisjon) => onChange({ startdatoPermisjon })}
                    dato={data.startdatoPermisjon}
                    disabled={data.skalIkkeHaUttakFørTermin}
                    datoAvgrensinger={uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato)}
                    validators={startdatoFarMedmorValidation(intl, ISOStringToDate(data.startdatoPermisjon))}
                />
            )}
        />
    );
};

export default StartdatoPermisjonSpørsmål;

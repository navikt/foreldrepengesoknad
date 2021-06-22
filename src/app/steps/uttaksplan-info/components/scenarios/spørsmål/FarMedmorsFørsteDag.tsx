import { intlUtils } from '@navikt/fp-common';
import { ISOStringToDate, TypedFormComponents } from '@navikt/sif-common-formik/lib';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Props {
    FormComponents: TypedFormComponents<any, any, string>;
    fieldName: string;
    navnMor: string;
    familiehendelsesdato: string;
}

const FarMedmorsFørsteDag: FunctionComponent<Props> = ({
    FormComponents,
    fieldName,
    familiehendelsesdato,
    navnMor,
}) => {
    const intl = useIntl();

    const maxDate = ISOStringToDate(
        uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato).maxDate
    );
    const minDate = ISOStringToDate(
        uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato).minDate
    );

    return (
        <FormComponents.DatePicker
            name={fieldName}
            label={intlUtils(intl, 'uttaksplaninfo.farSinFørsteUttaksdagSpørsmål.label', { navnMor })}
            maxDate={maxDate}
            minDate={minDate}
            showYearSelector={true}
        />
    );
};

export default FarMedmorsFørsteDag;

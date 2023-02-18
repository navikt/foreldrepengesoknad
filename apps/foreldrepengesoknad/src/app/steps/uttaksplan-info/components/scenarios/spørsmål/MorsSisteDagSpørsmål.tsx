import { intlUtils } from '@navikt/fp-common';
import { TypedFormComponents } from '@navikt/sif-common-formik/lib';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { ISOStringToDate } from 'app/utils/dateUtils';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Props {
    FormComponents: TypedFormComponents<any, any, string>;
    fieldName: string;
    navnMor: string;
    familiehendelsesdato: string;
}

const MorsSisteDagSpørsmål: FunctionComponent<Props> = ({
    FormComponents,
    fieldName,
    familiehendelsesdato,
    navnMor,
}) => {
    const intl = useIntl();

    const maxDate = ISOStringToDate(uttaksplanDatoavgrensninger.morsSisteUttaksdag(familiehendelsesdato).maxDate);
    const minDate = ISOStringToDate(uttaksplanDatoavgrensninger.morsSisteUttaksdag(familiehendelsesdato).minDate);

    return (
        <FormComponents.DatePicker
            name={fieldName}
            label={intlUtils(intl, 'uttaksplaninfo.morSinSisteUttaksdag.label', { navnMor })}
            maxDate={maxDate}
            minDate={minDate}
            showYearSelector={true}
            disableWeekend={true}
            placeholder={'dd.mm.åååå'}
        />
    );
};

export default MorsSisteDagSpørsmål;

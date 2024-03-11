import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { ISOStringToDate, intlUtils, uttaksplanDatoavgrensninger } from '@navikt/fp-common';
import { TypedFormComponents } from '@navikt/fp-formik';

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
            disableWeekends={true}
            dropdownCaption={true}
        />
    );
};

export default MorsSisteDagSpørsmål;

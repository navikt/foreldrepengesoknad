import { isISODateString } from '@navikt/ds-datepicker';
import { ISOStringToDate, formatDate, intlUtils } from '@navikt/fp-common';
import { PerioderFormData } from 'app/steps/perioder/perioderStepFormConfig';
import { TilOgMedDatoType } from 'app/types/Tilrettelegging';
import { IntlShape } from 'react-intl';

export const getPeriodeInfoTekst = (
    formValues: Partial<PerioderFormData>,
    index: number,
    sisteDagForSvangerskapspenger: Date,
    intl: IntlShape,
) => {
    if (
        formValues &&
        formValues.varierendePerioder &&
        formValues.varierendePerioder[index] &&
        formValues.varierendePerioder[index].fom &&
        isISODateString(formValues.varierendePerioder[index].fom) &&
        (formValues.varierendePerioder[index].tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP ||
            (formValues.varierendePerioder[index].tom && isISODateString(formValues.varierendePerioder[index].tom)))
    ) {
        const tomDato =
            formValues.varierendePerioder[index].tomType === TilOgMedDatoType.SISTE_DAG_MED_SVP
                ? sisteDagForSvangerskapspenger
                : ISOStringToDate(formValues.varierendePerioder[index].tom)!;
        return `${formatDate(formValues.varierendePerioder[index].fom)} - ${formatDate(tomDato)}`;
    }
    return intlUtils(intl, 'ny.periode');
};

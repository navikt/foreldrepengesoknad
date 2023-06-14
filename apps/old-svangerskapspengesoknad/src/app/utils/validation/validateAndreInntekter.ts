import { FormikErrors } from 'formik';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/types/AnnenInntekt';
import { isISODateString } from '@navikt/ds-datepicker';

type AnnenInntektFeil = FormikErrors<AnnenInntekt>;

const validateAndreInntekter =
    () =>
    (annenInntekt: Partial<AnnenInntekt>): AnnenInntektFeil => {
        const errors: AnnenInntektFeil = {};

        if (annenInntekt.type === undefined || (annenInntekt.type && annenInntekt.type.length === 0)) {
            errors.type = 'valideringsfeil.annenInntekt.inntektskilde.påkrevd';
        }

        if (annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET) {
            if (!annenInntekt.land) {
                (errors as FormikErrors<JobbIUtlandetInntekt>).land = 'valideringsfeil.annenInntekt.land.påkrevd';
            }

            if (!annenInntekt.arbeidsgiverNavn) {
                (errors as FormikErrors<JobbIUtlandetInntekt>).arbeidsgiverNavn =
                    'valideringsfeil.annenInntekt.arbeidsgiverNavn.påkrevd';
            }

            if (annenInntekt.arbeidsgiverNavn && annenInntekt.arbeidsgiverNavn.length > 100) {
                (errors as FormikErrors<JobbIUtlandetInntekt>).arbeidsgiverNavn =
                    'valideringsfeil.annenInntekt.arbeidsgiverNavn.max100Tegn';
            }

            if (
                annenInntekt.tidsperiode === undefined ||
                (annenInntekt.tidsperiode !== undefined && annenInntekt.tidsperiode.fom === undefined)
            ) {
                errors.tidsperiode = { fom: 'valideringsfeil.annenInntekt.fom.påkrevd' };
            }

            if (annenInntekt.tidsperiode !== undefined && !isISODateString(annenInntekt.tidsperiode.fom)) {
                errors.tidsperiode = { fom: 'valideringsfeil.annenInntekt.fom.ugyldigDato' };
            }
        }
        return errors;
    };
export default validateAndreInntekter;

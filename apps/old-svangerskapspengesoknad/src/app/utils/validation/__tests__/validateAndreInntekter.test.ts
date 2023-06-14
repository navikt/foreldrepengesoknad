import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/types/AnnenInntekt';
import validateAndreInntekter from '../validateAndreInntekter';
import { FormikErrors } from 'formik';

describe('andre inntekter modal', () => {
    const annenInntekt: Partial<AnnenInntekt> = {};
    const validator = validateAndreInntekter();

    it('type should be required', () => {
        expect(validator(annenInntekt).type).toBe('valideringsfeil.annenInntekt.inntektskilde.påkrevd');
    });

    it('arbeidsgiverLand and land is required if annen inntekt type is jobb i utlandet', () => {
        annenInntekt.type = AnnenInntektType.JOBB_I_UTLANDET;
        const result = validator(annenInntekt) as FormikErrors<JobbIUtlandetInntekt>;
        expect(result.arbeidsgiverNavn).toBe('valideringsfeil.annenInntekt.arbeidsgiverNavn.påkrevd');
        expect(result.land).toBe('valideringsfeil.annenInntekt.land.påkrevd');
    });
});

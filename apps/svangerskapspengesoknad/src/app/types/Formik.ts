import { FormikContextType, FormikProps as FormikActualProps } from 'formik';
import { UferdigSøknad } from './Søknad';

export interface FormikProps {
    formik: FormikContextType<UferdigSøknad>;
}

export type CustomFormikProps = FormikActualProps<UferdigSøknad> & { submitForm: () => Promise<void> };

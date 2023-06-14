import { ReactNode, FunctionComponent, useCallback } from 'react';
import { Formik } from 'formik';

import { CustomFormikProps } from 'app/types/Formik';
import { FormikBag } from 'app/types/FormikBag';
import { logValidationErrors } from 'app/utils/devUtils';
import { parsePathFromLocation } from 'app/utils/stepUtils';
import { UferdigSøknad, initialSøknad } from 'app/types/Søknad';
import validateSøknad from 'app/utils/validation/validateSøknad';
import { useLocation } from 'react-router-dom';

//Hack for å unngå å gjera endringar etter oppgraderingar til formik 2
export const useIsValid = (values: any) => {
    const location = useLocation();
    const currentPath = parsePathFromLocation(location);
    const errors = validateSøknad(currentPath)(values);
    return Object.keys(errors).length === 0;
};

interface Props {
    contentRenderer: (formikProps: CustomFormikProps) => ReactNode;
}

const FormikWrapper: FunctionComponent<Props> = ({ contentRenderer }) => {
    const location = useLocation();

    const currentPath = parsePathFromLocation(location);

    const validate = useCallback(
        (values: any) => {
            const errors = validateSøknad(currentPath)(values);
            logValidationErrors(currentPath, errors);
            return errors;
        },
        [currentPath]
    );

    const onSubmit = useCallback((_søknad: UferdigSøknad, { setSubmitting, setFormikState }: FormikBag) => {
        setSubmitting(false);
        setFormikState((f) => ({
            ...f,
            submitCount: 0,
        }));
    }, []);

    return (
        <Formik
            initialValues={initialSøknad}
            validate={validate}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore Fiks
            onSubmit={onSubmit}
        >
            {(values) => contentRenderer(values)}
        </Formik>
    );
};

export default FormikWrapper;

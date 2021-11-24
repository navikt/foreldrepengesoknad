import React, { FunctionComponent } from 'react';
import { useFormikContext } from 'formik';
import { PeriodeUttakFormData } from '../periode-uttak-form/periodeUttakFormConfig';

export const SubmitListener: FunctionComponent = () => {
    const formik = useFormikContext<PeriodeUttakFormData>();
    const [lastValues, updateState] = React.useState(formik.values);

    React.useEffect(() => {
        const valuesEqualLastValues = JSON.stringify(lastValues) === JSON.stringify(formik.values);
        const valuesEqualInitialValues = JSON.stringify(formik.values) === JSON.stringify(formik.initialValues);

        if (!valuesEqualLastValues) {
            updateState(formik.values);
        }

        if (!valuesEqualLastValues && !valuesEqualInitialValues && formik.isValid) {
            console.log('Submitted form');
            formik.submitForm();
        }
    }, [formik.values, formik.isValid, formik.initialValues, formik, lastValues]);

    return null;
};

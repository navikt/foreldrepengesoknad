import React, { FunctionComponent } from 'react';
import { useFormikContext } from 'formik';
import { PeriodeUttakFormData } from '../periode-uttak-form/periodeUttakFormConfig';
import { PeriodeUtsettelseFormData } from '../periode-utsettelse-form/periodeUtsettelseFormConfig';

interface Props {
    cleanup: () => PeriodeUttakFormData | PeriodeUtsettelseFormData;
}

export const SubmitListener: FunctionComponent<Props> = ({ cleanup }) => {
    const formik = useFormikContext<PeriodeUttakFormData | PeriodeUtsettelseFormData>();
    const { isSubmitting, isValidating, values, submitForm, setValues } = formik;
    const cleanedValues = cleanup();
    const [lastValues, updateState] = React.useState(cleanedValues);

    React.useEffect(() => {
        if (!isSubmitting && !isValidating) {
            const valuesEqualLastValues = JSON.stringify(lastValues) === JSON.stringify(values);

            if (!valuesEqualLastValues) {
                updateState(values);
            }

            if (!valuesEqualLastValues) {
                setValues(cleanedValues);
                setTimeout(() => submitForm(), 0);
            }
        }
    }, [values, isSubmitting, isValidating, submitForm, lastValues, setValues, cleanedValues]);

    return null;
};

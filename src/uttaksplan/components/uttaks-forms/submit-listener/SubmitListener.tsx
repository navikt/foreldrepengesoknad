import React, { FunctionComponent } from 'react';
import { useFormikContext } from 'formik';
import { PeriodeUttakFormData, PeriodeUttakFormField } from '../periode-uttak-form/periodeUttakFormConfig';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';

interface Props {
    cleanup: (
        values: PeriodeUttakFormData,
        visibility: QuestionVisibility<PeriodeUttakFormField, undefined>
    ) => PeriodeUttakFormData;
    visibility: QuestionVisibility<PeriodeUttakFormField, undefined>;
}

export const SubmitListener: FunctionComponent<Props> = ({ cleanup, visibility }) => {
    const formik = useFormikContext<PeriodeUttakFormData>();
    const { isSubmitting, isValidating, values, submitForm, setValues } = formik;
    const cleanedValues = cleanup(values, visibility);
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

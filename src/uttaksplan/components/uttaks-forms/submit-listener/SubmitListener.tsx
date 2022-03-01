import React, { FunctionComponent } from 'react';
import { useFormikContext } from 'formik';
import { PeriodeUttakFormData } from '../periode-uttak-form/periodeUttakFormConfig';
import { PeriodeUtsettelseFormData } from '../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { PeriodeFørFødselFormData } from '../periode-før-fødsel-form/periodeFørFødselFormConfig';

interface Props {
    cleanup: () => PeriodeUttakFormData | PeriodeUtsettelseFormData | PeriodeFørFødselFormData;
}

export const jsonSort = (json: any): string => {
    function isObject(v: any) {
        return '[object Object]' === Object.prototype.toString.call(v);
    }

    const sort = (o: any): any => {
        if (Array.isArray(o)) {
            return o.sort().map(sort);
        } else if (isObject(o)) {
            return Object.keys(o)
                .sort()
                .reduce((a, k) => {
                    a[k] = sort(o[k]);
                    return a;
                }, {});
        }

        return o;
    };
    return sort(json);
};

export const SubmitListener: FunctionComponent<Props> = ({ cleanup }) => {
    const formik = useFormikContext<PeriodeUttakFormData | PeriodeUtsettelseFormData | PeriodeFørFødselFormData>();
    const { isSubmitting, isValidating, values, submitForm, setValues } = formik;
    const cleanedValues = cleanup();
    const [lastValues, updateState] = React.useState(cleanedValues);

    React.useEffect(() => {
        if (!isSubmitting && !isValidating) {
            const valuesEqualLastValues = JSON.stringify(jsonSort(lastValues)) === JSON.stringify(jsonSort(values));

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

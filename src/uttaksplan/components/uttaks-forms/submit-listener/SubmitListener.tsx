import { FunctionComponent, useEffect, useRef } from 'react';
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
    const { isSubmitting, isValidating, submitForm, setValues } = formik;
    const cleanedValues = cleanup();
    const ref = useRef(cleanedValues);

    useEffect(() => {
        if (!isSubmitting && !isValidating) {
            const currentValuesJSONString = JSON.stringify(jsonSort(ref.current));
            const previousValuesJSONString = JSON.stringify(jsonSort(cleanup()));
            const valuesEqualLastValues = previousValuesJSONString === currentValuesJSONString;

            if (!valuesEqualLastValues) {
                ref.current = cleanup();
            }

            if (!valuesEqualLastValues) {
                setValues(cleanedValues);
                setTimeout(() => submitForm(), 0);
            }
        }
    }, [isSubmitting, isValidating, submitForm, setValues, cleanedValues, cleanup]);

    return null;
};

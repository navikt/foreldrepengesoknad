// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access */
import { useFormikContext } from 'formik';
import { FunctionComponent, useEffect, useRef } from 'react';

import { PeriodeFørFødselFormData } from '../periode-før-fødsel-form/periodeFørFødselFormConfig';
import { PeriodeUtsettelseFormData } from '../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { PeriodeUttakFormData } from '../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    cleanup: () => PeriodeUttakFormData | PeriodeUtsettelseFormData | PeriodeFørFødselFormData;
}

const jsonSort = (json: any): string => {
    function isObject(v: any) {
        return '[object Object]' === Object.prototype.toString.call(v);
    }

    const sort = (o: any): any => {
        if (Array.isArray(o)) {
            return o.sort().map(sort);
        } else if (isObject(o)) {
            return Object.keys(o)
                .sort((a, b) => a.localeCompare(b))
                .reduce((a: any, k) => {
                    a[k] = sort(o[k]);
                    return a;
                }, {});
        }

        return o;
    };
    return sort(json);
};

// eslint-disable-next-line @typescript-eslint/no-restricted-types
export const SubmitListener: FunctionComponent<Props> = ({ cleanup }) => {
    const formik = useFormikContext<PeriodeUttakFormData | PeriodeUtsettelseFormData | PeriodeFørFødselFormData>();
    const { isSubmitting, isValidating, submitForm, setValues } = formik;
    const cleanedValues = cleanup();
    const ref = useRef(cleanedValues);

    useEffect(() => {
        if (!isSubmitting && !isValidating) {
            const currentValuesJSONString = JSON.stringify(jsonSort(ref.current));
            const previousValuesJSONString = JSON.stringify(jsonSort(cleanedValues));
            const valuesEqualLastValues = previousValuesJSONString === currentValuesJSONString;

            if (!valuesEqualLastValues) {
                ref.current = cleanedValues;
            }

            if (!valuesEqualLastValues) {
                void setValues(cleanedValues);
                setTimeout(() => void submitForm(), 0);
            }
        }
    }, [isSubmitting, isValidating, submitForm, setValues, cleanedValues, cleanup]);

    return null;
};

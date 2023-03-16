import { FormikErrors } from 'formik';
import { SummaryError } from 'common/lib/validation/types';
import { UferdigSøknad } from 'app/types/Søknad';
import { IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export const flattenErrors = (errors: FormikErrors<UferdigSøknad>, pathPrefix = ''): SummaryError[] => {
    let flattened: SummaryError[] = [];

    for (const key of Object.keys(errors)) {
        const prefix = pathPrefix ? `${pathPrefix}.${key}` : key;

        if (typeof errors[key] === 'string') {
            flattened.push({
                name: prefix,
                text: errors[key],
            });
        } else if (typeof errors[key] === 'object') {
            if (errors[key].intlKey) {
                const { intlKey, values } = errors[key];
                flattened.push({
                    name: prefix,
                    text: {
                        intlKey,
                        values,
                    },
                });
            } else {
                flattened = flattened.concat(flattenErrors(errors[key], prefix));
            }
        }
    }

    return flattened;
};

export const translateError = (intl: IntlShape, error?: any) => {
    if (error && error.intlKey) {
        return getMessage(intl, error.intlKey, error.values);
    }

    return typeof error === 'string' ? getMessage(intl, error) : '';
};

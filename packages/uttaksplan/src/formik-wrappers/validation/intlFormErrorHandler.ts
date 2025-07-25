import { IntlShape } from 'react-intl';

import { CustomFormErrorHandler, FieldErrorHandler } from './../types';
import { ValidationError, isIntlErrorObject } from './types';

const createFieldErrorIntlKey = (
    error: string,
    fieldName: string,
    keySeparator: string,
    errorPrefix?: string,
): string => `${errorPrefix ? `${errorPrefix}${keySeparator}` : ''}${fieldName}${keySeparator}${error}`;

const getFieldErrorHandler =
    (intl: IntlShape, keySeparator: string, errorPrefix?: string): FieldErrorHandler<ValidationError> =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Fiksar ikkje sidan denne pakka snart blir fjerna
    (error: ValidationError, fieldName: string) => {
        return isIntlErrorObject(error)
            ? intl.formatMessage(
                  {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
                      id: error.keepKeyUnaltered
                          ? error.key
                          : createFieldErrorIntlKey(error.key, fieldName, keySeparator, errorPrefix),
                  },
                  error.values,
              )
            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
              intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, keySeparator, errorPrefix) });
    };

const getIntlFormErrorHandler = (intl: IntlShape, errorPrefix?: string): CustomFormErrorHandler<ValidationError> => ({
    fieldErrorHandler: getFieldErrorHandler(intl, '.', errorPrefix),
    isHandledErrorTypeFunc: isIntlErrorObject,
});

export const getIntlFormErrorHandler_underscoreKeys = (
    intl: IntlShape,
    errorPrefix?: string,
): CustomFormErrorHandler<ValidationError> => ({
    fieldErrorHandler: getFieldErrorHandler(intl, '_', errorPrefix),
    isHandledErrorTypeFunc: isIntlErrorObject,
});

// eslint-disable-next-line import/no-default-export
export default getIntlFormErrorHandler;

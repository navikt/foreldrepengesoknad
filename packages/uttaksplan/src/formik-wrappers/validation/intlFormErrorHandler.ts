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
    (error: ValidationError, fieldName: string) => {
        return isIntlErrorObject(error)
            ? intl.formatMessage(
                  {
                      // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
                      id: error.keepKeyUnaltered
                          ? error.key
                          : createFieldErrorIntlKey(error.key, fieldName, keySeparator, errorPrefix),
                  },
                  error.values,
              )
            : // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
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

export default getIntlFormErrorHandler;

import { IntlShape } from 'react-intl';

export type FormikFieldErrorRender = (errorKey: string, fieldName: string) => string;

export const getFieldErrorRenderer = (intl: IntlShape): FormikFieldErrorRender => (errorKey: string) => {
    return intl.formatMessage({ id: errorKey });
};

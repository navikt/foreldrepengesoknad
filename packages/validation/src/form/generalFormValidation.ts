import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const isEmpty = (text?: string | number | boolean | dayjs.Dayjs | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

export type FormValidationResult = string | null;

export const getGeneralValidators = (intl: IntlShape) => {
    const isRequired =
        (i18nId: string) =>
        (value?: string | number): FormValidationResult =>
            isEmpty(value) ? intl.formatMessage({ id: i18nId }) : null;

    return {
        isRequired,
    };
};

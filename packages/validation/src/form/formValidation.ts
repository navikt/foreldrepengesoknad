import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';
import { DATE_TODAY } from '@navikt/fp-constants';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

//TODO Denne fila må slåast i saman med validering-fila som ligg i fp-common. Må diskutera eit format desse skal skrivast på

type FormValidationResult = string | null;

const isoDateRegex = /(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/;

const isEmpty = (text?: string | number | boolean | dayjs.Dayjs | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

export const getFormValidators = (intl: IntlShape) => {
    const isRequired =
        (i18nId: string) =>
        (value?: string | number): FormValidationResult =>
            isEmpty(value) ? intl.formatMessage({ id: i18nId }) : null;

    const isValidDate =
        (i18nId: string) =>
        (text: string): FormValidationResult =>
            isEmpty(text) || isoDateRegex.test(text) ? null : intl.formatMessage({ id: i18nId });

    const isAfterToday =
        (i18nId: string) =>
        (dato: string): FormValidationResult => {
            return dayjs(dato).isAfter(DATE_TODAY) ? intl.formatMessage({ id: i18nId }) : null;
        };

    const isDatesValidAndTheSame = (i18nId: string, date1?: string) => (date2?: string) =>
        date1 && date2 && dayjs(date1).isSame(date2) ? intl.formatMessage({ id: i18nId }) : null;

    return {
        isRequired,
        date: {
            isValidDate,
            isAfterToday,
            isDatesValidAndTheSame,
        },
    };
};

export const useFormValidators = () => {
    const intl = useIntl();
    return getFormValidators(intl);
};

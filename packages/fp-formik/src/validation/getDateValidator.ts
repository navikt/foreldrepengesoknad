import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

export enum ValidateDateError {
    dateHasNoValue = 'dateHasNoValue',
    dateHasInvalidFormat = 'dateHasInvalidFormat',
    dateIsBeforeMin = 'dateIsBeforeMin',
    dateIsAfterMax = 'dateIsAfterMax',
    dateIsNotWeekday = 'dateIsNotWeekday',
}

export type DateValidationResult =
    | ValidateDateError.dateHasNoValue
    | ValidateDateError.dateHasInvalidFormat
    | ValidateDateError.dateIsBeforeMin
    | ValidateDateError.dateIsAfterMax
    | ValidateDateError.dateIsNotWeekday
    | undefined;

export interface DateValidationOptions {
    required?: boolean;
    min?: Date;
    max?: Date;
    onlyWeekdays?: boolean;
}

const getDateValidator =
    (options: DateValidationOptions = {}): ValidationFunction<DateValidationResult> =>
    (value: any) => {
        const { required, min, max, onlyWeekdays } = options;
        const date = datepickerUtils.getDateFromDateString(value);
        if (required && hasValue(value) === false) {
            return ValidateDateError.dateHasNoValue;
        }
        if (hasValue(value)) {
            if (date === undefined) {
                return ValidateDateError.dateHasInvalidFormat;
            }
            if (min && dayjs(date).isBefore(min, 'day')) {
                return ValidateDateError.dateIsBeforeMin;
            }
            if (max && dayjs(date).isAfter(max, 'day')) {
                return ValidateDateError.dateIsAfterMax;
            }
            if (onlyWeekdays && dayjs(date).isoWeekday() > 5) {
                return ValidateDateError.dateIsNotWeekday;
            }
        }
        return undefined;
    };

export default getDateValidator;

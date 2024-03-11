import { InputTime } from '../types';
import { ValidationFunction } from './types';
import { getNumberFromStringInput, hasValue } from './validationUtils';

export enum ValidateTimeError {
    timeHasNoValue = 'timeHasNoValue',
    hoursAreInvalid = 'hoursAreInvalid',
    hoursAreNegative = 'hoursAreNegative',
    minutesAreInvalid = 'minutesAreInvalid',
    minutesAreNegative = 'minutesAreNegative',
    tooManyHours = 'tooManyHours',
    tooManyMinutes = 'tooManyMinutes',
    durationIsTooLong = 'durationIsTooLong',
    durationIsTooShort = 'durationIsTooShort',
}

type TimeValidationResult =
    | undefined
    | ValidateTimeError.timeHasNoValue
    | ValidateTimeError.hoursAreInvalid
    | ValidateTimeError.hoursAreNegative
    | ValidateTimeError.minutesAreInvalid
    | ValidateTimeError.minutesAreNegative
    | ValidateTimeError.durationIsTooLong
    | ValidateTimeError.durationIsTooShort
    | ValidateTimeError.tooManyHours
    | ValidateTimeError.tooManyMinutes;

type TimeRange = {
    hours: number;
    minutes: number;
};

interface Options {
    required?: boolean;
    min?: TimeRange;
    max?: TimeRange;
}

const getMinutes = (hours: number, minutes: number): number => hours * 60 + minutes;

const valueIsValidNumber = (value: string | undefined): boolean => {
    if (value) {
        const containsNumbers = value.match(/^[-0-9]+$/) !== null; // Tillatt - for å kunne gi feil på negative verdier
        if (containsNumbers) {
            return getNumberFromStringInput(value) !== undefined;
        }
    }
    return false;
};

const getTimeValidator =
    (options: Options = {}): ValidationFunction<TimeValidationResult> =>
    (value: Partial<InputTime>): ValidateTimeError | undefined => {
        const { required, max, min } = options;
        const { hours: inputHours, minutes: inputMinutes } = value || {};

        if (hasValue(inputHours) && valueIsValidNumber(inputHours) === false) {
            return ValidateTimeError.hoursAreInvalid;
        }
        if (hasValue(inputMinutes) && valueIsValidNumber(inputMinutes) === false) {
            return ValidateTimeError.minutesAreInvalid;
        }

        const hours = getNumberFromStringInput(inputHours);
        const minutes = getNumberFromStringInput(inputMinutes);

        if (hours === undefined && minutes === undefined && required) {
            return ValidateTimeError.timeHasNoValue;
        }
        if (hours !== undefined) {
            if (hours > 24) {
                return ValidateTimeError.tooManyHours;
            }
            if (hours < 0) {
                return ValidateTimeError.hoursAreNegative;
            }
        }
        if (minutes !== undefined) {
            if (minutes > 59) {
                return ValidateTimeError.tooManyMinutes;
            }
            if (minutes < 0) {
                return ValidateTimeError.minutesAreNegative;
            }
        }

        if (max) {
            if (getMinutes(hours || 0, minutes || 0) > getMinutes(max.hours, max.minutes)) {
                return ValidateTimeError.durationIsTooLong;
            }
        }

        if (min) {
            if (getMinutes(hours || 0, minutes || 0) < getMinutes(min.hours, min.minutes)) {
                return ValidateTimeError.durationIsTooShort;
            }
        }

        return undefined;
    };

export default getTimeValidator;

import moment from 'moment';

const daysToHours = (days: number): number => days * 24;

export const yesterday = moment().subtract(24, 'hours');

export const today = moment();

export const tomorrow = moment().add(24, 'hours');

export const date21DaysAgo = moment().subtract(daysToHours(21), 'hours');

export const date22DaysAgo = moment().subtract(daysToHours(22), 'hours');

export const date1YearAgo = moment().subtract(1, 'years');

export const date1YearAhead = moment().add(1, 'years');

export const date3YearsAgo = moment().subtract(3, 'years');

export const date4YearsAgo = moment().subtract(4, 'years');

export const date15YearsAgo = moment().subtract(15, 'years');

export const date18YearsAgo = moment().subtract(18, 'years');

export const dateMoreThan10WeeksAgo = moment().subtract(10, 'weeks');

export const dateMoreThan15YearsAnd3MonthsAgo = moment()
    .subtract(15, 'years')
    .subtract(3, 'months')
    .subtract(daysToHours(1), 'hours');

export const date15YearsAnd3MonthsAgo = moment().subtract(15, 'years').subtract(3, 'months');

export const dateMoreThan3YearsAgo = moment().subtract(3, 'years').subtract(daysToHours(1), 'hours');

export const dateMoreThan4YearsAgo = moment().subtract(4, 'years').subtract(daysToHours(1), 'hours');

export const dateMoreThan1YearAhead = moment().add(1, 'years').add(24, 'hours');

export const dateMoreThan1YearAgo = moment().subtract(1, 'years').subtract(daysToHours(1), 'hours');

export const dateMoreThan18YearsAgo = moment().subtract(18, 'years').subtract(daysToHours(1), 'hours');

export const date5DaysAhead = moment().add(5 * 24, 'hours');

export const getDate10MonthsAgo = moment().subtract(10, 'months');

export const attenUkerPluss3Number = 18 * 7 + 3;
export const attenUkerPluss3 = moment().add(attenUkerPluss3Number * 24, 'hours');
export const attenUkerPluss4 = moment().add((attenUkerPluss3Number + 1) * 24, 'hours');

const DateValues = {
    today,
    getDate10MonthsAgo,
    tomorrow,
    date1YearAgo,
    date1YearAhead,
    date3YearsAgo,
    date4YearsAgo,
    date15YearsAgo,
    date18YearsAgo,
    date15YearsAnd3MonthsAgo,
    dateMoreThan1YearAhead,
    dateMoreThan1YearAgo,
    dateMoreThan4YearsAgo,
    dateMoreThan18YearsAgo,
};

export default DateValues;

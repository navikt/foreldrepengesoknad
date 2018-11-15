import moment from 'moment';

export const today = moment();

export const tomorrow = moment().add(1, 'days');

export const date21DaysAgo = moment().subtract(21, 'days');

export const date22DaysAgo = moment().subtract(22, 'days');

export const date1YearAgo = moment().subtract(1, 'years');

export const date1YearAhead = moment().add(1, 'years');

export const date3YearsAgo = moment().subtract(3, 'years');

export const date4YearsAgo = moment().subtract(4, 'years');

export const date15YearsAgo = moment().subtract(15, 'years');

export const date18YearsAgo = moment().subtract(18, 'years');

export const dateMoreThan15YearsAnd3MonthsAgo = moment()
    .subtract(15, 'years')
    .subtract(3, 'months')
    .subtract(1, 'day');

export const date15YearsAnd3MonthsAgo = moment()
    .subtract(15, 'years')
    .subtract(3, 'months');

export const dateMoreThan3YearsAgo = moment()
    .subtract(3, 'years')
    .subtract(1, 'days');

export const dateMoreThan4YearsAgo = moment()
    .subtract(4, 'years')
    .subtract(1, 'days');

export const dateMoreThan1YearAhead = moment()
    .add(1, 'years')
    .add(1, 'day');

export const dateMoreThan1YearAgo = moment()
    .subtract(1, 'years')
    .subtract(1, 'day');

export const dateMoreThan18YearsAgo = moment()
    .subtract(18, 'years')
    .subtract(1, 'day');

export const date5DaysAhead = moment().add(5, 'days');

export const getDate10MonthsAgo = moment().subtract(10, 'months');

export const fjortenUkerPluss3Number = 14 * 7 + 3;
export const fjortenUkerPluss3 = moment().add(fjortenUkerPluss3Number, 'days');
export const fjortenUkerPluss4 = moment().add(fjortenUkerPluss3Number + 1, 'days');

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
    dateMoreThan18YearsAgo
};

export default DateValues;

import moment from 'moment';

export const today = moment().startOf('day');

export const tomorrow = moment()
    .add(1, 'days')
    .startOf('day');

export const date21DaysAgo = moment()
    .subtract(21, 'days')
    .startOf('day');

export const date22DaysAgo = moment()
    .subtract(22, 'days')
    .startOf('day');

export const date1YearAgo = moment()
    .subtract(1, 'years')
    .startOf('day');

export const date1YearAhead = moment()
    .add(1, 'years')
    .startOf('day');

export const date3YearsAgo = moment()
    .subtract(3, 'years')
    .startOf('day');

export const date4YearsAgo = moment()
    .subtract(4, 'years')
    .startOf('day');

export const date15YearsAgo = moment()
    .subtract(15, 'years')
    .startOf('day');

export const dateMoreThan3YearsAgo = moment()
    .subtract(3, 'years')
    .subtract(1, 'days')
    .startOf('day');

export const getDate10MonthsAgo = moment().subtract(10, 'months');

export const fjortenUkerPluss3Number = 14 * 7 + 3;
export const fjortenUkerPluss3 = moment().add(fjortenUkerPluss3Number, 'days');
export const fjortenUkerPluss4 = moment().add(
    fjortenUkerPluss3Number + 1,
    'days'
);

const DateValues = {
    today,
    getDate10MonthsAgo,
    tomorrow,
    date1YearAgo,
    date1YearAhead,
    date3YearsAgo,
    date4YearsAgo,
    date15YearsAgo
};

export default DateValues;

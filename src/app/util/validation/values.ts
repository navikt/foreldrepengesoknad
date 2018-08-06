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

export const dateMoreThan3YearsAgo = moment()
    .subtract(3, 'years')
    .subtract(1, 'days')
    .startOf('day');

export const fjortenUkerPluss3Number = 14 * 7 + 3;
export const fjortenUkerPluss3 = moment().add(fjortenUkerPluss3Number, 'days');
export const fjortenUkerPluss4 = moment().add(
    fjortenUkerPluss3Number + 1,
    'days'
);

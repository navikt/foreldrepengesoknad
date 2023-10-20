import dayjs from 'dayjs';

const DATE_FORMAT = 'DD.MM.YYYY';

export const formatDate = (date: Date | string) => dayjs(date).format(DATE_FORMAT);

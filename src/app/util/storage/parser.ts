import moment from 'moment';

export const dateStringToDateObjectMapper = (value: string) => {
    if (moment(value, [moment.HTML5_FMT.DATE, 'YYYY-MM-DDTHH:mm:ss.SSSZ'], true).isValid()) {
        return new Date(value);
    }
    return value;
};

export const storageParser = (storageResponse: string) => {
    if (storageResponse) {
        return JSON.parse(storageResponse, dateStringToDateObjectMapper);
    }
};

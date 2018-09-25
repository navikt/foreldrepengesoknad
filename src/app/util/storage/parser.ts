import * as moment from 'moment';

const dateStringToDateObjectMapper = (key: string, value: string) => {
    if (moment(value, moment.ISO_8601).isValid()) {
        return new Date(value);
    }
    return value;
};

export const storageParser = (storageResponse: string) => {
    if (storageResponse) {
        return JSON.parse(storageResponse, dateStringToDateObjectMapper);
    }
};

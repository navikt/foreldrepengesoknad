import moment from 'moment';
import { isISODateString } from 'nav-datovelger';

export const dateStringToDateObjectMapper = (_key: string, value: string) => {
    if (isISODateString(value)) {
        return value;
    }
    if (!Array.isArray(value) && moment(value, [moment.HTML5_FMT.DATE, 'YYYY-MM-DDTHH:mm:ss.SSSZ'], true).isValid()) {
        return new Date(value);
    }
    return value;
};
export const storageParser = (storageResponse: string) => {
    if (storageResponse) {
        return JSON.parse(storageResponse, dateStringToDateObjectMapper);
    }
};

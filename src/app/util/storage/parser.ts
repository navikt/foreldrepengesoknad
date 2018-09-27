import * as moment from 'moment';
import { normaliserDato } from 'common/util/datoUtils';

const dateStringToDateObjectMapper = (key: string, value: string) => {
    if (moment(value, moment.ISO_8601).isValid()) {
        return normaliserDato(new Date(value));
    }
    return value;
};

export const storageParser = (storageResponse: string) => {
    if (storageResponse) {
        return JSON.parse(storageResponse, dateStringToDateObjectMapper);
    }
};

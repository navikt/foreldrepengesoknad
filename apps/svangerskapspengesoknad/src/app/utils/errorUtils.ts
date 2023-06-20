import { AxiosError } from 'axios';
import * as Sentry from '@sentry/browser';

export const UKJENT_UUID = 'ukjent uuid';

export const getErrorCallId = (error: AxiosError<any>): string => {
    return error.response && error.response.data && error.response.data.uuid ? error.response.data.uuid : UKJENT_UUID;
};

export const getErrorTimestamp = (error: AxiosError<any>): string => {
    return error.response && error.response.data && error.response.data.timestamp ? error.response.data.timestamp : '';
};

export const sendErrorMessageToSentry = (error: AxiosError<any>) => {
    const errorCallId = getErrorCallId(error) + '. ';
    const errorTimestamp = getErrorTimestamp(error) + '. ';
    const hideNumbersAndTrim = (tekst: string): string => {
        return tekst.replace(/\d/g, '*').slice(0, 250) + '...';
    };

    let errorString = errorCallId + errorTimestamp;
    if (error.request && error.request.data && error.request.data.messages) {
        errorString = errorString + hideNumbersAndTrim(error.request.data.messages);
    } else if (error.response && error.response.data && error.response.data.messages) {
        errorString = errorString + hideNumbersAndTrim(error.response.data.messages);
    }
    if (error.message) {
        errorString = errorString + error.message;
    }
    Sentry.captureMessage(errorString);
};

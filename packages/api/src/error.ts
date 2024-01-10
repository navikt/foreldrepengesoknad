import { AxiosError } from 'axios';

export class ApiGeneralError extends Error {
    callId?: string;
    timestamp?: string;

    constructor(message: string, callId?: string, timestamp?: string) {
        super(message);
        this.callId = callId;
        this.timestamp = timestamp;
    }
}

export class ApiAccessError extends Error {
    constructor() {
        super('API_ACCESS_ERROR');
    }
}

export const isApiError = (error: unknown): error is ApiAccessError | ApiGeneralError => {
    if (error instanceof ApiAccessError || error instanceof ApiGeneralError) {
        return true;
    }
    return false;
};

export const isAxiosError = (candidate: unknown): candidate is AxiosError<any> => {
    if (candidate && typeof candidate === 'object' && 'isAxiosError' in candidate) {
        return true;
    }
    return false;
};

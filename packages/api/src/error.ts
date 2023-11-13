import { AxiosError } from 'axios';

export class ApiGeneralError extends Error {
    constructor(message: string) {
        super(message);
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

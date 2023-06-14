import { get } from 'lodash';

import FetchState, { FetchStatus } from 'app/types/FetchState';

export const getData = <T>(fetchState: FetchState<T>, defaultValue: any): T => {
    return fetchState && fetchState.status === FetchStatus.SUCCESS ? fetchState.data : defaultValue;
};

export const getErrorCode = <T>(fetchState: FetchState<T>): number | undefined => {
    return fetchState && fetchState.status === FetchStatus.FAILURE && fetchState.error.response
        ? get(fetchState, 'error.response.status')
        : undefined;
};

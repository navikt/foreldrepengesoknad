import { AxiosError } from 'axios';

export enum FetchStatus {
    'UNFETCHED' = 'Unfetched',
    'IN_PROGRESS' = 'InProgress',
    'SUCCESS' = 'Success',
    'FAILURE' = 'Failure',
}

export type FetchError = AxiosError;

interface Unfetched {
    status: FetchStatus.UNFETCHED;
}

interface GetInProgress {
    status: FetchStatus.IN_PROGRESS;
}

interface GetSuccess<T> {
    status: FetchStatus.SUCCESS;
    data: T;
}

interface GetFailure {
    status: FetchStatus.FAILURE;
    error: FetchError;
}

interface PostInProgress<T> {
    status: FetchStatus.IN_PROGRESS;
    data: T;
}

interface PostSuccess<T> {
    status: FetchStatus.SUCCESS;
    data: T;
}

interface PostFailure<T> {
    status: FetchStatus.FAILURE;
    error: FetchError;
    data: T;
}

type FetchState<T> = Unfetched | GetInProgress | GetSuccess<T> | GetFailure;
export type PostState<T> = PostInProgress<T> | PostSuccess<T> | PostFailure<T>;

export default FetchState;

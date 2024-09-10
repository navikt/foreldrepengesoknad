import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import { AxiosInstanceAPI } from 'app/api/AxiosInstance';
import { RequestStatus } from 'app/types/RequestState';

type Options = {
    config?: AxiosRequestConfig;
    fnr?: string;
    isSuspended?: boolean;
};

const DEFAULT_OPTIONS: Options = {
    config: {},
    isSuspended: false,
};

export const useGetRequest = <T>(url: string, options: Options = DEFAULT_OPTIONS) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<AxiosError<any> | null>(null);
    const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.UNFETCHED);
    const fnr = options.fnr ?? undefined;
    const axiosInstance = AxiosInstanceAPI(fnr);

    useEffect(() => {
        if (!options.isSuspended && requestStatus === RequestStatus.UNFETCHED) {
            setRequestStatus(RequestStatus.IN_PROGRESS);

            axiosInstance
                .get(url, options.config)
                .then((res) => {
                    setData(res.data === '' ? undefined : res.data);
                    setRequestStatus(RequestStatus.FINISHED);
                })
                .catch((err) => {
                    setError(err);

                    setRequestStatus(RequestStatus.FINISHED);
                });
        }
    }, [options, url, axiosInstance, requestStatus]);

    return { data, error, requestStatus };
};

export const usePostRequest = <T>(url: string, body: any, options: Options = DEFAULT_OPTIONS) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<AxiosError<any> | null>(null);
    const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.UNFETCHED);
    const fnr = options.fnr ?? undefined;
    const axiosInstance = AxiosInstanceAPI(fnr);

    useEffect(() => {
        if (!options.isSuspended && requestStatus === RequestStatus.UNFETCHED) {
            setRequestStatus(RequestStatus.IN_PROGRESS);

            axiosInstance
                .post(url, body, options.config)
                .then((res) => {
                    setData(res.data === '' ? undefined : res.data);
                    setRequestStatus(RequestStatus.FINISHED);
                })
                .catch((err) => {
                    setError(err);

                    setRequestStatus(RequestStatus.FINISHED);
                });
        }
    }, [options, url, axiosInstance, requestStatus, body]);

    return { data, error, requestStatus };
};

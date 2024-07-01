import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import { getAxiosInstance } from '@navikt/fp-api';

import { RequestStatus } from 'app/types/RequestStatus';

type Options = {
    config?: AxiosRequestConfig;
    fnr?: string;
    isSuspended?: boolean;
};

const DEFAULT_OPTIONS: Options = {
    config: {},
    isSuspended: false,
};

export const usePostRequest = <T>(url: string, body: any, options: Options = DEFAULT_OPTIONS) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<AxiosError<any> | null>(null);
    const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.UNFETCHED);
    const axiosInstance = options.fnr ? getAxiosInstance(options.fnr) : getAxiosInstance();

    useEffect(() => {
        if (!options.isSuspended && requestStatus === RequestStatus.UNFETCHED) {
            setRequestStatus(RequestStatus.IN_PROGRESS);

            axiosInstance
                .post(url, body, options.config)
                .then((res) => {
                    res.data === '' ? setData(undefined) : setData(res.data);
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

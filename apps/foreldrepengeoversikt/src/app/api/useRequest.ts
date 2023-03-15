import { useState, useEffect } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import getAxiosInstance from './apiInterceptor';
import { redirectToLogin } from './redirectToLogin';
import { RequestStatus } from 'app/types/RequestStatus';

type Options = {
    config?: AxiosRequestConfig;
    isSuspended?: boolean;
};

const DEFAULT_OPTIONS: Options = {
    config: {},
    isSuspended: false,
};

export const useRequest = <T>(url: string, options: Options = DEFAULT_OPTIONS, fnr?: string) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<AxiosError<any> | null>(null);
    const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.UNFETCHED);
    const axiosInstance = getAxiosInstance(fnr);

    useEffect(() => {
        if (!options.isSuspended && requestStatus === RequestStatus.UNFETCHED) {
            setRequestStatus(RequestStatus.IN_PROGRESS);

            axiosInstance
                .get(url, options.config)
                .then((res: AxiosResponse<any, any>) => {
                    res.data === '' ? setData(undefined) : setData(res.data);
                    setRequestStatus(RequestStatus.FINISHED);
                })
                .catch((err: any) => {
                    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                        redirectToLogin();
                    } else {
                        setError(err);
                    }
                    setRequestStatus(RequestStatus.FINISHED);
                });
        }
    }, [options, url, axiosInstance, requestStatus]);

    return { data, error, requestStatus };
};

import getAxiosInstance from 'app/api/apiInterceptor';
import { RequestStatus } from 'app/types/RequestStatus';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { redirectToLogin } from '../redirectToLogin';

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
    const axiosInstance = options.fnr ? getAxiosInstance(options.fnr) : getAxiosInstance();

    useEffect(() => {
        if (!options.isSuspended && requestStatus === RequestStatus.UNFETCHED) {
            setRequestStatus(RequestStatus.IN_PROGRESS);

            axiosInstance
                .get(url, options.config)
                .then((res) => {
                    res.data === '' ? setData(undefined) : setData(res.data);
                    setRequestStatus(RequestStatus.FINISHED);
                })
                .catch((err) => {
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

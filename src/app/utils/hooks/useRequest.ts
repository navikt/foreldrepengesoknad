import { useState, useEffect } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import getAxiosInstance from 'app/api/apiInterceptor';
import { redirectToLogin } from './../../utils/redirectToLogin';

type Options = {
    config?: AxiosRequestConfig;
    fnr?: string;
    isSuspended?: boolean;
};

const DEFAULT_OPTIONS: Options = {
    config: {},
    isSuspended: false,
};

export const useRequest = <T>(url: string, options: Options = DEFAULT_OPTIONS) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<AxiosError<any> | null>(null);
    const [requestFinished, setRequestFinished] = useState(false);
    const axiosInstance = options.fnr ? getAxiosInstance(options.fnr) : getAxiosInstance();

    useEffect(() => {
        if (!options.isSuspended) {
            axiosInstance
                .get(url, options.config)
                .then((res) => {
                    res.data === '' ? setData(undefined) : setData(res.data);
                    setRequestFinished(true);
                })
                .catch((err) => {
                    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                        redirectToLogin();
                    }
                    setError(err);
                    setRequestFinished(true);
                });
        }
    }, [options.isSuspended, url, axiosInstance]);

    return { data, error, requestFinished };
};

import { useState, useEffect } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import getAxiosInstance from 'app/api/apiInterceptor';

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
    const axiosInstance = options.fnr ? getAxiosInstance(options.fnr) : getAxiosInstance();

    useEffect(() => {
        if (!options.isSuspended) {
            axiosInstance
                .get(url, options.config)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    setError(err);
                });
        }
    }, [options.isSuspended]);

    return { data, error };
};

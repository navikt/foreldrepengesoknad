import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import getAxiosInstance from 'app/api/apiInterceptor';

export const useRequest = <T>(url: string, responseTransformer?: any, fnr?: string) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<AxiosError<any> | null>(null);
    const axiosInstance = fnr ? getAxiosInstance(fnr) : getAxiosInstance();

    useEffect(() => {
        axiosInstance
            .get(url, { transformResponse: responseTransformer })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);
    return { data, error };
};

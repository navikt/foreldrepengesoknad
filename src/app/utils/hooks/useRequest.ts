import { useState, useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

export const useRequest = <T>(request: Promise<AxiosResponse<any>>) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<AxiosError<any> | null>(null);

    useEffect(() => {
        request
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    return { data, error };
};

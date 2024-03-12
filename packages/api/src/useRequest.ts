import { AxiosInstance, isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { ApiAccessError, ApiGeneralError } from './error';

export const useRequest = <T>(instance: AxiosInstance, url: string) => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiAccessError | ApiGeneralError | undefined>();

    useEffect(() => {
        let ignore = false;
        const fetch = async () => {
            try {
                setLoading(true);
                const response = await instance.get<T>(url, {
                    withCredentials: true,
                    timeout: 60 * 1000,
                });
                if (!ignore) {
                    setData(response.data);
                }
            } catch (err: unknown) {
                if (isAxiosError(err)) {
                    if (err.response?.status === 401 || err.response?.status === 403) {
                        setError(new ApiAccessError());
                    } else {
                        setError(new ApiGeneralError(err.message));
                    }
                } else if (err instanceof Error) {
                    setError(new ApiGeneralError(err.message));
                } else {
                    setError(new ApiGeneralError(String(err)));
                }
            } finally {
                setLoading(false);
            }
        };
        fetch();
        return () => {
            ignore = true;
        };
    }, [instance, url]);

    return { data, loading, error };
};

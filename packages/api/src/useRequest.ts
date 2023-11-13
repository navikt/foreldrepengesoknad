import { useState, useEffect } from 'react';
import { AxiosInstance, isAxiosError } from 'axios';
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
                const response = await instance.get<T>(url, { withCredentials: true, timeout: 60 * 1000 });
                if (!ignore) {
                    setData(response.data);
                }
            } catch (err: unknown) {
                if (isAxiosError(err)) {
                    if (err.response?.status === 401 || err.response?.status === 403) {
                        setError(new ApiAccessError());
                    }
                    setError(new ApiGeneralError(err.message));
                }
                if (err instanceof Error) {
                    setError(new ApiGeneralError(err.message));
                }
                setError(new ApiGeneralError(String(err)));
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

import { AxiosInstance, isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { ApiAccessError, ApiGeneralError } from './error';

type Options = {
    params?: any;
    withCredentials: boolean;
    isSuspended: boolean;
};

const DEFAULT_OPTIONS = { isSuspended: false, withCredentials: true } as Options;

export const useRequest = <T>(instance: AxiosInstance, url: string, options = DEFAULT_OPTIONS) => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiAccessError | ApiGeneralError | undefined>();

    useEffect(() => {
        let ignore = false;
        if (!options.isSuspended) {
            const fetch = async () => {
                try {
                    setLoading(true);
                    const response = await instance.get<T>(url, {
                        withCredentials: options.withCredentials,
                        params: options.params,
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
        }
        return () => {
            ignore = true;
        };
    }, [instance, url, options]);

    return { data, loading, error };
};

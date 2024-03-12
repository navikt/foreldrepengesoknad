import { AxiosInstance, isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { ApiAccessError, ApiGeneralError } from './error';

type Options = {
    params?: any;
    withCredentials: boolean;
    isSuspended: boolean;
};

const DEFAULT_OPTIONS = { isSuspended: false, withCredentials: true } as Options;

export const usePostRequest = <T>(
    instance: AxiosInstance,
    url: string,
    body: any,
    options: Options = DEFAULT_OPTIONS,
) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<ApiAccessError | ApiGeneralError | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!options.isSuspended) {
            const fetch = async () => {
                try {
                    setLoading(true);
                    const response = await instance.post<T>(url, body, {
                        withCredentials: options.withCredentials,
                        params: options.params,
                        timeout: 60 * 1000,
                    });
                    setData(response.data);
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
    }, [options, url, instance, body]);

    return { data, error, loading };
};

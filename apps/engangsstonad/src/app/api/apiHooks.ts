import { useState, useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

export const useRequest = <T>(request: Promise<AxiosResponse<any>>) => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError<any> | null>(null);

    useEffect(() => {
        let ignore = false;
        const fetch = async () => {
            try {
                setLoading(true);
                const response = await request;
                if (!ignore) {
                    setData(response.data);
                }
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
        return () => {
            ignore = true;
        };
    }, []);

    return { data, loading, error };
};

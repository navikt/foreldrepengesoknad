import axios, { AxiosError, AxiosResponse } from 'axios';

export const AxiosInstance = axios.create({ withCredentials: true });

export const setAxiosLocale = (nextLocale: string) => {
    AxiosInstance.defaults.headers.common['Accept-Language'] = nextLocale;
};

const getAxiosInstance = (fnr?: string) => {
    AxiosInstance.interceptors.request.use((config) => {
        config.timeout = 60 * 1000;

        if (fnr) {
            config.headers!.fnr = fnr;
        }
        return config;
    });

    AxiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (response: AxiosError) => {
            return Promise.reject(response);
        },
    );

    return AxiosInstance;
};

export default getAxiosInstance;

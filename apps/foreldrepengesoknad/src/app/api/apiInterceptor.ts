import axios, { AxiosError, AxiosResponse } from 'axios';
import Environment from 'app/Environment';

const apiBaseUrl = Environment.REST_API_URL;

export const AxiosInstance = axios.create({ baseURL: apiBaseUrl });

export const setAxiosLocale = (nextLocale: string) => {
    AxiosInstance.defaults.headers.common['Accept-Language'] = nextLocale;
};

const getAxiosInstance = (fnr?: string) => {
    AxiosInstance.interceptors.request.use((config) => {
        config.timeout = 60 * 1000;

        if (process.env.NODE_ENV !== 'development' && fnr) {
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

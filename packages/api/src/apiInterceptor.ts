import axios, { AxiosError, AxiosResponse } from 'axios';

export const AxiosInstance = axios.create({ withCredentials: true });

export const setAxiosLocale = (nextLocale: string) => {
    AxiosInstance.defaults.headers.common['Accept-Language'] = nextLocale;
};

interface AxiosEgenskaper {
    baseUrl?: string;
    fnr?: string;
}

const getAxiosInstance = (egenskaper: AxiosEgenskaper) => {
    AxiosInstance.interceptors.request.use((config) => {
        config.timeout = 60 * 1000;
        if (egenskaper.baseUrl) {
            config.baseURL = egenskaper.baseUrl;
        }
        if (egenskaper.fnr) {
            config.headers!.fnr = egenskaper.fnr;
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

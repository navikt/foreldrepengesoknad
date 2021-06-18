import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import Environment from 'app/Environment';

const apiBaseUrl = Environment.REST_API_URL;

const AxiosInstance = axios.create({ baseURL: apiBaseUrl });

const getAxiosInstance = (fnr?: string) => {
    AxiosInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
        config.timeout = 60 * 1000;

        if (process.env.NODE_ENV !== 'development' && fnr) {
            config.headers.fnr = fnr;
        }
        return config;
    });

    AxiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (response: AxiosError) => {
            if (response.response && response.response.status === 409) {
            }
            return Promise.reject(response);
        }
    );

    return AxiosInstance;
};

export default getAxiosInstance;

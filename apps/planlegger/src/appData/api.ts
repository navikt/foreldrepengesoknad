import axios, { AxiosResponse, AxiosError } from 'axios';
import { redirectToLogin } from '@navikt/fp-utils';
import Environment from 'Environment';

// TODO Flytt generell api-logikk til api-pakka

export const planleggerApi = axios.create({
    baseURL: Environment.REST_API_URL,
    withCredentials: true,
});

planleggerApi.interceptors.request.use((config) => {
    config.withCredentials = true;
    config.timeout = 60 * 1000;
    return config;
});

planleggerApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error?.config?.url &&
            !error.config.url.includes('/planlegger')
        ) {
            redirectToLogin(Environment.LOGIN_URL);
        }
        return Promise.reject(error);
    },
);

const getPlanlegger = () => {
    return planleggerApi.get('/planlegger');
};

const Api = { getPlanlegger };
export default Api;

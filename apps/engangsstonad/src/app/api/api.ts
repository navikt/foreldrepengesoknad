import { EngangsstønadSøknadDto } from '../types/domain/EngangsstønadSøknad';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { redirectToLogin } from 'util/login';

export const foreldrepengersoknadApi = axios.create({
    baseURL: (window as any).REST_API_URL,
    withCredentials: true,
});

foreldrepengersoknadApi.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        config.timeout = 60 * 1000;
        return config;
    }
);

foreldrepengersoknadApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error?.config?.url &&
            !error.config.url.includes('/soknad')
        ) {
             redirectToLogin();
        }
        return Promise.reject(error);
    }
);

const getPerson = () => {
    return foreldrepengersoknadApi.get('/personinfo');
};

const sendSøknad = (soknad: EngangsstønadSøknadDto) => {
    return foreldrepengersoknadApi.post('/soknad', soknad, {
        headers: {
            'content-type': 'application/json;',
        },
    });
};

const Api = { getPerson, sendSøknad };
export default Api;

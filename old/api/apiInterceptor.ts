import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import Environment from 'app/Environment';
import store from 'app/redux';
import { apiActionCreators } from 'app/redux/actions';

const apiBaseUrl = Environment.REST_API_URL;

const AxiosInstance = axios.create({ baseURL: apiBaseUrl });

AxiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.withCredentials = true;
        config.timeout = 60 * 1000;

        const søkerinfo = store.getState().api.søkerinfo;
        if (process.env.NODE_ENV !== 'development' && store && søkerinfo) {
            config.headers.fnr = søkerinfo.person.fnr;
        }
        return config;
    }
);

AxiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (response: AxiosError) => {
        if (store && response.response && response.response.status === 409) {
            store.dispatch(apiActionCreators.updateApi({ innloggetSomAnnenForelder: true }));
        }
        return Promise.reject(response);
    }
);

export default AxiosInstance;

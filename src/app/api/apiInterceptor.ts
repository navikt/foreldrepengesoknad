import axios, { AxiosRequestConfig } from 'axios';
import store from 'app/redux';

const AxiosInstance = axios.create();

AxiosInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.withCredentials = true;
    const søkerinfo = store.getState().api.søkerinfo;
    if (store && søkerinfo) {
        config.headers['fnr'] = søkerinfo.person.fnr;
    }
    return config;
});
export default AxiosInstance;

import axios, { AxiosInstance } from 'axios';

const createApi = (baseUrl: string): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
    });

    return axiosInstance;
};

export default createApi;

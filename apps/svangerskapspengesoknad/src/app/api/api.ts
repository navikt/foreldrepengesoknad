import Environment from 'app/Environment';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useGetRequest } from 'app/utils/hooks/useGetRequest';
import axios from 'axios';

const apiBaseUrl = Environment.REST_API_URL;
const sendSøknadUrl = `${apiBaseUrl}/soknad`;

const useSøkerinfo = () => {
    const { data, error } = useGetRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const sendSøknad = (søknad: any, signal: AbortSignal) => {
    return axios.post(sendSøknadUrl, søknad, {
        withCredentials: true,
        headers: {
            'content-type': 'application/json;',
        },
        signal,
    });
};

const Api = {
    useSøkerinfo,
    sendSøknad,
};

export default Api;

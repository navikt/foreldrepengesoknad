import axios, { AxiosResponse, AxiosError } from 'axios';
import { redirectToLogin } from '@navikt/fp-utils';
import Environment from './Environment';
import Kvittering from 'types/Kvittering';

// TODO Flytt generell api-logikk til api-pakka

const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

const isAxiosError = (candidate: unknown): candidate is AxiosError<any> => {
    if (candidate && typeof candidate === 'object' && 'isAxiosError' in candidate) {
        return true;
    }
    return false;
};

export const engangsstønadApi = axios.create({
    baseURL: Environment.REST_API_URL,
    withCredentials: true,
});

engangsstønadApi.interceptors.request.use((config) => {
    config.withCredentials = true;
    config.timeout = 60 * 1000;
    return config;
});

const ERROR_STATUS_CODES = [401, 403];

engangsstønadApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (
            error.response &&
            ERROR_STATUS_CODES.includes(error.response.status) &&
            error?.config?.url &&
            !error.config.url.includes('/soknad/engangssoknad')
        ) {
            redirectToLogin(Environment.LOGIN_URL);
        }
        return Promise.reject(error);
    },
);

const getPerson = () => {
    return engangsstønadApi.get('/personinfo');
};

const sendSøknad = async <SØKNAD>(abortSignal: AbortSignal, url: string, søknad: SØKNAD) => {
    try {
        const response = await engangsstønadApi.post<Kvittering>(url, søknad, {
            headers: {
                'content-type': 'application/json;',
            },
            signal: abortSignal,
        });
        return response.data;
    } catch (error: unknown) {
        // TODO Håndter på same måte i alle appar. Flytt til api-pakke
        if (isAxiosError(error) && error.code !== 'ERR_CANCELED') {
            const submitErrorCallId =
                error.response && error.response.data && error.response.data.uuid
                    ? error.response.data.uuid
                    : UKJENT_UUID;
            const callIdForBruker =
                submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
            throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
        }
        throw new Error();
    }
};

const Api = { getPerson, sendSøknad };
export default Api;

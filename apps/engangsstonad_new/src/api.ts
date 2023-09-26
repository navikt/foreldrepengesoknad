import axios, { AxiosResponse, AxiosError } from 'axios';
import { Locale } from '@navikt/fp-common';
import { redirectToLogin } from 'fpcommon/util/login';
import Environment from './Environment';
import { OmBarnet } from 'types/OmBarnet';
import { Utenlandsopphold, UtenlandsoppholdNeste, UtenlandsoppholdSiste } from 'types/Utenlandsopphold';
import Kvittering from 'types/Kvittering';

export const foreldrepengersoknadApi = axios.create({
    baseURL: Environment.REST_API_URL,
    withCredentials: true,
});

foreldrepengersoknadApi.interceptors.request.use((config) => {
    config.withCredentials = true;
    config.timeout = 60 * 1000;
    return config;
});

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
            redirectToLogin(Environment.LOGIN_URL);
        }
        return Promise.reject(error);
    },
);

const getPerson = () => {
    return foreldrepengersoknadApi.get('/personinfo');
};

const sendSøknad =
    (locale: Locale, setKvittering: (kvittering: Kvittering) => void) =>
    async (
        omBarnet: OmBarnet,
        utenlandsopphold: Utenlandsopphold,
        nesteUtenlandsopphold: UtenlandsoppholdNeste,
        sisteUtenlandsopphold: UtenlandsoppholdSiste,
    ) => {
        //TODO Treng nok framleis noko mapping (Gjer mappinga i dei ulike komponentane ved neste?)
        const søknad = {
            barn: omBarnet,
            type: 'engangsstønad',
            erEndringssøknad: false,
            informasjonOmUtenlandsopphold: {
                ...utenlandsopphold,
                ...nesteUtenlandsopphold,
                ...sisteUtenlandsopphold,
            },
            søker: {
                språkkode: locale,
            },
            //TODO Vedlegg
            vedlegg: [],
        };

        const response = await foreldrepengersoknadApi.post('/soknad', søknad, {
            headers: {
                'content-type': 'application/json;',
            },
        });
        setKvittering(response.data);
    };

const Api = { getPerson, sendSøknad };
export default Api;

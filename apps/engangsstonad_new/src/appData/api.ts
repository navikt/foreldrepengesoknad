import axios, { AxiosResponse, AxiosError } from 'axios';
import { Locale } from '@navikt/fp-common';
import { redirectToLogin } from 'fpcommon/util/login';
import Environment from './Environment';
import { OmBarnet, erBarnetIkkeFødt } from 'types/OmBarnet';
import {
    Utenlandsopphold,
    UtenlandsoppholdNeste,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdSiste,
} from 'types/Utenlandsopphold';
import Kvittering from 'types/Kvittering';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';

export const engangsstønadApi = axios.create({
    baseURL: Environment.REST_API_URL,
    withCredentials: true,
});

engangsstønadApi.interceptors.request.use((config) => {
    config.withCredentials = true;
    config.timeout = 60 * 1000;
    return config;
});

engangsstønadApi.interceptors.response.use(
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
    return engangsstønadApi.get('/personinfo');
};

const mapBostedUtlandTilUtenlandsopphold = (
    perioder: UtenlandsoppholdPeriode[] = [],
): {
    land: string;
    tidsperiode: { tom: string; fom: string };
}[] => {
    return perioder.map((periode) => ({
        land: periode.landkode,
        tidsperiode: {
            fom: periode.fom,
            tom: periode.tom,
        },
    }));
};

const sendSøknad =
    (locale: Locale, setKvittering: (kvittering: Kvittering) => void) =>
    async (
        omBarnet: OmBarnet,
        utenlandsopphold: Utenlandsopphold,
        dokumentasjon?: Dokumentasjon,
        sisteUtenlandsopphold?: UtenlandsoppholdSiste,
        nesteUtenlandsopphold?: UtenlandsoppholdNeste,
    ) => {
        //TODO Bør få vekk mappinga her. Bruk samme navngiving på variablane frontend og backend.

        const barn =
            dokumentasjon && erTerminDokumentasjon(dokumentasjon)
                ? {
                      ...omBarnet,
                      terminbekreftelsedato: dokumentasjon.terminbekreftelsedato,
                  }
                : omBarnet;

        const søknad = {
            barn,
            type: 'engangsstønad',
            erEndringssøknad: false,
            informasjonOmUtenlandsopphold: {
                iNorgeSiste12Mnd: utenlandsopphold.harBoddUtenforNorgeSiste12Mnd,
                iNorgeNeste12Mnd: utenlandsopphold.skalBoUtenforNorgeNeste12Mnd,
                tidligereOpphold: mapBostedUtlandTilUtenlandsopphold(sisteUtenlandsopphold?.utenlandsoppholdSiste12Mnd),
                senereOpphold: mapBostedUtlandTilUtenlandsopphold(nesteUtenlandsopphold?.utenlandsoppholdNeste12Mnd),
            },
            søker: {
                språkkode: locale,
            },
            vedlegg: dokumentasjon?.vedlegg || [],
        };

        const response = await engangsstønadApi.post('/soknad', søknad, {
            headers: {
                'content-type': 'application/json;',
            },
        });
        setKvittering(response.data);
    };

const Api = { getPerson, sendSøknad };
export default Api;

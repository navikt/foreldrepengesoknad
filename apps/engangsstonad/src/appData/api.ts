import axios, { AxiosResponse, AxiosError } from 'axios';
import { Locale } from '@navikt/fp-common';
import { redirectToLogin } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';
import Environment from './Environment';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import {
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdSenere,
    UtenlandsoppholdTidligere,
} from 'types/Utenlandsopphold';
import Kvittering from 'types/Kvittering';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';

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

const mapBarn = (omBarnet: OmBarnet, dokumentasjon?: Dokumentasjon) => {
    if (erAdopsjon(omBarnet) || erBarnetFødt(omBarnet)) {
        return {
            ...omBarnet,
            fødselsdatoer: omBarnet.fødselsdatoer.map((f) => f.dato),
        };
    }

    if (erBarnetIkkeFødt(omBarnet) && dokumentasjon && erTerminDokumentasjon(dokumentasjon)) {
        return { ...omBarnet, terminbekreftelsedato: dokumentasjon.terminbekreftelsedato };
    }

    throw Error('Det er feil i data om barnet');
};

const mapBostedUtlandTilUtenlandsopphold = (perioder: UtenlandsoppholdPeriode[] = []) => {
    return perioder.map((periode) => ({
        land: periode.landkode,
        tidsperiode: {
            fom: periode.fom,
            tom: periode.tom,
        },
    }));
};

const sendSøknad =
    (locale: Locale, setKvittering: (kvittering: Kvittering | (() => never)) => void) =>
    async (
        omBarnet: OmBarnet,
        utenlandsopphold: Utenlandsopphold,
        dokumentasjon?: Dokumentasjon,
        tidligereUtenlandsopphold?: UtenlandsoppholdTidligere,
        senereUtenlandsopphold?: UtenlandsoppholdSenere,
    ) => {
        notEmpty(utenlandsopphold);

        //TODO Bør få vekk mappinga her. Bruk samme navngiving på variablane frontend og backend.
        const søknad = {
            barn: mapBarn(omBarnet, dokumentasjon),
            type: 'engangsstønad',
            erEndringssøknad: false,
            informasjonOmUtenlandsopphold: {
                iNorgeSiste12Mnd: utenlandsopphold.harBoddUtenforNorgeSiste12Mnd,
                iNorgeNeste12Mnd: utenlandsopphold.skalBoUtenforNorgeNeste12Mnd,
                tidligereOpphold: mapBostedUtlandTilUtenlandsopphold(
                    tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd,
                ),
                senereOpphold: mapBostedUtlandTilUtenlandsopphold(senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd),
            },
            søker: {
                språkkode: locale,
            },
            vedlegg: dokumentasjon?.vedlegg || [],
        };

        try {
            const response = await engangsstønadApi.post<Kvittering>('/soknad', søknad, {
                headers: {
                    'content-type': 'application/json;',
                },
            });
            setKvittering(response.data);
        } catch (error: unknown) {
            // TODO Håndter på same måte i alle appar. Flytt til api-pakke
            if (isAxiosError(error)) {
                const submitErrorCallId =
                    error.response && error.response.data && error.response.data.uuid
                        ? error.response.data.uuid
                        : UKJENT_UUID;
                const callIdForBruker =
                    submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
                // KAst feilmelding inne funksjon som set state => hack for å at ErrorBoundary skal snappa opp feilen
                setKvittering(() => {
                    throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
                });
            }
        }
    };

const Api = { getPerson, sendSøknad };
export default Api;

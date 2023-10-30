import axios, { AxiosResponse, AxiosError } from 'axios';
import { Locale } from '@navikt/fp-common';
import { redirectToLogin } from '@navikt/fp-utils';
import Environment from './Environment';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import { UtenlandsoppholdSenere, UtenlandsoppholdTidligere } from 'types/Utenlandsopphold';
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

const mapBarn = (omBarnet: OmBarnet, dokumentasjon?: Dokumentasjon) => {
    // TODO Vurder om ein heller bør mappa fram og tilbake i barn-komponenten. Er nok bedre å gjera det, men
    // avvent og sjekk om det er realistisk å gjera det på den måten i dei andre appane.
    const vedleggreferanser = dokumentasjon?.vedlegg.map((v) => v.id) || [];
    if (erAdopsjon(omBarnet)) {
        return {
            type: 'adopsjon',
            antallBarn: omBarnet.antallBarn,
            fødselsdatoer: omBarnet.fødselsdatoer.map((f) => f.dato),
            adopsjonsdato: omBarnet.adopsjonsdato,
            adopsjonAvEktefellesBarn: omBarnet.adopsjonAvEktefellesBarn,
            vedleggreferanser,
        };
    }
    if (erBarnetFødt(omBarnet)) {
        return {
            type: 'fødsel',
            antallBarn: omBarnet.antallBarn,
            fødselsdato: omBarnet.fødselsdato,
            vedleggreferanser: [],
        };
    }

    if (erBarnetIkkeFødt(omBarnet) && dokumentasjon && erTerminDokumentasjon(dokumentasjon)) {
        return {
            type: 'termin',
            antallBarn: omBarnet.antallBarn,
            termindato: omBarnet.termindato,
            terminbekreftelseDato: dokumentasjon.terminbekreftelsedato,
            vedleggreferanser,
        };
    }

    throw Error('Det er feil i data om barnet');
};

const getSendSøknad =
    (locale: Locale, setKvittering: (kvittering: Kvittering | (() => never)) => void) =>
    async (
        abortSignal: AbortSignal,
        omBarnet: OmBarnet,
        dokumentasjon?: Dokumentasjon,
        tidligereUtenlandsopphold?: UtenlandsoppholdTidligere,
        senereUtenlandsopphold?: UtenlandsoppholdSenere,
    ) => {
        const søknad = {
            type: 'engangsstønad',
            språkkode: locale,
            barn: mapBarn(omBarnet, dokumentasjon),
            utenlandsopphold: {
                utenlandsoppholdSiste12Mnd: tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd || [],
                utenlandsoppholdNeste12Mnd: senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd || [],
            },
            vedlegg: dokumentasjon?.vedlegg || [],
        };

        try {
            const response = await engangsstønadApi.post<Kvittering>('/soknad/engangssoknad', søknad, {
                headers: {
                    'content-type': 'application/json;',
                },
                signal: abortSignal,
            });
            setKvittering(response.data);
        } catch (error: unknown) {
            // TODO Håndter på same måte i alle appar. Flytt til api-pakke
            if (isAxiosError(error) && error.code !== 'ERR_CANCELED') {
                const submitErrorCallId =
                    error.response && error.response.data && error.response.data.uuid
                        ? error.response.data.uuid
                        : UKJENT_UUID;
                const callIdForBruker =
                    submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
                // Kast feilmelding inne funksjon som set state => hack for å at ErrorBoundary skal snappa opp feilen
                setKvittering(() => {
                    throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
                });
            }
        }
    };

const Api = { getPerson, getSendSøknad };
export default Api;

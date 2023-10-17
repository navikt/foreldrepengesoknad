import axios, { AxiosResponse, AxiosError } from 'axios';
import { Locale } from '@navikt/fp-common';
import { redirectToLogin } from '@navikt/fp-utils';
import { isAfterToday, notEmpty } from '@navikt/fp-validation';
import Environment from './Environment';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import { Periode, Utenlandsopphold, UtenlandsoppholdPerioder } from 'types/Utenlandsopphold';
import Kvittering from 'types/Kvittering';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';
import { isBeforeToday } from '@navikt/fp-validation';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import dayjs from 'dayjs';

// TODO Flytt generell api-logikk til api-pakka

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

const mapBostedUtlandTilUtenlandsopphold = (perioder: Periode[] = []) => {
    return perioder.map((periode) => ({
        land: periode.landkode,
        tidsperiode: {
            fom: periode.fom,
            tom: periode.tom,
        },
    }));
};

export const mapUtenlandsforhold = (
    utenlandsopphold: Utenlandsopphold,
    utenlandsoppholdPerioder?: UtenlandsoppholdPerioder,
) => {
    if (utenlandsopphold.harKunBoddINorge) {
        return {
            iNorgeSiste12Mnd: true,
            iNorgeNeste12Mnd: true,
            tidligereOpphold: [],
            senereOpphold: [],
        };
    }

    const { perioder } = notEmpty(utenlandsoppholdPerioder);

    const iDag = dayjs().format(ISO_DATE_FORMAT);

    const tidligereOpphold = perioder
        .filter((p) => isBeforeToday(p.fom))
        .map((p) => ({
            ...p,
            tom: isAfterToday(p.tom) ? iDag : p.tom,
        }));
    const senereOpphold = perioder
        .filter((p) => isAfterToday(p.tom))
        .map((p) => ({
            ...p,
            fom: isBeforeToday(p.fom) ? iDag : p.fom,
        }));

    return {
        iNorgeSiste12Mnd: tidligereOpphold.length > 0,
        iNorgeNeste12Mnd: senereOpphold.length > 0,
        tidligereOpphold: mapBostedUtlandTilUtenlandsopphold(tidligereOpphold),
        senereOpphold: mapBostedUtlandTilUtenlandsopphold(senereOpphold),
    };
};

const sendSøknad =
    (locale: Locale, setKvittering: (kvittering: Kvittering) => void) =>
    async (
        omBarnet: OmBarnet,
        utenlandsopphold: Utenlandsopphold,
        dokumentasjon?: Dokumentasjon,
        utenlandsoppholdPerioder?: UtenlandsoppholdPerioder,
    ) => {
        notEmpty(utenlandsopphold);

        //TODO Bør få vekk mappinga her. Bruk samme navngiving på variablane frontend og backend.
        const søknad = {
            barn: mapBarn(omBarnet, dokumentasjon),
            type: 'engangsstønad',
            erEndringssøknad: false,
            informasjonOmUtenlandsopphold: mapUtenlandsforhold(utenlandsopphold, utenlandsoppholdPerioder),
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

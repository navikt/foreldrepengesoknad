import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { Kvittering } from 'app/types/Kvittering';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useGetRequest, usePostRequest } from 'app/utils/hooks/useRequest';
import { AxiosResponse } from 'axios';
import getAxiosInstance from './apiInterceptor';
import { storageParser } from './storageParser';
import Environment from 'app/Environment';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { EndringssøknadForInnsending, SøknadForInnsending } from './apiUtils';
import { Attachment, Dekningsgrad, formaterDato, hasValue } from '@navikt/fp-common';
import { SakerOppslag } from 'app/types/SakerOppslag';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { RequestStatus } from 'app/types/RequestState';

export interface TilgjengeligeStønadskontoerParams {
    antallBarn: string;
    morHarRettINorge: boolean;
    farHarRettINorge: boolean;
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT | Dekningsgrad.ÅTTI_PROSENT;
    termindato: string | undefined;
    fødselsdato: string | undefined;
    omsorgsovertakelsesdato: string | undefined;
    morHarAleneomsorg: boolean | undefined;
    farHarAleneomsorg: boolean | undefined;
    startdatoUttak: string;
    minsterett: boolean;
    erMor: boolean;
    morHarUføretrygd: boolean;
    harAnnenForelderTilsvarendeRettEØS: boolean;
    familieHendelseDatoNesteSak: string | undefined;
}

const formaterStønadskontoParamsDatoer = (dato: string | undefined, datoformat?: string): string | undefined => {
    return hasValue(dato) ? formaterDato(dato, datoformat) : undefined;
};

const uttakBaseUrl = Environment.REST_API_URL;
const sendSøknadUrl = '/soknad';
const sendEndringssøknadUrl = '/soknad/endre';

const useSøkerinfo = () => {
    const { data, error } = useGetRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = () => {
    const { data, error } = useGetRequest<SakerOppslag>('/innsyn/v2/saker', {
        config: { withCredentials: true },
    });

    return {
        sakerData: data,
        sakerError: error,
    };
};

const useGetAnnenPartsVedtak = (
    annenPartFnr: string | undefined,
    barnFnr: string | undefined,
    familiehendelsesdato: string | undefined,
    isSuspended: boolean,
) => {
    const body = {
        annenPartFødselsnummer: annenPartFnr,
        barnFødselsnummer: barnFnr,
        familiehendelse: familiehendelsesdato,
    };
    const { data, error, requestStatus } = usePostRequest<AnnenPartVedtakDTO>('/innsyn/v2/annenPartVedtak', body, {
        config: {
            withCredentials: true,
        },
        isSuspended,
    });

    if (error && error.message.includes('Ugyldig ident')) {
        return {
            eksisterendeSakAnnenPartData: undefined,
            eksisterendeSakAnnenPartError: undefined,
            eksisterendeSakAnnenPartRequestStatus: RequestStatus.FINISHED,
        };
    }
    return {
        eksisterendeSakAnnenPartData: data,
        eksisterendeSakAnnenPartError: error,
        eksisterendeSakAnnenPartRequestStatus: requestStatus,
    };
};

const useStoredAppState = () => {
    const { data, error } = useGetRequest<ForeldrepengesøknadContextState>('/storage', {
        config: { transformResponse: storageParser, withCredentials: true },
    });

    return {
        storageData: data,
        storageError: error,
    };
};

const storeAppState = (state: ForeldrepengesøknadContextState, fnr: string) => {
    const {
        søknad,
        version,
        currentRoute,
        uttaksplanInfo,
        antallUkerIUttaksplan,
        eksisterendeSak,
        endringstidspunkt,
        harAnnenPartEksisterendeSak,
        harEksisterendeSak,
        perioderSomSkalSendesInn,
        harUttaksplanBlittSlettet,
        søknadGjelderEtNyttBarn,
        barnFraNesteSak,
        brukerSvarteJaPåAutoJustering,
        annenPartsUttakErLagtTilIPlan,
        manglerDokumentasjon,
    } = state;
    return getAxiosInstance(fnr).post(
        '/storage',
        {
            søknad,
            version,
            currentRoute,
            uttaksplanInfo,
            antallUkerIUttaksplan,
            eksisterendeSak,
            endringstidspunkt,
            harAnnenPartEksisterendeSak,
            harEksisterendeSak,
            perioderSomSkalSendesInn,
            harUttaksplanBlittSlettet,
            søknadGjelderEtNyttBarn,
            barnFraNesteSak,
            brukerSvarteJaPåAutoJustering,
            annenPartsUttakErLagtTilIPlan,
            manglerDokumentasjon,
        },
        { withCredentials: true },
    );
};

const deleteStoredAppState = (fnr: string) => {
    return getAxiosInstance(fnr).delete('/storage', { withCredentials: true });
};

const getStorageKvittering = (fnr: string): Promise<AxiosResponse<Kvittering>> => {
    return getAxiosInstance(fnr).get('/storage/kvittering/foreldrepenger', {
        withCredentials: true,
        timeout: 15 * 1000,
    });
};

const useGetUttakskontoer = (params: TilgjengeligeStønadskontoerParams, isSuspended = false) => {
    const {
        antallBarn,
        farHarRettINorge,
        morHarRettINorge,
        harAnnenForelderTilsvarendeRettEØS,
        dekningsgrad,
        fødselsdato,
        termindato,
        omsorgsovertakelsesdato,
        morHarAleneomsorg,
        farHarAleneomsorg,
        startdatoUttak,
        minsterett,
        erMor,
        morHarUføretrygd,
        familieHendelseDatoNesteSak,
    } = params;

    const fpUttakServiceDateFormat = 'YYYYMMDD';

    const urlParams = {
        farHarRett: farHarRettINorge,
        morHarRett: morHarRettINorge,
        harAnnenForelderTilsvarendeRettEØS,
        morHarAleneomsorg: morHarAleneomsorg || false,
        farHarAleneomsorg: farHarAleneomsorg || false,
        dekningsgrad,
        antallBarn,
        fødselsdato: formaterStønadskontoParamsDatoer(fødselsdato, fpUttakServiceDateFormat),
        termindato: formaterStønadskontoParamsDatoer(termindato, fpUttakServiceDateFormat),
        omsorgsovertakelseDato: formaterStønadskontoParamsDatoer(omsorgsovertakelsesdato, fpUttakServiceDateFormat),
        startdatoUttak: formaterStønadskontoParamsDatoer(startdatoUttak, fpUttakServiceDateFormat),
        minsterett,
        erMor,
        morHarUføretrygd,
        familieHendelseDatoNesteSak: formaterStønadskontoParamsDatoer(
            familieHendelseDatoNesteSak,
            fpUttakServiceDateFormat,
        ),
    };

    const { data, error } = useGetRequest<TilgjengeligeStønadskontoerDTO>(`${uttakBaseUrl}/konto`, {
        config: {
            timeout: 15 * 1000,
            params: urlParams,
            withCredentials: false,
        },
        isSuspended,
    });

    return {
        tilgjengeligeStønadskontoerData: data,
        tilgjengeligeStønadskontoerError: error,
    };
};

const sendSøknad = (søknad: SøknadForInnsending | EndringssøknadForInnsending, fnr: string, signal: AbortSignal) => {
    const url = søknad.erEndringssøknad ? sendEndringssøknadUrl : sendSøknadUrl;

    return getAxiosInstance(fnr).post(url, søknad, {
        withCredentials: true,
        timeout: 120 * 1000,
        headers: {
            'content-type': 'application/json;',
        },
        signal,
    });
};

const deleteMellomlagretSøknad = (fnr: string, signal: AbortSignal) => {
    return getAxiosInstance(fnr).delete('/storage', { withCredentials: true, signal });
};

const deleteMellomlagredeVedlegg = (fnr: string, vedlegg: Attachment[], signal: AbortSignal) => {
    const attachmentUUIDs = vedlegg.reduce((result: string[], current: Attachment) => {
        if (current.uuid) {
            result.push(current.uuid);
        }

        return result;
    }, []);
    return getAxiosInstance(fnr).delete('/storage/vedlegg', { withCredentials: true, data: attachmentUUIDs, signal });
};

const Api = {
    useGetUttakskontoer,
    storeAppState,
    deleteStoredAppState,
    getStorageKvittering,
    useGetAnnenPartsVedtak,
    useStoredAppState,
    useSøkerinfo,
    sendSøknad,
    useGetSaker,
    deleteMellomlagretSøknad,
    deleteMellomlagredeVedlegg,
};

export default Api;

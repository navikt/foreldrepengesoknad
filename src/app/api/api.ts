import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { Kvittering } from 'app/types/Kvittering';
import Sak from 'app/types/Sak';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useGetRequest, usePostRequest } from 'app/utils/hooks/useRequest';
import { AxiosResponse } from 'axios';
import getAxiosInstance from './apiInterceptor';
import { storageParser } from './storageParser';
import Environment from 'app/Environment';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { EksisterendeSakDTO } from 'app/types/EksisterendeSakDTO';
import { formaterDato } from 'app/utils/dateUtils';
import { EndringssøknadForInnsending, SøknadForInnsending } from './apiUtils';
import { hasValue } from '@navikt/fp-common';
import { SakerOppslag } from 'app/types/sakerv2/SakerOppslag';
import { AnnenPartsVedtakDTO } from 'app/types/sakerv2/AnnenPartsVedtakDTO';

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
}

const formaterStønadskontoParamsDatoer = (dato: string | undefined, datoformat?: string): string | undefined => {
    return hasValue(dato) ? formaterDato(dato, datoformat) : undefined;
};

const uttakBaseUrl = Environment.UTTAK_API_URL;
const sendSøknadUrl = '/soknad';
const sendEndringssøknadUrl = '/soknad/endre';

const useSøkerinfo = () => {
    const { data, error } = useGetRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSakerV2 = (enabled: boolean) => {
    const { data, error } = useGetRequest<SakerOppslag>('/innsyn/v2/saker', {
        config: { withCredentials: true },
        isSuspended: !enabled,
    });

    return {
        sakerV2Data: data,
        sakerV2Error: error,
    };
};

const useGetSaker = (fnr: string | undefined) => {
    const { data, error } = useGetRequest<Sak[]>('/innsyn/saker', {
        fnr,
        config: { withCredentials: true },
        isSuspended: fnr === undefined,
    });

    return {
        sakerData: data,
        sakerError: error,
    };
};

const useGetEksisterendeSak = (saksnummer: string | undefined, fnr: string) => {
    const { data, error } = useGetRequest<EksisterendeSakDTO>('/innsyn/uttaksplan', {
        fnr,
        config: { withCredentials: true, params: { saksnummer } },
        isSuspended: saksnummer === undefined || fnr === undefined,
    });

    return {
        eksisterendeSakData: data,
        eksisterendeSakError: error,
    };
};

const useGetEksisterendeSakMedFnr = (søkerFnr: string, erFarEllerMedmor: boolean, annenPartFnr: string | undefined) => {
    const isSuspended = annenPartFnr !== undefined && erFarEllerMedmor ? false : true;

    const { data, error, requestStatus } = useGetRequest<EksisterendeSakDTO>('/innsyn/uttaksplanannen', {
        fnr: søkerFnr,
        config: { params: { annenPart: annenPartFnr }, withCredentials: true },
        isSuspended,
    });

    return {
        eksisterendeSakAnnenPartData: data,
        eksisterendeSakAnnenPartError: error,
        eksisterendeSakAnnenPartRequestStatus: requestStatus,
    };
};

const useGetAnnenPartsVedtak = (
    annenPartFnr: string | undefined,
    barnFnr: string | undefined,
    familiehendelsesdato: string | undefined
) => {
    const isSuspended =
        annenPartFnr !== undefined && (barnFnr !== undefined || familiehendelsesdato !== undefined) ? false : true;
    const { data, error, requestStatus } = usePostRequest<AnnenPartsVedtakDTO>('/innsyn/v2/annenPartVedtak', {
        config: {
            params: {
                annenPartFødselsnummer: annenPartFnr,
                barnFødselsnummer: barnFnr,
                familiehendelse: familiehendelsesdato,
            },
            withCredentials: true,
        },
        isSuspended,
    });

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
        },
        { withCredentials: true }
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

function sendSøknad(søknad: SøknadForInnsending | EndringssøknadForInnsending, fnr: string) {
    const url = søknad.erEndringssøknad ? sendEndringssøknadUrl : sendSøknadUrl;

    return getAxiosInstance(fnr).post(url, søknad, {
        withCredentials: true,
        timeout: 120 * 1000,
        headers: {
            'content-type': 'application/json;',
        },
    });
}

const Api = {
    useGetSaker,
    useGetUttakskontoer,
    storeAppState,
    deleteStoredAppState,
    getStorageKvittering,
    useGetEksisterendeSakMedFnr,
    useGetAnnenPartsVedtak,
    useStoredAppState,
    useSøkerinfo,
    useGetEksisterendeSak,
    sendSøknad,
    useGetSakerV2,
};

export default Api;

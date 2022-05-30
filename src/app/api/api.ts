import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { Kvittering } from 'app/types/Kvittering';
import Sak from 'app/types/Sak';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useRequest } from 'app/utils/hooks/useRequest';
import { AxiosResponse } from 'axios';
import getAxiosInstance from './apiInterceptor';
import { storageParser } from './storageParser';
import Environment from 'app/Environment';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { EksisterendeSakDTO } from 'app/types/EksisterendeSakDTO';
import { formaterDato } from 'app/utils/dateUtils';
import { EndringssøknadForInnsending, SøknadForInnsending } from './apiUtils';
import { hasValue } from '@navikt/fp-common';
export interface TilgjengeligeStønadskontoerParams {
    antallBarn: string;
    morHarRett: boolean;
    farHarRett: boolean;
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
}

const formaterStønadskontoParamsDatoer = (dato: string | undefined, datoformat?: string): string | undefined => {
    return hasValue(dato) ? formaterDato(dato, datoformat) : undefined;
};

const uttakBaseUrl = Environment.UTTAK_API_URL;
const sendSøknadUrl = '/soknad';
const sendEndringssøknadUrl = '/soknad/endre';

const useSøkerinfo = () => {
    const { data, error } = useRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = (fnr: string | undefined) => {
    const { data, error } = useRequest<Sak[]>('/innsyn/saker', {
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
    const { data, error } = useRequest<EksisterendeSakDTO>('/innsyn/uttaksplan', {
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
    const { data, error, requestStatus } = useRequest<EksisterendeSakDTO>('/innsyn/uttaksplanannen', {
        fnr: søkerFnr,
        config: { params: { annenPart: annenPartFnr }, withCredentials: true },
        isSuspended: annenPartFnr !== undefined && erFarEllerMedmor ? false : true,
    });

    return {
        eksisterendeSakAnnenPartData: data,
        eksisterendeSakAnnenPartError: error,
        eksisterendeSakAnnenPartRequestStatus: requestStatus,
    };
};

const useStoredAppState = () => {
    const { data, error } = useRequest<ForeldrepengesøknadContextState>('/storage', {
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
        farHarRett,
        morHarRett,
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
        farHarRett,
        morHarRett,
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

    const { data, error } = useRequest<TilgjengeligeStønadskontoerDTO>(`${uttakBaseUrl}/konto`, {
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
    useStoredAppState,
    useSøkerinfo,
    useGetEksisterendeSak,
    sendSøknad,
};

export default Api;

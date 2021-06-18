import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Kvittering } from 'app/types/Kvittering';
import Sak from 'app/types/Sak';
import { StorageKvittering } from 'app/types/StorageKvittering';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useRequest } from 'app/utils/hooks/useRequest';
import { AxiosResponse } from 'axios';
import getAxiosInstance from './apiInterceptor';
import { storageParser } from './storageParser';
import Environment from 'app/Environment';
import { formaterStønadskontoParamsDatoer } from 'app/utils/dateUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';

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
}

const uttakBaseUrl = Environment.UTTAK_API_URL;
// const sendSøknadUrl = '/soknad';
// const sendEndringssøknadUrl = '/soknad/endre';

const useSøkerinfo = () => {
    const { data, error } = useRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = () => {
    const { data, error } = useRequest<Sak[]>('/innsyn/saker', { fnr: '123', config: { withCredentials: true } });

    return {
        sakerData: data,
        sakerError: error,
    };
};

const useGetEksisterendeSak = (saksnummer: string) => {
    const { data, error } = useRequest<EksisterendeSak>('/innsyn/uttaksplan', {
        fnr: '123',
        config: { withCredentials: true, params: saksnummer },
    });

    return {
        eksisterendeSakData: data,
        eksisterendeSakError: error,
    };
};

const useGetEksisterendeSakMedFnr = (søkerFnr: string, annenPartFnr: string | undefined) => {
    const { data, error } = useRequest<EksisterendeSak>('/innsyn/uttaksplanannen', {
        fnr: søkerFnr,
        config: { params: { annenPart: annenPartFnr }, withCredentials: true },
        isSuspended: annenPartFnr ? false : true,
    });

    return {
        eksisterendeSakAnnenPartData: data,
        eksisterendeSakAnnenPartError: error,
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

const storeAppState = (state: ForeldrepengesøknadContextState) => {
    const { søknad, version, currentRoute } = state;
    return getAxiosInstance('123').post('/storage', { søknad, version, currentRoute }, { withCredentials: true });
};

const deleteStoredAppState = () => {
    return getAxiosInstance('123').delete('/storage', { withCredentials: true });
};

const sendStorageKvittering = (
    storageKvittering: StorageKvittering,
    fnr: string
): Promise<AxiosResponse<Kvittering>> => {
    return getAxiosInstance(fnr).post('/storage/kvittering/foreldrepenger', storageKvittering, {
        withCredentials: true,
        timeout: 15 * 1000,
    });
};

const useGetUttakskontoer = (params: TilgjengeligeStønadskontoerParams) => {
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
    };

    const { data, error } = useRequest<TilgjengeligeStønadskontoerDTO>(`${uttakBaseUrl}/konto`, {
        config: {
            timeout: 15 * 1000,
            params: urlParams,
            withCredentials: false,
        },
        isSuspended: false,
    });

    return {
        tilgjengeligeStønadskontoerData: data,
        tilgjengeligeStønadskontoerError: error,
    };
};

// function sendSøknad(søknad: SøknadForInnsending | EnkelEndringssøknadForInnsending) {
//     const url = søknad.erEndringssøknad ? sendEndringssøknadUrl : sendSøknadUrl;

//     return getAxiosInstance('123').post(url, søknad, {
//         withCredentials: true,
//         timeout: 120 * 1000,
//         headers: {
//             'content-type': 'application/json;',
//         },
//     });
// }

// function sendStorageKvittering(storageKvittering: StorageKvittering) {
//     return getAxiosInstance('123').post('/storage/kvittering/foreldrepenger', storageKvittering, {
//         withCredentials: true,
//         timeout: 15 * 1000,
//     });
// }

// function getStorageKvittering() {
//     return getAxiosInstance('123').get('/storage/kvittering/foreldrepenger', {
//         withCredentials: true,
//         timeout: 15 * 1000,
//     });
// }

const Api = {
    useGetSaker,
    useGetUttakskontoer,
    storeAppState,
    deleteStoredAppState,
    sendStorageKvittering,
    useGetEksisterendeSakMedFnr,
    useStoredAppState,
    useSøkerinfo,
    useGetEksisterendeSak,
    // sendSøknad,
    // getStorageKvittering,
};

export default Api;

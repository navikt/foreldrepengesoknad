import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { Kvittering } from 'app/types/Kvittering';
import Sak from 'app/types/Sak';
import { StorageKvittering } from 'app/types/StorageKvittering';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useRequest } from 'app/utils/hooks/useRequest';
import { AxiosResponse } from 'axios';
import getAxiosInstance from './apiInterceptor';
import { storageParser } from './storageParser';
import Environment from 'app/Environment';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { EksisterendeSakDTO } from 'app/types/EksisterendeSakDTO';
import { mapEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import { formaterDato } from 'app/utils/dateUtils';
import { cleanUpSøknadsdataForInnsending } from './apiUtils';

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

const formaterStønadskontoParamsDatoer = (dato: string | undefined, datoformat?: string): string | undefined => {
    return dato !== undefined ? formaterDato(dato, datoformat) : undefined;
};

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

const useGetEksisterendeSak = (saksnummer: string, fnr: string) => {
    const { data, error } = useRequest<EksisterendeSakDTO>('/innsyn/uttaksplan', {
        fnr,
        config: { withCredentials: true, params: saksnummer },
    });

    return {
        eksisterendeSakData: data,
        eksisterendeSakError: error,
    };
};

const useGetEksisterendeSakMedFnr = (søkerFnr: string, erFarEllerMedmor: boolean, annenPartFnr: string | undefined) => {
    const { data, error } = useRequest<EksisterendeSakDTO>('/innsyn/uttaksplanannen', {
        fnr: søkerFnr,
        config: { params: { annenPart: annenPartFnr }, withCredentials: true },
        isSuspended: annenPartFnr && erFarEllerMedmor ? false : true,
    });

    return {
        eksisterendeSakAnnenPartData: mapEksisterendeSakFromDTO(data, erFarEllerMedmor, true),
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

const storeAppState = (state: ForeldrepengesøknadContextState, fnr: string) => {
    const { søknad, version, currentRoute, uttaksplanInfo } = state;
    const cleanedSøknad = cleanUpSøknadsdataForInnsending(søknad);
    return getAxiosInstance(fnr).post(
        '/storage',
        { cleanedSøknad, version, currentRoute, uttaksplanInfo },
        { withCredentials: true }
    );
};

const deleteStoredAppState = (fnr: string) => {
    return getAxiosInstance(fnr).delete('/storage', { withCredentials: true });
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

// import axios from 'axios';
// import Environment from 'app/Environment';
import createAxiosInstance from './apiInterceptor';
import { storageParser } from './storageParser';

// export interface GetTilgjengeligeStønadskontoerParams {
//     antallBarn: number;
//     morHarRett: boolean;
//     farHarRett: boolean;
//     dekningsgrad: Dekningsgrad.HUNDRE_PROSENT | Dekningsgrad.ÅTTI_PROSENT;
//     termindato?: Date;
//     fødselsdato?: Date;
//     omsorgsovertakelsesdato?: Date;
//     morHarAleneomsorg?: boolean;
//     farHarAleneomsorg?: boolean;
//     startdatoUttak: Date;
// }

// const uttakBaseUrl = Environment.UTTAK_API_URL;
// const sendSøknadUrl = '/soknad';
// const sendEndringssøknadUrl = '/soknad/endre';

function getSøkerinfo(url: string) {
    return createAxiosInstance()
        .get(url)
        .then((res) => res.data);
}

const getSaker = () => {
    return createAxiosInstance('123').get('/innsyn/saker');
};

const getEksisterendeSak = (saksnummer: string) => {
    return createAxiosInstance('123').get('/innsyn/uttaksplan', {
        withCredentials: true,
        params: { saksnummer },
    });
};

const getEksisterendeSakMedFnr = (annenPartFnr: string) => {
    return createAxiosInstance('123').get('/innsyn/uttaksplanannen', {
        params: { annenPart: annenPartFnr },
    });
};

// function getUttakskontoer(params: GetTilgjengeligeStønadskontoerParams) {
//     const {
//         antallBarn,
//         farHarRett,
//         morHarRett,
//         dekningsgrad,
//         fødselsdato,
//         termindato,
//         omsorgsovertakelsesdato,
//         morHarAleneomsorg,
//         farHarAleneomsorg,
//         startdatoUttak,
//     } = params;
//     const fpUttakServiceDateFormat = 'YYYYMMDD';
//     const urlParams = {
//         farHarRett,
//         morHarRett,
//         morHarAleneomsorg: morHarAleneomsorg || false,
//         farHarAleneomsorg: farHarAleneomsorg || false,
//         dekningsgrad,
//         antallBarn,
//         fødselsdato: formaterStønadskontoParamsDatoer(fødselsdato, fpUttakServiceDateFormat),
//         termindato: formaterStønadskontoParamsDatoer(termindato, fpUttakServiceDateFormat),
//         omsorgsovertakelseDato: formaterStønadskontoParamsDatoer(omsorgsovertakelsesdato, fpUttakServiceDateFormat),
//         startdatoUttak: formaterDato(startdatoUttak, fpUttakServiceDateFormat),
//     };

//     return axios.get(`${uttakBaseUrl}/konto`, {
//         timeout: 15 * 1000,
//         params: urlParams,
//     });
// }

// function sendSøknad(søknad: SøknadForInnsending | EnkelEndringssøknadForInnsending) {
//     const url = søknad.erEndringssøknad ? sendEndringssøknadUrl : sendSøknadUrl;

//     return createAxiosInstance('123').post(url, søknad, {
//         withCredentials: true,
//         timeout: 120 * 1000,
//         headers: {
//             'content-type': 'application/json;',
//         },
//     });
// }

function getStoredAppState() {
    return createAxiosInstance('123').get('/storage', {
        transformResponse: storageParser,
    });
}

function storeAppState(state: Partial<any>) {
    const { søknad, common, version } = state;
    return createAxiosInstance('123').post('/storage', { søknad, common, version }, { withCredentials: true });
}

function deleteStoredAppState() {
    return createAxiosInstance('123').delete('/storage', { withCredentials: true });
}

// function sendStorageKvittering(storageKvittering: StorageKvittering) {
//     return createAxiosInstance('123').post('/storage/kvittering/foreldrepenger', storageKvittering, {
//         withCredentials: true,
//         timeout: 15 * 1000,
//     });
// }

// function getStorageKvittering() {
//     return createAxiosInstance('123').get('/storage/kvittering/foreldrepenger', {
//         withCredentials: true,
//         timeout: 15 * 1000,
//     });
// }

const Api = {
    getSøkerinfo,
    getSaker,
    // getUttakskontoer,
    // sendSøknad,
    getStoredAppState,
    storeAppState,
    deleteStoredAppState,
    // sendStorageKvittering,
    // getStorageKvittering,
    getEksisterendeSak,
    getEksisterendeSakMedFnr,
};

export default Api;

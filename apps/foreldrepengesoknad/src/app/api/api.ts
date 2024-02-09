import { Kvittering } from 'app/types/Kvittering';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { useGetRequest } from 'app/utils/hooks/useRequest';
import { AxiosResponse } from 'axios';
import getAxiosInstance from './apiInterceptor';
import { storageParser } from './storageParser';
import Environment from 'app/Environment';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { EndringssøknadForInnsending, SøknadForInnsending } from './apiUtils';
import {
    Attachment,
    BarnFraNesteSak,
    Dekningsgrad,
    EksisterendeSak,
    Periode,
    formaterDato,
    hasValue,
} from '@navikt/fp-common';
import { SakerOppslag } from 'app/types/SakerOppslag';
import SøknadRoutes from 'app/routes/routes';
import { Søknad } from 'app/context/types/Søknad';
import UttaksplanInfo from 'app/context/types/UttaksplanInfo';
import { Søkerinfo } from '@navikt/fp-types';

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
    const { data, error } = useGetRequest<Søkerinfo>('/sokerinfo', { config: { withCredentials: true } });

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

export interface FpMellomlagretData {
    version: number;
    currentRoute: SøknadRoutes;
    søknad?: Partial<Søknad>;
    antallUkerIUttaksplan?: number;
    perioderSomSkalSendesInn?: Periode[];
    harUttaksplanBlittSlettet?: boolean;
    søknadGjelderEtNyttBarn?: boolean;
    uttaksplanInfo?: UttaksplanInfo;
    eksisterendeSak?: EksisterendeSak;
    endringstidspunkt?: Date;
    barnFraNesteSak?: BarnFraNesteSak;
    annenPartsUttakErLagtTilIPlan?: boolean;
}

const useStoredAppState = () => {
    const { data, error, requestStatus } = useGetRequest<FpMellomlagretData>('/storage/foreldrepenger', {
        config: { transformResponse: storageParser, withCredentials: true },
    });

    return {
        storageData: data,
        storageError: error,
        storageStatus: requestStatus,
    };
};

const storeAppState = (dataSomSkalMellomlagres: FpMellomlagretData, fnr: string) => {
    return getAxiosInstance(fnr).post('/storage/foreldrepenger', dataSomSkalMellomlagres, { withCredentials: true });
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

const deleteMellomlagretSøknad = (fnr: string, signal?: AbortSignal) => {
    return getAxiosInstance(fnr).delete('/storage/foreldrepenger', { withCredentials: true, signal });
};

const deleteMellomlagredeVedlegg = (fnr: string, vedlegg: Attachment[], signal: AbortSignal) => {
    const attachmentUUIDs = vedlegg.reduce((result: string[], current: Attachment) => {
        if (current.uuid) {
            result.push(current.uuid);
        }

        return result;
    }, []);
    return getAxiosInstance(fnr).delete('/storage/foreldrepenger/vedlegg', {
        withCredentials: true,
        data: attachmentUUIDs,
        signal,
    });
};

const Api = {
    useGetUttakskontoer,
    storeAppState,
    getStorageKvittering,
    useStoredAppState,
    useSøkerinfo,
    sendSøknad,
    useGetSaker,
    deleteMellomlagretSøknad,
    deleteMellomlagredeVedlegg,
};

export default Api;

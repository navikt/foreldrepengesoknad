import { AxiosResponse } from 'axios';

import { getAxiosInstance } from '@navikt/fp-api';
import { BarnFraNesteSak, Dekningsgrad, EksisterendeSak, Periode } from '@navikt/fp-common';
import { Attachment, LocaleNo, Søkerinfo } from '@navikt/fp-types';

import Fordeling from 'app/context/types/Fordeling';
import { Søknad } from 'app/context/types/Søknad';
import SøknadRoutes from 'app/routes/routes';
import { Kvittering } from 'app/types/Kvittering';
import { SakerOppslag } from 'app/types/SakerOppslag';
import { useGetRequest } from 'app/utils/hooks/useRequest';

import { EndringssøknadForInnsending, SøknadForInnsending } from './apiUtils';
import { storageParser } from './storageParser';

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

const sendSøknadUrl = '/rest/soknad';
const sendEndringssøknadUrl = '/rest/soknad/endre';

const useSøkerinfo = () => {
    const { data, error } = useGetRequest<Søkerinfo>('/rest/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = () => {
    const { data, error } = useGetRequest<SakerOppslag>('/rest/innsyn/v2/saker', {
        config: { withCredentials: true },
    });

    return {
        sakerData: data,
        sakerError: error,
    };
};

export interface FpMellomlagretData {
    version: number;
    locale: LocaleNo;
    currentRoute: SøknadRoutes;
    søknad?: Partial<Søknad>;
    antallUkerIUttaksplan?: number;
    perioderSomSkalSendesInn?: Periode[];
    harUttaksplanBlittSlettet?: boolean;
    søknadGjelderEtNyttBarn?: boolean;
    fordeling?: Fordeling;
    eksisterendeSak?: EksisterendeSak;
    endringstidspunkt?: Date;
    barnFraNesteSak?: BarnFraNesteSak;
    annenPartsUttakErLagtTilIPlan?: boolean;
}

const useStoredAppState = () => {
    const { data, error, requestStatus } = useGetRequest<FpMellomlagretData>('/rest/storage/foreldrepenger', {
        config: { transformResponse: storageParser, withCredentials: true },
    });

    return {
        storageData: data,
        storageError: error,
        storageStatus: requestStatus,
    };
};

const storeAppState = (dataSomSkalMellomlagres: FpMellomlagretData, fnr: string) => {
    return getAxiosInstance(fnr).post('/rest/storage/foreldrepenger', dataSomSkalMellomlagres, {
        withCredentials: true,
    });
};

const getStorageKvittering = (fnr: string): Promise<AxiosResponse<Kvittering>> => {
    return getAxiosInstance(fnr).get('/rest/storage/kvittering/foreldrepenger', {
        withCredentials: true,
        timeout: 15 * 1000,
    });
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
    return getAxiosInstance(fnr).delete('/rest/storage/foreldrepenger', { withCredentials: true, signal });
};

const deleteMellomlagredeVedlegg = (fnr: string, vedlegg: Attachment[], signal: AbortSignal) => {
    const attachmentUUIDs = vedlegg.reduce((result: string[], current: Attachment) => {
        if (current.uuid) {
            result.push(current.uuid);
        }

        return result;
    }, []);
    return getAxiosInstance(fnr).delete('/rest/storage/foreldrepenger/vedlegg', {
        withCredentials: true,
        data: attachmentUUIDs,
        signal,
    });
};

const Api = {
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

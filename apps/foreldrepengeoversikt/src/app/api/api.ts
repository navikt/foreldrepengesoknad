import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { getAxiosInstance } from '@navikt/fp-api';
import { Skjemanummer } from '@navikt/fp-constants';

import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { Dokument } from 'app/types/Dokument';
import EttersendingDto from 'app/types/EttersendingDTO';
import { MellomlagredeYtelser } from 'app/types/MellomlagredeYtelser';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { RequestStatus } from 'app/types/RequestStatus';
import { SakOppslagDTO } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';

import { useGetRequest, usePostRequest } from './useRequest';

export const søkerInfoOptions = () =>
    queryOptions({
        queryKey: ['SØKER_INFO'],
        queryFn: () => ky.get('/rest/sokerinfo').json<SøkerinfoDTO>(),
    });

export const minidialogOptions = () =>
    queryOptions({
        queryKey: ['MINIDIALOG'],
        queryFn: () => ky.get(`/rest/minidialog`).json<MinidialogInnslag[]>(),
    });

export const hentSakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`/rest/innsyn/v2/saker`).json<SakOppslagDTO>(),
    });

const useGetOversiktOverMellomlagredeYtelser = () => {
    const { data, error } = useGetRequest<MellomlagredeYtelser>('/rest/storage/aktive', {
        config: { withCredentials: true },
        isSuspended: true,
    });

    return {
        storageData: data,
        storageError: error,
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
    const { data, error, requestStatus } = usePostRequest<AnnenPartVedtakDTO>('/rest/innsyn/v2/annenPartVedtak', body, {
        config: {
            withCredentials: true,
        },
        isSuspended,
    });

    if (error?.message?.includes('Ugyldig ident')) {
        return {
            annenPartsVedtakData: undefined,
            annenPartsVedtakError: undefined,
            annenPartsVedtakRequestStatus: RequestStatus.FINISHED,
        };
    }
    return {
        annenPartsVedtakData: data,
        annenPartsVedtakError: error,
        annenPartsVedtakRequestStatus: requestStatus,
    };
};

const useGetDokumenter = (saksnr: string) => {
    const { data, error, requestStatus } = useGetRequest<Dokument[]>('/rest/dokument/alle', {
        config: { withCredentials: true, params: { saksnummer: saksnr } },
    });

    return {
        dokumenterData: data,
        dokumenterError: error,
        dokumenterStatus: requestStatus,
    };
};

const useGetTidslinjeHendelser = (saksnr: string) => {
    const { data, error } = useGetRequest<Tidslinjehendelse[]>('/rest/innsyn/tidslinje', {
        config: { withCredentials: true, params: { saksnummer: saksnr } },
    });

    return {
        tidslinjeHendelserData: data,
        tidslinjeHendelserError: error,
    };
};

const useGetManglendeVedlegg = (saksnr: string) => {
    const { data, error } = useGetRequest<Skjemanummer[]>('/rest/historikk/vedlegg', {
        config: { withCredentials: true, params: { saksnummer: saksnr } },
    });

    return {
        manglendeVedleggData: data,
        manglendeVedleggError: error,
    };
};

const sendEttersending = (ettersending: EttersendingDto, fnr?: string) => {
    return getAxiosInstance(fnr).post('/rest/soknad/ettersend', ettersending, {
        timeout: 30 * 1000,
        withCredentials: true,
    });
};

export const erSakOppdatertOptions = () =>
    queryOptions({
        queryKey: ['SAK_OPPDATERT'],
        queryFn: () => ky.get('/rest/innsyn/v2/saker/oppdatert').json<boolean>(),
    });

const Api = {
    useGetDokumenter,
    useGetAnnenPartsVedtak,
    useGetTidslinjeHendelser,
    useGetManglendeVedlegg,
    useGetMellomlagretSøknad: useGetOversiktOverMellomlagredeYtelser,
    sendEttersending,
};

export default Api;

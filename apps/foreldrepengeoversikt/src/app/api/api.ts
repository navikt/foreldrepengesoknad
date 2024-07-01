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

import { usePostRequest } from './useRequest';

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

export const hentDokumenterOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['DOKUMENTER', saksnummer],
        queryFn: () => ky.get(`/rest/dokument/alle`, { searchParams: { saksnummer } }).json<Dokument[]>(),
    });

export const hentMellomlagredeYtelser = () =>
    queryOptions({
        queryKey: ['MELLOMLAGREDE_YTELSER'],
        queryFn: () => ky.get('/rest/storage/aktive').json<MellomlagredeYtelser>(),
    });

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

export const hentTidslinjehendelser = (saksnummer: string) =>
    queryOptions({
        queryKey: ['TIDSLINJEHENDELSER', saksnummer],
        queryFn: () => ky.get(`/rest/innsyn/tidslinje`, { searchParams: { saksnummer } }).json<Tidslinjehendelse[]>(),
    });

export const hentManglendeVedlegg = (saksnummer: string) =>
    queryOptions({
        queryKey: ['MANGLENDE_VEDLEGG', saksnummer],
        queryFn: () => ky.get('/rest/historikk/vedlegg').json<Skjemanummer[]>(),
    });

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
    useGetAnnenPartsVedtak,
    sendEttersending,
};

export default Api;

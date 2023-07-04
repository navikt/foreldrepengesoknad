import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { Dokument } from 'app/types/Dokument';
import EttersendingDto from 'app/types/EttersendingDTO';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { RequestStatus } from 'app/types/RequestStatus';
import { SakOppslagDTO } from 'app/types/SakOppslag';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import getAxiosInstance from './apiInterceptor';
import { usePostRequest, useGetRequest } from './useRequest';

const useSøkerinfo = () => {
    const { data, error } = useGetRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = (sakerSuspended: boolean) => {
    const { data, error } = useGetRequest<SakOppslagDTO>('/innsyn/v2/saker', {
        config: { withCredentials: true },
        isSuspended: sakerSuspended,
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
    isSuspended: boolean
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

const useGetDokumenter = (fnr: string) => {
    const { data, error, requestStatus } = useGetRequest<Dokument[]>(
        '/dokument/alle',
        {
            config: { withCredentials: true },
        },
        fnr
    );

    return {
        dokumenterData: data,
        dokumenterError: error,
        dokumenterStatus: requestStatus,
    };
};

const useGetTidslinjeHendelser = (saksnr: string) => {
    const { data, error } = useGetRequest<Tidslinjehendelse[]>('/innsyn/tidslinje', {
        config: { withCredentials: true, params: { saksnummer: saksnr } },
    });

    return {
        tidslinjeHendelserData: data,
        tidslinjeHendelserError: error,
    };
};

const useGetMinidialog = () => {
    const { data, error } = useGetRequest<MinidialogInnslag[]>('/minidialog', {
        config: { withCredentials: true },
    });

    return {
        minidialogData: data,
        minidialogError: error,
    };
};

const useGetManglendeVedlegg = (saksnr: string) => {
    const { data, error } = useGetRequest<Skjemanummer[]>('/historikk/vedlegg', {
        config: { withCredentials: true, params: { saksnummer: saksnr } },
    });

    return {
        manglendeVedleggData: data,
        manglendeVedleggError: error,
    };
};

const sendEttersending = (ettersending: EttersendingDto, fnr?: string) => {
    return getAxiosInstance(fnr).post('/soknad/ettersend', ettersending, {
        timeout: 30 * 1000,
        withCredentials: true,
    });
};

const useErSakOppdatert = () => {
    const { data, error } = useGetRequest<boolean>('/innsyn/v2/saker/oppdatert', {
        config: { withCredentials: true },
    });

    return {
        oppdatertData: data,
        oppdatertError: error,
    };
};

const Api = {
    useSøkerinfo,
    useGetSaker,
    useGetDokumenter,
    useGetAnnenPartsVedtak,
    useGetTidslinjeHendelser,
    useGetMinidialog,
    useGetManglendeVedlegg,
    useErSakOppdatert,
    sendEttersending,
};

export default Api;

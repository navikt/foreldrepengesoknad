import { Dokument } from 'app/types/Dokument';
import EttersendingDto from 'app/types/EttersendingDTO';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { SakOppslagDTO } from 'app/types/SakOppslag';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import getAxiosInstance from './apiInterceptor';
import { useRequest } from './useRequest';

const useSøkerinfo = () => {
    const { data, error } = useRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const useGetSaker = () => {
    const { data, error } = useRequest<SakOppslagDTO>('/innsyn/v2/saker', {
        config: { withCredentials: true },
    });

    return {
        sakerData: data,
        sakerError: error,
    };
};

const useGetAnnenPartsVedtak = (isSuspended: boolean) => {
    const { data, error } = useRequest<any>('/innsyn/v2/annenPartVedtak', {
        config: { withCredentials: true },
        isSuspended,
    });

    return {
        annenPartsVedakData: data,
        annenPartsVedtakError: error,
    };
};

const useGetDokumenter = (fnr: string) => {
    const { data, error, requestStatus } = useRequest<Dokument[]>(
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
    const { data, error } = useRequest<Tidslinjehendelse[]>('/innsyn/tidslinje', {
        config: { withCredentials: true, params: { saksnummer: saksnr } },
    });

    return {
        tidslinjeHendelserData: data,
        tidslinjeHendelserError: error,
    };
};

const useGetMinidialog = () => {
    const { data, error } = useRequest<MinidialogInnslag[]>('/minidialog', {
        config: { withCredentials: true },
    });

    return {
        minidialogData: data,
        minidialogError: error,
    };
};

const useGetManglendeVedlegg = (saksnr: string) => {
    const { data, error } = useRequest<Skjemanummer[]>('/historikk/vedlegg', {
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

const Api = {
    useSøkerinfo,
    useGetSaker,
    useGetDokumenter,
    useGetAnnenPartsVedtak,
    useGetTidslinjeHendelser,
    useGetMinidialog,
    useGetManglendeVedlegg,
    sendEttersending,
};

export default Api;

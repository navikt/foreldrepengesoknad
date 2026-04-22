import { queryOptions } from '@tanstack/react-query';
import { EsMellomlagretData } from 'appData/useEsMellomlagring';
import ky, { type ResponsePromise } from 'ky';

import { EsPersonopplysningerDto_fpoversikt, ForsendelseStatus } from '@navikt/fp-types';

const urlPrefiks = import.meta.env.BASE_URL;

/** Backend returnerer null for Optional.orElse(null), som JAX-RS oversetter til 204 No Content */
const jsonEllerNull = async <T>(responsePromise: ResponsePromise) => {
    const response = await responsePromise;
    return response.status === 204 ? null : response.json<T>();
};

export const API_URLS = {
    personInfo: `${urlPrefiks}/fpoversikt/api/personopplysninger/engangsstonad`,
    erOppdatert: `${urlPrefiks}/fpoversikt/api/saker/erOppdatert`,
    mellomlagring: `${urlPrefiks}/fpsoknad/api/storage/ENGANGSSTONAD`,
    status: `${urlPrefiks}/fpsoknad/api/soknad/status`,
    sendSøknad: `${urlPrefiks}/fpsoknad/api/soknad/engangsstonad`,
    sendVedlegg: `${urlPrefiks}/fpsoknad/api/storage/ENGANGSSTONAD/vedlegg`,
} as const;

export const personOptions = () =>
    queryOptions({
        queryKey: ['PERSONINFO'],
        queryFn: () => ky.get(API_URLS.personInfo).json<EsPersonopplysningerDto_fpoversikt>(),
        staleTime: Infinity,
    });

export const mellomlagretInfoOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => jsonEllerNull<EsMellomlagretData>(ky.get(API_URLS.mellomlagring)),
        select: (data) => data ?? undefined,
        staleTime: Infinity,
    });

export const statusOptions = () =>
    queryOptions({
        queryKey: ['STATUS'],
        queryFn: async () => {
            const status = await ky.get(API_URLS.status).json<ForsendelseStatus>();
            if (status.saksnummer !== undefined) {
                const erOppdatert = await ky.get(API_URLS.erOppdatert).json<boolean>();
                if (erOppdatert) {
                    return status;
                }
                return { status: 'PENDING' } satisfies ForsendelseStatus;
            }

            return status;
        },
        staleTime: Infinity,
    });

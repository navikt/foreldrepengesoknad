import { queryOptions } from '@tanstack/react-query';
import { SvpMellomlagretData } from 'appData/useMellomlagreSøknad';
import { type ResponsePromise } from 'ky';

import { kyWithSentry as ky } from '@navikt/fp-observability';
import { ForsendelseStatus, Saker_fpoversikt, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

const urlPrefiks = import.meta.env.BASE_URL;

/** Backend returnerer null for Optional.orElse(null), som JAX-RS oversetter til 204 No Content */
const jsonEllerNull = async <T>(responsePromise: ResponsePromise) => {
    const response = await responsePromise;
    return response.status === 204 ? null : response.json<T>();
};

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/fpoversikt/api/personopplysninger/svangerskapspenger`,
    saker: `${urlPrefiks}/fpoversikt/api/saker`,
    erOppdatert: `${urlPrefiks}/fpoversikt/api/saker/erOppdatert`,

    status: `${urlPrefiks}/fpsoknad/api/soknad/status`,
    mellomlagring: `${urlPrefiks}/fpsoknad/api/storage/SVANGERSKAPSPENGER`,
    sendSøknad: `${urlPrefiks}/fpsoknad/api/soknad/svangerskapspenger`,
    sendVedlegg: `${urlPrefiks}/fpsoknad/api/storage/SVANGERSKAPSPENGER/vedlegg`,
    hentVedlegg: (uuid: string) => `${urlPrefiks}/fpsoknad/api/storage/SVANGERSKAPSPENGER/vedlegg/${uuid}`,
} as const;

export const sakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(API_URLS.saker).json<Saker_fpoversikt>(),
        staleTime: Infinity,
    });

export const søkerinfoOptions = () =>
    queryOptions({
        queryKey: ['SØKERINFO'],
        queryFn: () => ky.get(API_URLS.søkerInfo, { timeout: 30000 }).json<SvpPersonopplysningerDto_fpoversikt>(),
        staleTime: Infinity,
    });

export const mellomlagretInfoOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => jsonEllerNull<SvpMellomlagretData>(ky.get(API_URLS.mellomlagring)),
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

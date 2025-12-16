import { queryOptions } from '@tanstack/react-query';
import { EsDataMapAndMetaData } from 'appData/useEsMellomlagring';
import ky from 'ky';

import { ForsendelseStatus, PersonDto_fpoversikt } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    personInfo: `${urlPrefiks}/fpoversikt/api/person/info`,
    erOppdatert: `${urlPrefiks}/fpoversikt/api/saker/erOppdatert`,
    mellomlagring: `${urlPrefiks}/fpsoknad/api/storage/ENGANGSSTONAD`,
    status: `${urlPrefiks}/fpsoknad/api/soknad/status`,
    sendSøknad: `${urlPrefiks}/fpsoknad/api/soknad/engangsstonad`,
    sendVedlegg: `${urlPrefiks}/fpsoknad/api/storage/ENGANGSSTONAD/vedlegg`,
} as const;

export const personOptions = () =>
    queryOptions({
        queryKey: ['PERSONINFO'],
        queryFn: () => ky.get(API_URLS.personInfo).json<PersonDto_fpoversikt>(),
        staleTime: Infinity,
    });

export const mellomlagretInfoOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(API_URLS.mellomlagring).json<EsDataMapAndMetaData>(),
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

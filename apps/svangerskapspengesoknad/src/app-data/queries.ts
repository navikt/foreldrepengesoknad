import { queryOptions } from '@tanstack/react-query';
import { SvpDataMapAndMetaData } from 'appData/useMellomlagreSøknad';
import ky from 'ky';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { ForsendelseStatus, Saker, Satser, Søkerinfo } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/rest/sokerinfo`,
    saker: `${urlPrefiks}/rest/innsyn/v2/saker`,
    satser: `${urlPrefiks}/rest/satser`,

    status: `${urlPrefiks}/fpsoknad/api/soknad/status`,
    mellomlagring: `${urlPrefiks}/fpsoknad/api/storage/SVANGERSKAPSPENGER`,
    sendSøknad: `${urlPrefiks}/fpsoknad/api/soknad/svangerskapspenger`,
    sendVedlegg: `${urlPrefiks}/fpsoknad/api/storage/SVANGERSKAPSPENGER/vedlegg`,
    hentVedlegg: (uuid: string) => `${urlPrefiks}/fpsoknad/api/storage/SVANGERSKAPSPENGER/vedlegg/${uuid}`,
} as const;

export const sakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(API_URLS.saker).json<Saker>(),
        staleTime: Infinity,
    });

export const søkerinfoOptions = () =>
    queryOptions({
        queryKey: ['SØKERINFO'],
        queryFn: () => ky.get(API_URLS.søkerInfo, { timeout: 30000 }).json<Søkerinfo>(),
        staleTime: Infinity,
    });

export const mellomlagretInfoOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(API_URLS.mellomlagring).json<SvpDataMapAndMetaData>(),
        staleTime: Infinity,
    });

export const satserOptions = () =>
    queryOptions({
        queryKey: ['SATSER'],
        queryFn: () => ky.get(API_URLS.satser).json<Satser>(),
        staleTime: Infinity,
        initialData: DEFAULT_SATSER,
    });

export const statusOptions = () =>
    queryOptions({
        queryKey: ['STATUS'],
        queryFn: () => ky.get(API_URLS.status).json<ForsendelseStatus>(),
        staleTime: Infinity,
    });

import { queryOptions } from '@tanstack/react-query';
import { EsDataMapAndMetaData } from 'appData/useEsMellomlagring';
import ky from 'ky';

import { PersonFrontend } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    personInfo: `${urlPrefiks}/rest/personinfo`,
    mellomlagring: `${urlPrefiks}/fpsoknad/storage/engangsstonad`,
    sendSøknad: `${urlPrefiks}/fpsoknad/api/soknad/engangsstonad`,
    sendVedlegg: `${urlPrefiks}/fpsoknad/api/storage/engangsstonad/vedlegg`,
} as const;

export const personOptions = () =>
    queryOptions({
        queryKey: ['PERSONINFO'],
        queryFn: () => ky.get(API_URLS.personInfo).json<PersonFrontend>(),
        staleTime: Infinity,
    });

export const mellomlagretInfoOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(API_URLS.mellomlagring).json<EsDataMapAndMetaData>(),
        staleTime: Infinity,
    });

import { queryOptions } from '@tanstack/react-query';
import { EsDataMapAndMetaData } from 'appData/useEsMellomlagring';
import ky from 'ky';

import { PersonDto_fpoversikt } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    personInfo: `${urlPrefiks}/fpoversikt/api/person/info`,
    mellomlagring: `${urlPrefiks}/rest/storage/engangsstonad`,
    sendSøknad: `${urlPrefiks}/rest/soknad/engangsstonad`,
    sendVedlegg: `${urlPrefiks}/rest/storage/engangsstonad/vedlegg`,
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

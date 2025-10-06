import { queryOptions } from '@tanstack/react-query';
import { EsDataMapAndMetaData } from 'appData/useEsMellomlagring';
import ky from 'ky';

import { PersonFrontend } from '@navikt/fp-types';

export const API_URLS = {
    personInfo: `${import.meta.env.BASE_URL}/rest/personinfo`,
    mellomlagring: `${import.meta.env.BASE_URL}/rest/storage/engangsstonad`,
    sendSøknad: `${import.meta.env.BASE_URL}/rest/soknad/engangsstonad`,
    sendVedlegg: `${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg`,
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

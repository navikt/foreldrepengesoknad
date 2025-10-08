import { queryOptions } from '@tanstack/react-query';
import { SvpDataMapAndMetaData } from 'appData/useMellomlagreSøknad';
import ky from 'ky';

import { PersonMedArbeidsforholdDto_fpoversikt, Saker_fpoversikt } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/fpoversikt/api/person/info-med-arbeidsforhold`,
    saker: `${urlPrefiks}/fpoversikt/api/saker`,

    mellomlagring: `${urlPrefiks}/rest/storage/svangerskapspenger`,
    sendSøknad: `${urlPrefiks}/rest/soknad/svangerskapspenger`,
    sendVedlegg: `${urlPrefiks}/rest/storage/svangerskapspenger/vedlegg`,
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
        queryFn: () => ky.get(API_URLS.søkerInfo, { timeout: 30000 }).json<PersonMedArbeidsforholdDto_fpoversikt>(),
        staleTime: Infinity,
    });

export const mellomlagretInfoOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(API_URLS.mellomlagring).json<SvpDataMapAndMetaData>(),
        staleTime: Infinity,
    });

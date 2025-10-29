import { queryOptions } from '@tanstack/react-query';
import { SvpDataMapAndMetaData } from 'appData/useMellomlagreSøknad';
import ky from 'ky';

import { ForsendelseStatus, PersonMedArbeidsforholdDto_fpoversikt, Saker_fpoversikt } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/fpoversikt/api/person/info-med-arbeidsforhold`,
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
        queryFn: () => ky.get(API_URLS.søkerInfo, { timeout: 30000 }).json<PersonMedArbeidsforholdDto_fpoversikt>(),
        staleTime: Infinity,
    });

export const mellomlagretInfoOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGRET_INFO'],
        queryFn: () => ky.get(API_URLS.mellomlagring).json<SvpDataMapAndMetaData>(),
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

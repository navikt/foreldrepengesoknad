import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    konto: `${urlPrefiks}/rest/konto`,
    satser: `${urlPrefiks}/rest/satser`,
} as const;

export const hentSatserOptions = () =>
    queryOptions({
        queryKey: ['SATSER'],
        queryFn: () => ky.get(API_URLS.satser).json<Satser>(),
        staleTime: Infinity,
        initialData: DEFAULT_SATSER,
    });

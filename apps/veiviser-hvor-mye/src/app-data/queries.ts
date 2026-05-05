import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { KontoBeregningDto } from '@navikt/fp-types';

const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    konto: `${urlPrefiks}/fpgrunndata/api/konto`,
} as const;

type StønadskvoteParams = {
    rettighetstype: string;
    brukerrolle: string;
    antallBarn: string;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelseDato?: string;
    morHarUføretrygd: boolean;
};
export const tilgjengeligeStønadskvoterOptions = (data: StønadskvoteParams) =>
    queryOptions({
        queryKey: ['TILGJENGELIGE_STONADSKVOTER', data],
        queryFn: () =>
            ky.post(API_URLS.konto, { json: data }).json<{ '100': KontoBeregningDto; '80': KontoBeregningDto }>(),
        staleTime: Infinity,
    });

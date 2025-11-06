import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { KontoBeregningDto_fpoversikt } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    konto: `${urlPrefiks}/fpgrunndata/api/konto`,
} as const;

type StønadskontoParams = {
    rettighetstype: string;
    brukerrolle: string;
    antallBarn: string;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelseDato?: string;
    morHarUføretrygd: boolean;
    familieHendelseDatoNesteSak?: Date;
};
export const tilgjengeligeStønadskontoerOptions = (data: StønadskontoParams) =>
    queryOptions({
        queryKey: ['TILGJENGELIGE_STONADSKONTOER', data],
        queryFn: () =>
            ky
                .post(API_URLS.konto, { json: data })
                .json<{ '100': KontoBeregningDto_fpoversikt; '80': KontoBeregningDto_fpoversikt }>(),
        staleTime: Infinity,
    });

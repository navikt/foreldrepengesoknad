import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    konto: `${urlPrefiks}/rest/konto`, //TODO
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
        queryFn: () => ky.post(API_URLS.konto, { json: data }).json<TilgjengeligeStønadskontoer>(),
        staleTime: Infinity,
    });

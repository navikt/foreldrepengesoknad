import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { AnnenPartSak, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

type AnnenPartVedtakParams = {
    annenPartFødselsnummer?: string;
    barnFødselsnummer?: string;
    familiehendelse: string;
};

type StønadskontoParams = {
    rettighetstype: string;
    brukerrolle: string;
    antallBarn: string;
    fødselsdato: string | undefined;
    termindato: string | undefined;
    omsorgsovertakelseDato: string | undefined;
    morHarUføretrygd: boolean;
    familieHendelseDatoNesteSak: Date | undefined;
};

export const annenPartVedtakOptions = (data: AnnenPartVedtakParams, enabled: boolean) =>
    queryOptions({
        queryKey: ['ANNEN_PART_VEDTAK', data],
        queryFn: () =>
            ky.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, { json: data }).json<AnnenPartSak>(),
        enabled,
    });

export const nesteSakAnnenPartVedtakOptions = (data: AnnenPartVedtakParams, enabled: boolean) =>
    queryOptions({
        queryKey: ['NESTE_SAK_ANNEN_PART_VEDTAK', data],
        queryFn: () =>
            ky.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, { json: data }).json<AnnenPartSak>(),
        enabled,
    });

export const tilgjengeligeStønadskontoerOptions = (data: StønadskontoParams, enabled: boolean) =>
    queryOptions({
        queryKey: ['TILGJENGELIGE_STONADSKONTOER', data],
        queryFn: () =>
            ky.post(`${import.meta.env.BASE_URL}/rest/konto`, { json: data }).json<TilgjengeligeStønadskontoer>(),
        enabled,
    });

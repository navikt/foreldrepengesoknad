import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { Tidsperiode } from '@navikt/fp-common';
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

export type DokumentereMorsArbeidParams = {
    annenPartFødselsnummer: string;
    barnFødselsnummer?: string;
    familiehendelse: string;
    perioder: Array<Tidsperiode & { periodeType: 'UTSETTELSE' | 'UTTAK' }>;
};

export const annenPartVedtakOptions = (data?: AnnenPartVedtakParams) =>
    queryOptions({
        queryKey: ['ANNEN_PART_VEDTAK', data],
        queryFn: () =>
            ky.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, { json: data }).json<AnnenPartSak>(),
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
        staleTime: Infinity,
    });

export const trengerDokumentereMorsArbeidOptions = (data: DokumentereMorsArbeidParams, enabled: boolean) =>
    queryOptions({
        queryKey: ['TRENGER_DOKUMENTERER_MORS_ARBEID', data],
        queryFn: () =>
            ky
                .post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid`, { json: data })
                .json<boolean>(),
        enabled,
    });

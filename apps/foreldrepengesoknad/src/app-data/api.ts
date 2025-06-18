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
        queryFn: async () => {
            const vedtakEllerTomStrengForIngenVedtak = await ky
                .post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, { json: data })
                .json<AnnenPartSak | ''>();
            if (vedtakEllerTomStrengForIngenVedtak === '') {
                return null;
            }

            return vedtakEllerTomStrengForIngenVedtak;
        },
        /**
         * Denne selected ser snodig ut. Men poenget er at QueryCachen liker ikke at data er undefined.
         * Derfor lagres den som null i cache. Men i bruk i koden ønsker vi ikke deale med både null og undefined.
         */
        select: (vedtak) => {
            if (vedtak === null) {
                return undefined;
            }
            return vedtak;
        },
    });

export const tilgjengeligeStønadskontoerOptions = (data: StønadskontoParams) =>
    queryOptions({
        queryKey: ['TILGJENGELIGE_STONADSKONTOER', data],
        queryFn: () =>
            ky.post(`${import.meta.env.BASE_URL}/rest/konto`, { json: data }).json<TilgjengeligeStønadskontoer>(),
        staleTime: Infinity,
    });

export const trengerDokumentereMorsArbeidOptions = (data: DokumentereMorsArbeidParams) =>
    queryOptions({
        queryKey: ['TRENGER_DOKUMENTERER_MORS_ARBEID', data],
        queryFn: () =>
            ky
                .post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid`, { json: data })
                .json<boolean>(),
    });

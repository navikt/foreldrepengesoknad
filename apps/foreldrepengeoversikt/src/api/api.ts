import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';
import { z } from 'zod';

import { Skjemanummer } from '@navikt/fp-constants';
import {
    AnnenPartVedtakDTO,
    DokumentDto,
    EttersendingDto,
    KontoBeregningDto,
    KontoBeregningGrunnlagDto,
    MellomlagredeYtelser,
    MinidialogInnslag,
    Saker,
    Satser,
    Søkerinfo,
    TidslinjeHendelseDto,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

import { InntektsmeldingDtoSchema } from './zodSchemas';

export const urlPrefiks = import.meta.env.BASE_URL;

export const søkerInfoOptions = () =>
    queryOptions({
        queryKey: ['SØKER_INFO'],
        queryFn: () => ky.get(`${urlPrefiks}/rest/sokerinfo`).json<Søkerinfo>(),
    });

export const minidialogOptions = () =>
    queryOptions({
        queryKey: ['MINIDIALOG'],
        queryFn: () => ky.get(`${urlPrefiks}/rest/minidialog`).json<MinidialogInnslag[]>(),
    });

export const hentSakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`${urlPrefiks}/rest/innsyn/v2/saker`).json<Saker>(),
    });

export const hentUttaksKontoOptions = (body: KontoBeregningGrunnlagDto) =>
    queryOptions({
        queryKey: ['UTTAKSKONTO', body],
        queryFn: () =>
            ky
                .post(`${urlPrefiks}/rest/konto`, { json: body })
                .json<{ '80': KontoBeregningDto; '100': KontoBeregningDto }>(),
    });

export const hentDokumenterOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['DOKUMENTER', saksnummer],
        queryFn: () =>
            ky.get(`${urlPrefiks}/rest/dokument/alle`, { searchParams: { saksnummer } }).json<DokumentDto[]>(),
    });

export const hentInntektsmelding = (saksnummer: string) =>
    queryOptions({
        queryKey: ['INNTEKTSMELDING', saksnummer],
        queryFn: async () => {
            const response = await ky
                .get(`${urlPrefiks}/rest/innsyn/inntektsmeldinger`, { searchParams: { saksnummer } })
                .json();

            const parsedJson = z.array(InntektsmeldingDtoSchema).safeParse(response);

            if (!parsedJson.success) {
                throw new Error('Responsen fra serveren matchet ikke forventet format');
            }

            // Versjon 1 kan ikke brukes og skal ignoreres.
            return parsedJson.data
                .filter((im) => im.versjon >= 2)
                .map((im) => ({
                    ...im,
                    arbeidsgiverNavn: capitalizeFirstLetterInEveryWordOnly(im.arbeidsgiverNavn) ?? '',
                }));
        },
    });

export const hentSatserOptions = () =>
    queryOptions({
        queryKey: ['SATSER'],
        queryFn: () => ky.get(`${urlPrefiks}/rest/satser`).json<Satser>(),
        staleTime: Infinity,
    });

export const hentMellomlagredeYtelserOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGREDE_YTELSER'],
        queryFn: () => ky.get(`${urlPrefiks}/rest/storage/aktive`).json<MellomlagredeYtelser>(),
    });

type AnnenPartsVedtakRequestBody = {
    annenPartFødselsnummer?: string;
    barnFødselsnummer?: string;
    familiehendelse?: string;
};

export const hentAnnenPartsVedtakOptions = (body: AnnenPartsVedtakRequestBody) =>
    queryOptions({
        queryKey: ['ANNEN_PARTS_VEDTAK', body],
        queryFn: () =>
            ky.post<AnnenPartVedtakDTO>(`${urlPrefiks}/rest/innsyn/v2/annenPartVedtak`, { json: body }).json(),
    });

export const hentTidslinjehendelserOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['TIDSLINJEHENDELSER', saksnummer],
        queryFn: () =>
            ky
                .get(`${urlPrefiks}/rest/innsyn/tidslinje`, { searchParams: { saksnummer } })
                .json<TidslinjeHendelseDto[]>(),
    });

export const hentManglendeVedleggOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['MANGLENDE_VEDLEGG', saksnummer],
        queryFn: () =>
            ky.get(`${urlPrefiks}/rest/historikk/vedlegg`, { searchParams: { saksnummer } }).json<Skjemanummer[]>(),
    });

export const sendEttersending = async (ettersending: EttersendingDto, fnr?: string) => {
    // Det funker ikke å bruke ky.post() her.
    // Det virker som at siden måten Adrum wrapper alle requests på, gjør at det skjer noe funny-business på et eller annet punkt som fjerner content-type...
    // Undersøke videre senere, gjør det slik for nå for å rette feil.
    const response = await fetch(`${urlPrefiks}/rest/soknad/ettersend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(fnr !== undefined && { fnr: fnr }),
        },
        signal: AbortSignal.timeout(30 * 1000),
        body: JSON.stringify(ettersending),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as unknown;
};

export const erSakOppdatertOptions = () =>
    queryOptions({
        queryKey: ['SAK_OPPDATERT'],
        queryFn: () => ky.get(`${urlPrefiks}/rest/innsyn/v2/saker/oppdatert`).json<boolean>(),
    });

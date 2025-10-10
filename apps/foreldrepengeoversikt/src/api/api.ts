import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';
import { z } from 'zod';

import { DEFAULT_SATSER, Skjemanummer } from '@navikt/fp-constants';
import {
    AnnenPartSak,
    AnnenPartSakIdentifikator,
    DokumentDto,
    EttersendelseDto,
    KontoBeregningDto,
    KontoBeregningGrunnlagDto,
    MinidialogInnslag,
    Saker,
    Satser,
    Søkerinfo,
    TidslinjeHendelseDto,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

import { InntektsmeldingDtoSchema } from './zodSchemas';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/rest/sokerinfo`,
    saker: `${urlPrefiks}/rest/innsyn/v2/saker`,
    annenPartVedtak: `${urlPrefiks}/rest/innsyn/v2/annenPartVedtak`,
    minidialog: `${urlPrefiks}/rest/minidialog`,
    konto: `${urlPrefiks}/rest/konto`,
    dokumenter: `${urlPrefiks}/rest/dokument/alle`,
    inntektsmelding: `${urlPrefiks}/rest/innsyn/inntektsmeldinger`,
    satser: `${urlPrefiks}/rest/satser`,
    ettersend: `${urlPrefiks}/rest/soknad/ettersend`,
    erOppdatert: `${urlPrefiks}/rest/innsyn/v2/saker/oppdatert`,
    manglendeVedlegg: `${urlPrefiks}/rest/historikk/vedlegg`,
    tidslinje: `${urlPrefiks}/rest/innsyn/tidslinje`,

    lastOppFPVedlegg: `${urlPrefiks}/fpsoknad/api/storage/FORELDREPENGER/vedlegg`,
    lastOppESVedlegg: `${urlPrefiks}/fpsoknad/api//storage/ENGANGSSTONAD/vedlegg`,
    lastOppSVPVedlegg: `${urlPrefiks}/fpsoknad/api//storage/SVANGERSKAPSPENGER/vedlegg`,
} as const;

export const søkerInfoOptions = () =>
    queryOptions({
        queryKey: ['SØKER_INFO'],
        queryFn: () => ky.get(API_URLS.søkerInfo).json<Søkerinfo>(),
    });

export const minidialogOptions = () =>
    queryOptions({
        queryKey: ['MINIDIALOG'],
        queryFn: () => ky.get(API_URLS.minidialog).json<MinidialogInnslag[]>(),
    });

export const hentSakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(API_URLS.saker).json<Saker>(),
    });

export const hentUttaksKontoOptions = (body: KontoBeregningGrunnlagDto) =>
    queryOptions({
        queryKey: ['UTTAKSKONTO', body],
        queryFn: () =>
            ky.post(API_URLS.konto, { json: body }).json<{ '80': KontoBeregningDto; '100': KontoBeregningDto }>(),
    });

export const hentDokumenterOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['DOKUMENTER', saksnummer],
        queryFn: () => ky.get(API_URLS.dokumenter, { searchParams: { saksnummer } }).json<DokumentDto[]>(),
    });

export const hentInntektsmelding = (saksnummer: string) =>
    queryOptions({
        queryKey: ['INNTEKTSMELDING', saksnummer],
        queryFn: async () => {
            const response = await ky.get(API_URLS.inntektsmelding, { searchParams: { saksnummer } }).json();

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
        queryFn: () => ky.get(API_URLS.satser).json<Satser>(),
        staleTime: Infinity,
        initialData: DEFAULT_SATSER,
    });

export const hentAnnenPartsVedtakOptions = (body: AnnenPartSakIdentifikator) =>
    queryOptions({
        queryKey: ['ANNEN_PARTS_VEDTAK', body],
        queryFn: () => ky.post<AnnenPartSak>(API_URLS.annenPartVedtak, { json: body }).json(),
    });

export const hentTidslinjehendelserOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['TIDSLINJEHENDELSER', saksnummer],
        queryFn: () => ky.get(API_URLS.tidslinje, { searchParams: { saksnummer } }).json<TidslinjeHendelseDto[]>(),
    });

export const hentManglendeVedleggOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['MANGLENDE_VEDLEGG', saksnummer],
        queryFn: () => ky.get(API_URLS.manglendeVedlegg, { searchParams: { saksnummer } }).json<Skjemanummer[]>(),
    });

export const sendEttersending = async (ettersending: EttersendelseDto, fnr?: string) => {
    // Det funker ikke å bruke ky.post() her.
    // Det virker som at siden måten Adrum wrapper alle requests på, gjør at det skjer noe funny-business på et eller annet punkt som fjerner content-type...
    // Undersøke videre senere, gjør det slik for nå for å rette feil.
    const response = await fetch(API_URLS.ettersend, {
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

    return await response.json();
};

export const erSakOppdatertOptions = () =>
    queryOptions({
        queryKey: ['SAK_OPPDATERT'],
        queryFn: () => ky.get(API_URLS.erOppdatert).json<boolean>(),
    });

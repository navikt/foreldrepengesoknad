import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';
import { z } from 'zod';

import { Skjemanummer } from '@navikt/fp-constants';
import {
    AnnenPartRequest_fpoversikt,
    AnnenPartSak_fpoversikt,
    DokumentDto_fpoversikt,
    EttersendelseDto,
    KontoBeregningDto_fpoversikt,
    KontoBeregningGrunnlagDto,
    Kvittering,
    PersonMedArbeidsforholdDto_fpoversikt,
    Saker_fpoversikt,
    TidslinjeHendelseDto_fpoversikt,
    TilbakekrevingUttalelseOppgave_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

import { InntektsmeldingDtoSchema } from './zodSchemas';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/fpoversikt/api/person/info-med-arbeidsforhold`, //DONE
    saker: `${urlPrefiks}/fpoversikt/api/saker`, //DONE
    annenPartVedtak: `${urlPrefiks}/fpoversikt/api/annenPart/v2`, //DONE
    minidialog: `${urlPrefiks}/fpoversikt/api/oppgaver/tilbakekrevingsuttalelse`, //DONE
    dokumenter: `${urlPrefiks}/fpoversikt/api/dokument/alle`, //DONE
    inntektsmelding: `${urlPrefiks}/fpoversikt/api/inntektsmeldinger`, //???
    tidslinje: `${urlPrefiks}/fpoversikt/api/tidslinje`, //DONE,
    manglendeVedlegg: `${urlPrefiks}/fpoversikt/api/oppgaver/manglendevedlegg`, //DONE
    erOppdatert: `${urlPrefiks}/fpoversikt/api/saker/erOppdatert`, //DONE

    konto: `${urlPrefiks}/rest/konto`, // TODO HVOR??

    ettersend: `${urlPrefiks}/rest/soknad/ettersend`,
    lastOppFPVedlegg: `${urlPrefiks}/rest/storage/foreldrepenger/vedlegg`,
    lastOppESVedlegg: `${urlPrefiks}/rest/storage/engangsstonad/vedlegg`,
} as const;

export const søkerInfoOptions = () =>
    queryOptions({
        queryKey: ['SØKER_INFO'],
        queryFn: () => ky.get(API_URLS.søkerInfo).json<PersonMedArbeidsforholdDto_fpoversikt>(),
    });

export const minidialogOptions = () =>
    queryOptions({
        queryKey: ['MINIDIALOG'],
        queryFn: () => ky.get(API_URLS.minidialog).json<TilbakekrevingUttalelseOppgave_fpoversikt[]>(),
    });

export const hentSakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(API_URLS.saker).json<Saker_fpoversikt>(),
    });

export const hentUttaksKontoOptions = (body: KontoBeregningGrunnlagDto) =>
    queryOptions({
        queryKey: ['UTTAKSKONTO', body],
        queryFn: () =>
            ky
                .post(API_URLS.konto, { json: body })
                .json<{ '80': KontoBeregningDto_fpoversikt; '100': KontoBeregningDto_fpoversikt }>(),
    });

export const hentDokumenterOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['DOKUMENTER', saksnummer],
        queryFn: () => ky.get(API_URLS.dokumenter, { searchParams: { saksnummer } }).json<DokumentDto_fpoversikt[]>(),
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

export const hentAnnenPartsVedtakOptions = (body: AnnenPartRequest_fpoversikt) =>
    queryOptions({
        queryKey: ['ANNEN_PARTS_VEDTAK', body],
        queryFn: () => ky.post<AnnenPartSak_fpoversikt>(API_URLS.annenPartVedtak, { json: body }).json(),
    });

export const hentTidslinjehendelserOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['TIDSLINJEHENDELSER', saksnummer],
        queryFn: () =>
            ky.get(API_URLS.tidslinje, { searchParams: { saksnummer } }).json<TidslinjeHendelseDto_fpoversikt[]>(),
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

    return (await response.json()) as Kvittering;
};

export const erSakOppdatertOptions = () =>
    queryOptions({
        queryKey: ['SAK_OPPDATERT'],
        queryFn: () => ky.get(API_URLS.erOppdatert).json<boolean>(),
    });

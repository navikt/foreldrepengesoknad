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
    KontoBeregningGrunnlagDto_fpoversikt,
    PersonMedArbeidsforholdDto_fpoversikt,
    Saker_fpoversikt,
    TidslinjeHendelseDto_fpoversikt,
    TilbakekrevingUttalelseOppgave_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

import { InntektsmeldingDtoSchema } from './zodSchemas';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/fpoversikt/api/person/info-med-arbeidsforhold`,
    saker: `${urlPrefiks}/fpoversikt/api/saker`,
    annenPartVedtak: `${urlPrefiks}/fpoversikt/api/annenPart/v2`,
    minidialog: `${urlPrefiks}/fpoversikt/api/oppgaver/tilbakekrevingsuttalelse`,
    dokumenter: `${urlPrefiks}/fpoversikt/api/dokument/alle`,
    hentDokument: (journalpostId: string, dokumentId: string) =>
        `${urlPrefiks}/fpoversikt/api/dokument?journalpostId=${journalpostId}&dokumentId=${dokumentId}`,
    inntektsmelding: `${urlPrefiks}/fpoversikt/api/inntektsmeldinger`,
    konto: `${urlPrefiks}/fpoversikt/api/konto`,
    tidslinje: `${urlPrefiks}/fpoversikt/api/tidslinje`,
    manglendeVedlegg: `${urlPrefiks}/fpoversikt/api/oppgaver/manglendevedlegg`,

    ettersend: `${urlPrefiks}/fpsoknad/api/soknad/ettersend`,
    lastOppFPVedlegg: `${urlPrefiks}/fpsoknad/api/storage/FORELDREPENGER/vedlegg`,
    lastOppESVedlegg: `${urlPrefiks}/fpsoknad/api/storage/ENGANGSSTONAD/vedlegg`,
    lastOppSVPVedlegg: `${urlPrefiks}/fpsoknad/api/storage/SVANGERSKAPSPENGER/vedlegg`,
} as const;

export const søkerInfoOptions = () =>
    queryOptions({
        queryKey: ['SØKERINFO'],
        queryFn: () => ky.get(API_URLS.søkerInfo, { timeout: 30000 }).json<PersonMedArbeidsforholdDto_fpoversikt>(),
        staleTime: Infinity,
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

export const hentUttaksKontoOptions = (body: KontoBeregningGrunnlagDto_fpoversikt) =>
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

export const sendEttersending = async (ettersending: EttersendelseDto) => {
    return ky.post(API_URLS.ettersend, { json: ettersending }).json();
};

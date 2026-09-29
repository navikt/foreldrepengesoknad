import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { Skjemanummer } from '@navikt/fp-constants';
import {
    DokumentDto_fpoversikt,
    EttersendelseDto,
    FellesUttaksplanDto_fpoversikt,
    FellesUttaksplanRequest_fpoversikt,
    FpOversiktInntektsmeldingDto_fpoversikt,
    KontoBeregningGrunnlagDto,
    KontoBeregningResultatDto,
    OversiktPersonopplysningerDto_fpoversikt,
    Saker_fpoversikt,
    TidslinjeHendelseDto_fpoversikt,
    TilbakekrevingUttalelseOppgave_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

export const urlPrefiks = import.meta.env.BASE_URL;

export const API_URLS = {
    søkerInfo: `${urlPrefiks}/fpoversikt/api/personopplysninger/oversikt`,
    saker: `${urlPrefiks}/fpoversikt/api/saker`,
    uttaksplan: `${urlPrefiks}/fpoversikt/api/uttaksplan`,
    minidialog: `${urlPrefiks}/fpoversikt/api/oppgaver/tilbakekrevingsuttalelse`,
    dokumenter: `${urlPrefiks}/fpoversikt/api/dokument/alle`,
    hentDokument: (journalpostId: string, dokumentId: string) => {
        const params = new URLSearchParams({ journalpostId, dokumentId });
        return `${urlPrefiks}/fpoversikt/api/dokument?${params.toString()}`;
    },
    inntektsmelding: `${urlPrefiks}/fpoversikt/api/inntektsmeldinger`,
    konto: `${urlPrefiks}/fpgrunndata/api/konto`,
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
        queryFn: () => ky.get(API_URLS.søkerInfo, { timeout: 30_000 }).json<OversiktPersonopplysningerDto_fpoversikt>(),
        staleTime: Infinity,
        refetchOnWindowFocus: 'always',
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

export const hentUttakskvoteOptions = (body: KontoBeregningGrunnlagDto) =>
    queryOptions({
        queryKey: ['UTTAKSKVOTE', body],
        queryFn: () => ky.post(API_URLS.konto, { json: body }).json<KontoBeregningResultatDto>(),
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
            const response = await ky
                .get(API_URLS.inntektsmelding, { searchParams: { saksnummer } })
                .json<FpOversiktInntektsmeldingDto_fpoversikt[]>();

            // Versjon 1 kan ikke brukes og skal ignoreres.
            return response
                .filter((im) => im.versjon >= 2)
                .map((im) => ({
                    ...im,
                    arbeidsgiverNavn: capitalizeFirstLetterInEveryWordOnly(im.arbeidsgiverNavn) ?? '',
                }));
        },
    });

export const hentUttaksplanOptions = (body: FellesUttaksplanRequest_fpoversikt) =>
    queryOptions({
        queryKey: ['UTTAKSPLAN', body],
        queryFn: () => ky.post(API_URLS.uttaksplan, { json: body }).json<FellesUttaksplanDto_fpoversikt>(),
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
    await ky.post(API_URLS.ettersend, { json: ettersending });
};

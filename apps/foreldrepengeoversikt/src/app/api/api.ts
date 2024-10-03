import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { Skjemanummer } from '@navikt/fp-constants';

import Environment from 'app/appData/Environment';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { Dokument } from 'app/types/Dokument';
import EttersendingDto from 'app/types/EttersendingDTO';
import { IM_DUMMY } from 'app/types/InntektsmeldingDto';
import { MellomlagredeYtelser } from 'app/types/MellomlagredeYtelser';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { SakOppslagDTO } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';

export const prefiks_public_path = Environment.PUBLIC_PATH;

export const søkerInfoOptions = () =>
    queryOptions({
        queryKey: ['SØKER_INFO'],
        queryFn: () => ky.get(`${prefiks_public_path}/rest/sokerinfo`).json<SøkerinfoDTO>(),
    });

export const minidialogOptions = () =>
    queryOptions({
        queryKey: ['MINIDIALOG'],
        queryFn: () => ky.get(`${prefiks_public_path}/rest/minidialog`).json<MinidialogInnslag[]>(),
    });

export const hentSakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`${prefiks_public_path}/rest/innsyn/v2/saker`).json<SakOppslagDTO>(),
    });

export const hentDokumenterOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['DOKUMENTER', saksnummer],
        queryFn: () =>
            ky.get(`${prefiks_public_path}/rest/dokument/alle`, { searchParams: { saksnummer } }).json<Dokument[]>(),
    });

export const hentInntektsmelding = (saksnummer: string) => {
    queryOptions({
        queryKey: ['INNTEKTSMELDING', saksnummer],
        queryFn: () => IM_DUMMY,
    });
};

export const hentMellomlagredeYtelserOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGREDE_YTELSER'],
        queryFn: () => ky.get(`${prefiks_public_path}/rest/storage/aktive`).json<MellomlagredeYtelser>(),
    });

type AnnenPartsVedtakRequestBody = {
    annenPartFødselsnummer?: string;
    barnFødselsnummer?: string;
    familiehendelse?: string;
};

export const hentAnnenPartsVedtakOptions = (body: AnnenPartsVedtakRequestBody) =>
    queryOptions({
        queryKey: ['ANNEN_PARTS_VEDTAK', body],
        queryFn: async () => {
            try {
                // Det funker ikke å bruke ky.post() her.
                // Det virker som at siden måten Adrum wrapper alle requests på, gjør at det skjer noe funny-business på et
                // eller annet punkt som fjerner content-type...
                // Undersøke videre senere, gjør det slik for nå for å rette feil.
                const response = await fetch(`${prefiks_public_path}/rest/innsyn/v2/annenPartVedtak`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                try {
                    return (await response.json()) as AnnenPartVedtakDTO;
                } catch {
                    // Dersom det ikke finnes en annenPart så sender api bare en tom response. Da vil json.parse() feile.
                    // Men så lenge response er OK så er ikke denne en feil, og vi vil heller ha null tilbake.
                    return null;
                }
            } catch (error: any) {
                // NOTE: inkluderer denne sjekken fordi den fantes før Tanstack refactor. Revurder om den behøves?
                if (error?.message?.includes('Ugyldig ident')) {
                    return undefined;
                }
                throw error;
            }
        },
    });

export const hentTidslinjehendelserOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['TIDSLINJEHENDELSER', saksnummer],
        queryFn: () =>
            ky
                .get(`${prefiks_public_path}/rest/innsyn/tidslinje`, { searchParams: { saksnummer } })
                .json<Tidslinjehendelse[]>(),
    });

export const hentManglendeVedleggOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['MANGLENDE_VEDLEGG', saksnummer],
        queryFn: () =>
            ky
                .get(`${prefiks_public_path}/rest/historikk/vedlegg`, { searchParams: { saksnummer } })
                .json<Skjemanummer[]>(),
    });

export const sendEttersending = async (ettersending: EttersendingDto, fnr?: string) => {
    // Det funker ikke å bruke ky.post() her.
    // Det virker som at siden måten Adrum wrapper alle requests på, gjør at det skjer noe funny-business på et eller annet punkt som fjerner content-type...
    // Undersøke videre senere, gjør det slik for nå for å rette feil.
    const response = await fetch(`${prefiks_public_path}/rest/soknad/ettersend`, {
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
        queryFn: () => ky.get(`${prefiks_public_path}/rest/innsyn/v2/saker/oppdatert`).json<boolean>(),
    });

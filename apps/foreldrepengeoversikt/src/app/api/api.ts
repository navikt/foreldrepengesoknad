import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';

import { Skjemanummer } from '@navikt/fp-constants';

import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { Dokument } from 'app/types/Dokument';
import EttersendingDto from 'app/types/EttersendingDTO';
import { MellomlagredeYtelser } from 'app/types/MellomlagredeYtelser';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { SakOppslagDTO } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';

export const søkerInfoOptions = () =>
    queryOptions({
        queryKey: ['SØKER_INFO'],
        queryFn: () => ky.get('/rest/sokerinfo').json<SøkerinfoDTO>(),
    });

export const minidialogOptions = () =>
    queryOptions({
        queryKey: ['MINIDIALOG'],
        queryFn: () => ky.get(`/rest/minidialog`).json<MinidialogInnslag[]>(),
    });

export const hentSakerOptions = () =>
    queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`/rest/innsyn/v2/saker`).json<SakOppslagDTO>(),
    });

export const hentDokumenterOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['DOKUMENTER', saksnummer],
        queryFn: () => ky.get(`/rest/dokument/alle`, { searchParams: { saksnummer } }).json<Dokument[]>(),
    });

export const hentMellomlagredeYtelserOptions = () =>
    queryOptions({
        queryKey: ['MELLOMLAGREDE_YTELSER'],
        queryFn: () => ky.get('/rest/storage/aktive').json<MellomlagredeYtelser>(),
    });

type AnnenPartsVedtakRequestBody = {
    annenPartFødselsnummer?: string;
    barnFødselsnummer?: string;
    familiehendelse?: string;
};

// TODO: før så sjekket denne om error.message hadde "Ugyldig ident", og hvis så ga heller success med undefined istedenfor error. Why?
export const hentAnnenPartsVedtakOptions = (body: AnnenPartsVedtakRequestBody) =>
    queryOptions({
        queryKey: ['ANNEN_PARTS_VEDTAK', body],
        queryFn: () => ky.post('/rest/innsyn/v2/annenPartVedtak', { json: body }).json<AnnenPartVedtakDTO>(),
    });

export const hentTidslinjehendelserOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['TIDSLINJEHENDELSER', saksnummer],
        queryFn: () => ky.get(`/rest/innsyn/tidslinje`, { searchParams: { saksnummer } }).json<Tidslinjehendelse[]>(),
    });

export const hentManglendeVedleggOptions = (saksnummer: string) =>
    queryOptions({
        queryKey: ['MANGLENDE_VEDLEGG', saksnummer],
        queryFn: () => ky.get('/rest/historikk/vedlegg').json<Skjemanummer[]>(),
    });

export const sendEttersending = (ettersending: EttersendingDto, fnr?: string) => {
    return ky.post('/rest/soknad/ettersend', { json: ettersending, timeout: 30 * 1000, headers: { fnr } });
};

export const erSakOppdatertOptions = () =>
    queryOptions({
        queryKey: ['SAK_OPPDATERT'],
        queryFn: () => ky.get('/rest/innsyn/v2/saker/oppdatert').json<boolean>(),
    });

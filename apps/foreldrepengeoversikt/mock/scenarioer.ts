import { HttpResponse, RequestHandler, http } from 'msw';
import { dokumenter } from 'storybookData/dokumenter/dokumenter';
import { manglendeVedlegg } from 'storybookData/manglendeVedlegg/manglendeVedlegg';
import { miniDialog } from 'storybookData/miniDialog/miniDialog';
import { saker_ES_under_behandling, saker_SVP_innvilget, saker as standardSaker } from 'storybookData/saker/saker';
import { søkerinfo } from 'storybookData/sokerinfo/sokerinfo';
import { stønadskvoter1 } from 'storybookData/stønadskvoter/stønadskvoter1';
import {
    tidslinjeHendelserFP,
    tidslinjehendelser_ES_under_behandling,
    tidslinjehendelser_SVP_innvilget,
} from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.ts';
import { uttaksplan } from 'storybookData/uttaksplan/uttaksplan';

import { KontoBeregningResultatDto, Saker_fpoversikt, TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';
import type { MockScenario } from '@navikt/fp-utils-test/mock';
import { notEmpty } from '@navikt/fp-validation';

import { API_URLS, urlPrefiks } from '../src/api/queries.ts';

const saksnummerFra = (request: Request) => new URL(request.url).searchParams.get('saksnummer') ?? '';

export const lagHandlers = ({
    saker,
    tidslinjePerSak,
}: {
    saker: Saker_fpoversikt;
    tidslinjePerSak: Record<string, TidslinjeHendelseDto_fpoversikt[]>;
}): RequestHandler[] => [
    http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
    http.get(`${API_URLS.saker}/erOppdatert`, () => HttpResponse.json(true)),
    http.get(API_URLS.saker, () => HttpResponse.json(saker)),
    http.get(API_URLS.minidialog, () => HttpResponse.json(miniDialog)),
    http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
    http.post(API_URLS.uttaksplan, () => HttpResponse.json(uttaksplan)),
    http.get(API_URLS.tidslinje, ({ request }) => HttpResponse.json(tidslinjePerSak[saksnummerFra(request)] ?? [])),
    http.get(API_URLS.dokumenter, ({ request }) =>
        HttpResponse.json(dokumenter.filter((dokument) => dokument.saksnummer === saksnummerFra(request))),
    ),
    http.get(`${urlPrefiks}/fpoversikt/api/dokument`, () => HttpResponse.arrayBuffer(new ArrayBuffer(0))),
    http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
    http.post(API_URLS.konto, () => HttpResponse.json(stønadskvoter1 satisfies KontoBeregningResultatDto)),
    http.post(API_URLS.ettersend, () =>
        HttpResponse.json({
            saksNr: '123',
            jornalId: '123',
            leveranseStatus: 'SENDT_OG_FORSØKT_BEHANDLET_FPSAK',
            mottattDato: '2019-01-01',
            referanseId: '123',
        }),
    ),
    http.post(API_URLS.lastOppFPVedlegg, () => HttpResponse.json(crypto.randomUUID(), { status: 201 })),
    http.post(API_URLS.lastOppESVedlegg, () => HttpResponse.json(crypto.randomUUID(), { status: 201 })),
    http.post(API_URLS.lastOppSVPVedlegg, () => HttpResponse.json(crypto.randomUUID(), { status: 201 })),
    http.delete(`${API_URLS.lastOppFPVedlegg}/:id`, () => new HttpResponse(null, { status: 204 })),
    http.delete(`${API_URLS.lastOppESVedlegg}/:id`, () => new HttpResponse(null, { status: 204 })),
    http.delete(`${API_URLS.lastOppSVPVedlegg}/:id`, () => new HttpResponse(null, { status: 204 })),
];

const ingenSaker: Saker_fpoversikt = {
    foreldrepenger: [],
    engangsstønad: [],
    svangerskapspenger: [],
};

export const scenarioer = {
    standard: {
        beskrivelse: 'Viser en oversikt med foreldrepengesaker.',
        kjennetegn: 'Barn med termin 21.11.2024',
        handlers: lagHandlers({ saker: standardSaker, tidslinjePerSak: { '352011080': tidslinjeHendelserFP } }),
    },
    'ingen-saker': {
        beskrivelse: 'Viser oversikten uten saker.',
        kjennetegn: 'Du har ingen søknader om foreldrepenger, engangsstønad eller svangerskapspenger',
        handlers: lagHandlers({ saker: ingenSaker, tidslinjePerSak: {} }),
    },
    'engangsstonad-under-behandling': {
        beskrivelse: 'Viser en engangsstønadssak som er under behandling.',
        kjennetegn: 'Under behandling',
        handlers: lagHandlers({
            saker: saker_ES_under_behandling,
            tidslinjePerSak: {
                [notEmpty(saker_ES_under_behandling.engangsstønad[0]).saksnummer]:
                    tidslinjehendelser_ES_under_behandling,
            },
        }),
    },
    'svangerskapspenger-innvilget': {
        beskrivelse: 'Viser en innvilget sak om svangerskapspenger.',
        kjennetegn: 'Barn med termin 25.12.2025',
        handlers: lagHandlers({
            saker: saker_SVP_innvilget,
            tidslinjePerSak: {
                [notEmpty(saker_SVP_innvilget.svangerskapspenger[0]).saksnummer]: tidslinjehendelser_SVP_innvilget,
            },
        }),
    },
} satisfies Record<string, MockScenario>;

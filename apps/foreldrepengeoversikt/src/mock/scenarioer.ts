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

import { API_URLS, urlPrefiks } from '../api/queries.ts';
import scenarioMeta from './scenarioer.json' with { type: 'json' };

export const lagHandlers = ({
    saker,
    tidslinje,
}: {
    saker: Saker_fpoversikt;
    tidslinje: TidslinjeHendelseDto_fpoversikt[];
}): RequestHandler[] => [
    http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
    http.get(`${API_URLS.saker}/erOppdatert`, () => HttpResponse.json(true)),
    http.get(API_URLS.saker, () => HttpResponse.json(saker)),
    http.get(API_URLS.minidialog, () => HttpResponse.json(miniDialog)),
    http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
    http.post(API_URLS.uttaksplan, () => HttpResponse.json(uttaksplan)),
    http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinje)),
    http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)),
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
    standard: lagHandlers({ saker: standardSaker, tidslinje: tidslinjeHendelserFP }),
    'ingen-saker': lagHandlers({ saker: ingenSaker, tidslinje: [] }),
    'engangsstonad-under-behandling': lagHandlers({
        saker: saker_ES_under_behandling,
        tidslinje: tidslinjehendelser_ES_under_behandling,
    }),
    'svangerskapspenger-innvilget': lagHandlers({
        saker: saker_SVP_innvilget,
        tidslinje: tidslinjehendelser_SVP_innvilget,
    }),
} satisfies Record<keyof typeof scenarioMeta, RequestHandler[]>;

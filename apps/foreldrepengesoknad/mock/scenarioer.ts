import { HttpResponse, RequestHandler, http } from 'msw';
import { mellomlagretSøknad } from 'storybookData/mellomlagretSøknad';
import { saker } from 'storybookData/saker';
import { søkerinfo } from 'storybookData/søkerinfo';
import { uttaksplanMedMorSomAnnenPart } from 'storybookData/uttaksplan';

import {
    FellesUttaksplanDto,
    FellesUttaksplanRequest_fpoversikt,
    ForsendelseStatus,
    FpPersonopplysningerDto_fpoversikt,
    Saker_fpoversikt,
} from '@navikt/fp-types';
import { type MockScenario, fpgrunndataHandlers, mellomlagringHandlers } from '@navikt/fp-utils-test/mock';
import { notEmpty } from '@navikt/fp-validation';

import { API_URLS, urlPrefiks } from '../src/api/queries.ts';

const kvittering = {
    mottattDato: '2019-02-20T20:39:42.757',
    referanseId: 'bddfa0bb-e00c-4982-b0cc-4a09654803c2',
    leveranseStatus: 'GOSYS',
    journalId: '439775108',
};

export const lagHandlers = ({
    søkerinfo: personopplysninger,
    saker: søkersSaker,
    uttaksplan,
}: {
    søkerinfo: FpPersonopplysningerDto_fpoversikt;
    saker: Saker_fpoversikt;
    uttaksplan: FellesUttaksplanDto;
}): RequestHandler[] => [
    http.get(API_URLS.søkerInfo, () => HttpResponse.json(personopplysninger)),
    http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)),
    http.get(API_URLS.saker, () => HttpResponse.json(søkersSaker)),
    http.post(API_URLS.uttaksplan, async ({ request }) => {
        const { annenPartFødselsnummer } = (await request.json()) as FellesUttaksplanRequest_fpoversikt;
        return annenPartFødselsnummer ? HttpResponse.json(uttaksplan) : new HttpResponse(null, { status: 204 });
    }),
    http.post(API_URLS.trengerDokumentereMorsArbeid, () => HttpResponse.json(false)),
    http.get(API_URLS.status, () =>
        HttpResponse.json({
            status: 'ENDELIG',
            saksnummer: notEmpty(saker.foreldrepenger[0]).saksnummer,
        } satisfies ForsendelseStatus),
    ),
    http.post(API_URLS.sendSøknad, () => HttpResponse.json(kvittering)),
    http.post(API_URLS.endreSøknad, () => HttpResponse.json(kvittering)),
    http.post(API_URLS.sendVedlegg, () => HttpResponse.json(crypto.randomUUID(), { status: 201 })),
    http.delete(API_URLS.hentVedlegg(':uuid'), () => new HttpResponse(null, { status: 204 })),
    http.get(API_URLS.hentVedlegg(':uuid'), () => HttpResponse.arrayBuffer(new ArrayBuffer(0))),
];

const ingenSaker: Saker_fpoversikt = {
    foreldrepenger: [],
    engangsstønad: [],
    svangerskapspenger: [],
};

const sakerSomKanEndres: Saker_fpoversikt = {
    ...saker,
    foreldrepenger: saker.foreldrepenger.map((sak) => ({ ...sak, kanSøkeOmEndring: true })),
};

const lagScenario = (søkersSaker: Saker_fpoversikt, mellomlagretData?: unknown): RequestHandler[] => [
    ...lagHandlers({ søkerinfo, saker: søkersSaker, uttaksplan: uttaksplanMedMorSomAnnenPart }),
    ...mellomlagringHandlers(API_URLS.mellomlagring, mellomlagretData),
    ...fpgrunndataHandlers(urlPrefiks),
];

export const scenarioer = {
    standard: {
        beskrivelse: 'Starter en ny søknad uten mellomlagring og uten saker.',
        kjennetegn: 'Start søknaden',
        handlers: lagScenario(ingenSaker),
    },
    'fortsett-soknad': {
        beskrivelse: 'Fortsetter en mellomlagret søknad på steget om barnet.',
        kjennetegn: 'Er barnet født?',
        handlers: lagScenario(saker, mellomlagretSøknad),
    },
    endringssoknad: {
        beskrivelse: 'Søker har en sak som kan endres, slik at endringssøknad tilbys.',
        kjennetegn: 'Saksnummer 352011594',
        handlers: lagScenario(sakerSomKanEndres),
    },
} satisfies Record<string, MockScenario>;

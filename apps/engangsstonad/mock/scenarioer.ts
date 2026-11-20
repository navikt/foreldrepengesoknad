import { HttpResponse, type RequestHandler, http } from 'msw';

import { EsPersonopplysningerDto_fpoversikt, ForsendelseStatus } from '@navikt/fp-types';
import { type MockScenario, mellomlagringHandlers } from '@navikt/fp-utils-test/mock';

import { ContextDataType } from '../src/app-data/EsDataContext.tsx';
import { Path } from '../src/app-data/paths.ts';
import { API_URLS } from '../src/app-data/queries.ts';
import { EsMellomlagretData, VERSJON_MELLOMLAGRING } from '../src/app-data/useEsMellomlagring.ts';

const personinfo = {
    fnr: '11111111111',
    navn: {
        fornavn: 'Henrikke',
        etternavn: 'Ibsen',
    },
    kjønn: 'K',
    fødselsdato: '1979-01-28',
} satisfies EsPersonopplysningerDto_fpoversikt;

const kvittering = {
    mottattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941',
};

const fortsettSøknad = {
    version: VERSJON_MELLOMLAGRING,
    personinfo,
    [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
    },
    [ContextDataType.CURRENT_PATH]: Path.SØKERSITUASJON,
} satisfies EsMellomlagretData;

const lagHandlers = (startdata?: EsMellomlagretData): RequestHandler[] => [
    http.get(API_URLS.personInfo, () => HttpResponse.json(personinfo)),
    http.get(API_URLS.status, () =>
        HttpResponse.json({ status: 'ENDELIG', saksnummer: '352011079' } satisfies ForsendelseStatus),
    ),
    http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)),
    ...mellomlagringHandlers(API_URLS.mellomlagring, startdata),
    http.post(API_URLS.sendSøknad, () => HttpResponse.json(kvittering)),
    http.post(API_URLS.sendVedlegg, () => HttpResponse.json(crypto.randomUUID(), { status: 201 })),
    http.delete(`${API_URLS.sendVedlegg}/:uuid`, () => new HttpResponse(null, { status: 204 })),
    http.get(API_URLS.hentVedlegg(':uuid'), () => HttpResponse.arrayBuffer(new ArrayBuffer(0))),
];

export const scenarioer = {
    standard: {
        beskrivelse: 'Starter en ny søknad.',
        kjennetegn: 'Søknad om engangsstønad',
        handlers: lagHandlers(),
    },
    'fortsett-soknad': {
        beskrivelse: 'Fortsetter en mellomlagret søknad.',
        kjennetegn: 'Hva gjelder for deg?',
        handlers: lagHandlers(fortsettSøknad),
    },
} satisfies Record<string, MockScenario>;

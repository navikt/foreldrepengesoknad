import { HttpResponse, type RequestHandler, http } from 'msw';
import { ingenSaker } from 'storybookData/saker/saker';

import { ForsendelseStatus, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { type MockScenario, mellomlagringHandlers } from '@navikt/fp-utils-test/mock';

import { ContextDataType } from '../src/app-data/SvpDataContext.tsx';
import { API_URLS } from '../src/app-data/queries.ts';
import { SøknadRoute } from '../src/app-data/routes.ts';
import { SvpMellomlagretData, VERSJON_MELLOMLAGRING } from '../src/app-data/useMellomlagreSøknad.ts';
import kvittering from './data/kvittering.json' with { type: 'json' };
import søkerinfoData from './data/sokerinfo.json' with { type: 'json' };

const søkerinfo = {
    ...søkerinfoData,
    kjønn: 'K',
    frilansoppdrag: [],
    selvstendigNæring: [],
} satisfies SvpPersonopplysningerDto_fpoversikt;
const søkerinfoUtenArbeidsforhold = {
    ...søkerinfo,
    arbeidsforhold: [],
} satisfies SvpPersonopplysningerDto_fpoversikt;

const startdata = {
    version: VERSJON_MELLOMLAGRING,
    søkerInfo: søkerinfo,
    [ContextDataType.APP_ROUTE]: SøknadRoute.BARNET,
    [ContextDataType.OM_BARNET]: {
        erBarnetFødt: true,
        fødselsdato: '2024-11-01',
        termindato: '2024-11-02',
    },
} satisfies SvpMellomlagretData;

const lagHandlers = (
    personopplysninger: SvpPersonopplysningerDto_fpoversikt,
    mellomlagretStartdata?: SvpMellomlagretData,
): RequestHandler[] => [
    http.get(API_URLS.søkerInfo, () => HttpResponse.json(personopplysninger)),
    http.get(API_URLS.saker, () => HttpResponse.json(ingenSaker)),
    http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)),
    http.get(API_URLS.status, () =>
        HttpResponse.json({ status: 'ENDELIG', saksnummer: '352011080' } satisfies ForsendelseStatus),
    ),
    http.post(API_URLS.sendSøknad, () => HttpResponse.json(kvittering)),
    ...mellomlagringHandlers(API_URLS.mellomlagring, mellomlagretStartdata),
    http.post(API_URLS.sendVedlegg, () => HttpResponse.json(crypto.randomUUID(), { status: 201 })),
    http.delete(`${API_URLS.sendVedlegg}/:uuid`, () => new HttpResponse(null, { status: 204 })),
    http.get(`${API_URLS.sendVedlegg}/:uuid`, () => HttpResponse.arrayBuffer(new ArrayBuffer(0))),
];

export const scenarioer = {
    standard: {
        beskrivelse: 'Starter en ny søknad uten mellomlagrede data.',
        kjennetegn: 'Søknad om svangerskapspenger',
        handlers: lagHandlers(søkerinfo),
    },
    'fortsett-soknad': {
        beskrivelse: 'Fortsetter en søknad som allerede er mellomlagret.',
        kjennetegn: 'Er barnet født?',
        handlers: lagHandlers(søkerinfo, startdata),
    },
    'uten-arbeidsforhold': {
        beskrivelse: 'Viser søkerdata uten registrerte arbeidsforhold.',
        kjennetegn: 'Søknad om svangerskapspenger',
        handlers: lagHandlers(søkerinfoUtenArbeidsforhold),
    },
} satisfies Record<string, MockScenario>;

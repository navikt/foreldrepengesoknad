import { HttpResponse, type RequestHandler, http } from 'msw';
import { ingenSaker } from 'storybookData/saker/saker';

import { mellomlagringHandlers } from '@navikt/fp-config-vite/mockModus/mockHandlers.ts';
import { SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataType } from '../app-data/SvpDataContext.tsx';
import { API_URLS } from '../app-data/queries.ts';
import { SøknadRoute } from '../app-data/routes.ts';
import { SvpMellomlagretData, VERSJON_MELLOMLAGRING } from '../app-data/useMellomlagreSøknad.ts';
import kvittering from './data/kvittering.json' with { type: 'json' };
import søkerinfoData from './data/sokerinfo.json' with { type: 'json' };
import scenarioMeta from './scenarioer.json' with { type: 'json' };

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
    http.get(API_URLS.status, () => HttpResponse.json(kvittering)),
    http.post(API_URLS.sendSøknad, () => HttpResponse.json(kvittering)),
    ...mellomlagringHandlers(API_URLS.mellomlagring, mellomlagretStartdata),
    http.post(API_URLS.sendVedlegg, () => HttpResponse.json(crypto.randomUUID(), { status: 201 })),
    http.delete(`${API_URLS.sendVedlegg}/:uuid`, () => new HttpResponse(null, { status: 204 })),
    http.get(`${API_URLS.sendVedlegg}/:uuid`, () => HttpResponse.arrayBuffer(new ArrayBuffer(0))),
];

export const scenarioer = {
    standard: lagHandlers(søkerinfo),
    'fortsett-soknad': lagHandlers(søkerinfo, startdata),
    'uten-arbeidsforhold': lagHandlers(søkerinfoUtenArbeidsforhold),
} satisfies Record<keyof typeof scenarioMeta, RequestHandler[]>;

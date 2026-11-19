import { HttpResponse, RequestHandler, http } from 'msw';
import { mellomlagretSøknad } from 'storybookData/mellomlagretSøknad';
import { saker } from 'storybookData/saker';
import { søkerinfo, søkerinfoKvinne } from 'storybookData/søkerinfo';
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
    uttaksplan?: FellesUttaksplanDto;
}): RequestHandler[] => [
    http.get(API_URLS.søkerInfo, () => HttpResponse.json(personopplysninger)),
    http.get(API_URLS.erOppdatert, () => HttpResponse.json(true)),
    http.get(API_URLS.saker, () => HttpResponse.json(søkersSaker)),
    http.post(API_URLS.uttaksplan, async ({ request }) => {
        const { annenPartFødselsnummer } = (await request.json()) as FellesUttaksplanRequest_fpoversikt;
        return annenPartFødselsnummer && uttaksplan
            ? HttpResponse.json(uttaksplan)
            : new HttpResponse(null, { status: 204 });
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

const morsVedtak = { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' } as const;

const uttaksplanMorHarSøkt = {
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    perioder: [
        {
            fom: '2026-09-14',
            tom: '2026-10-02',
            annenPart: {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                resultat: morsVedtak,
                flerbarnsdager: false,
            },
        },
        {
            fom: '2026-10-05',
            tom: '2027-01-15',
            annenPart: { forelder: 'MOR', kontoType: 'MØDREKVOTE', resultat: morsVedtak, flerbarnsdager: false },
        },
        {
            fom: '2027-01-18',
            tom: '2027-03-12',
            annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE', resultat: morsVedtak, flerbarnsdager: false },
        },
    ],
} satisfies FellesUttaksplanDto;

const farMedBarnDerMorHarSøkt = {
    ...søkerinfo,
    barn: [
        {
            fnr: '1',
            navn: { fornavn: 'Oriental', etternavn: 'Bokhylle' },
            kjønn: 'K',
            fødselsdato: '2026-10-05',
            annenPart: {
                fnr: '12345678810',
                fødselsdato: '1993-04-12',
                navn: { fornavn: 'Vakker', etternavn: 'Bokhylle' },
            },
        },
    ],
} satisfies FpPersonopplysningerDto_fpoversikt;

const lagScenario = ({
    saker: søkersSaker,
    mellomlagretData,
    personopplysninger = søkerinfo,
    uttaksplan,
}: {
    saker: Saker_fpoversikt;
    mellomlagretData?: unknown;
    personopplysninger?: FpPersonopplysningerDto_fpoversikt;
    uttaksplan?: FellesUttaksplanDto;
}): RequestHandler[] => [
    ...lagHandlers({ søkerinfo: personopplysninger, saker: søkersSaker, uttaksplan }),
    ...mellomlagringHandlers(API_URLS.mellomlagring, mellomlagretData),
    ...fpgrunndataHandlers(urlPrefiks),
];

export const scenarioer = {
    standard: {
        beskrivelse: 'Mor starter en ny søknad uten mellomlagring og uten saker.',
        kjennetegn: 'Start søknaden',
        handlers: lagScenario({ saker: ingenSaker, personopplysninger: søkerinfoKvinne }),
    },
    far: {
        beskrivelse: 'Far starter en ny søknad uten mellomlagring og uten saker.',
        kjennetegn: 'Start søknaden',
        handlers: lagScenario({ saker: ingenSaker, uttaksplan: uttaksplanMedMorSomAnnenPart }),
    },
    'far-mor-har-sokt': {
        beskrivelse:
            'Far søker for et født barn der mor allerede har fått vedtak. Mors perioder hentes når far velger barnet.',
        kjennetegn: 'Oriental',
        handlers: lagScenario({
            saker: ingenSaker,
            personopplysninger: farMedBarnDerMorHarSøkt,
            uttaksplan: uttaksplanMorHarSøkt,
        }),
    },
    'fortsett-soknad': {
        beskrivelse: 'Fortsetter en mellomlagret søknad på steget om barnet.',
        kjennetegn: 'Er barnet født?',
        handlers: lagScenario({
            saker,
            mellomlagretData: mellomlagretSøknad,
            uttaksplan: uttaksplanMedMorSomAnnenPart,
        }),
    },
    endringssoknad: {
        beskrivelse: 'Søker har en sak som kan endres, slik at endringssøknad tilbys.',
        kjennetegn: 'Saksnummer 352011594',
        handlers: lagScenario({ saker: sakerSomKanEndres, uttaksplan: uttaksplanMedMorSomAnnenPart }),
    },
} satisfies Record<string, MockScenario>;

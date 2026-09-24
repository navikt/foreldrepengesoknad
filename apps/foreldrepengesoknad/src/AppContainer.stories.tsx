import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router';
import { annenPartVedtak } from 'storybookData/annenPartVedtak';
import { kvittering } from 'storybookData/kvittering';
import { saker } from 'storybookData/saker';
import { stønadskvoter } from 'storybookData/stønadskvoter';
import { uttaksplanMedFarSomAnnenPart, uttaksplanMedMorSomAnnenPart } from 'storybookData/uttaksplan';
import { VERSJON_MELLOMLAGRING } from 'utils/mellomlagringUtils';

import { BarnType } from '@navikt/fp-constants';
import { FellesUttaksplanRequest_fpoversikt, FpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { AppContainer } from './AppContainer';

const søkerinfo = {
    fnr: '06499121154',
    navn: {
        fornavn: 'Tapper',
        etternavn: 'Konvolutt',
    },
    kjønn: 'M',
    fødselsdato: '1991-09-06',
    barn: [],
    erGift: false,
    // Tom liste med hensikt: disse testene går "raskeste vei" gjennom søknaden og skal derfor
    // hoppe over Frilans- og EgenNæring-steget (som kun vises når brukeren har registrerte
    // frilansoppdrag/selvstendig næring).
    frilansoppdrag: [],
    selvstendigNæring: [],
    arbeidsforhold: [
        {
            arbeidsgiverId: '896929119',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SAUEFABRIKK',
            stillingsprosent: 100,
            fom: '2018-03-01',
        },
    ],
} satisfies FpPersonopplysningerDto_fpoversikt;

const søkerinfoKvinne = {
    ...søkerinfo,
    kjønn: 'K',
    navn: {
        fornavn: 'Modig',
        etternavn: 'Konvolutt',
    },
} satisfies FpPersonopplysningerDto_fpoversikt;

const meta = {
    component: AppContainer,

    beforeEach({ msw }) {
        msw.use(
            http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
            http.get(API_URLS.saker, () => HttpResponse.json(saker)),
            http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak)),
            http.post(API_URLS.uttaksplan, async ({ request }) => {
                const { annenPartFødselsnummer } = (await request.json()) as FellesUttaksplanRequest_fpoversikt;
                return annenPartFødselsnummer
                    ? HttpResponse.json(uttaksplanMedMorSomAnnenPart)
                    : new HttpResponse(null, { status: 204 });
            }),
            http.post(API_URLS.konto, () => HttpResponse.json({ 80: stønadskvoter, 100: stønadskvoter })),
            http.get(API_URLS.sendSøknad, () => HttpResponse.json(kvittering)),
            http.get(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 204 })),
            http.post(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
            http.post(API_URLS.sendSøknad, () => new HttpResponse(null, { status: 200 })),
            http.delete(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
            http.post(API_URLS.sendVedlegg, () => new HttpResponse(null, { status: 200 })),
        );
    },

    render: () => {
        return (
            <MemoryRouter>
                <AppContainer />
            </MemoryRouter>
        );
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const SøkerErMann: Story = {};

export const SøkerErKvinne: Story = {
    beforeEach({ msw }) {
        msw.use(
            http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfoKvinne)),
            http.get(API_URLS.saker, () => HttpResponse.json(saker)),
            http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak)),
            http.post(API_URLS.uttaksplan, async ({ request }) => {
                const { annenPartFødselsnummer } = (await request.json()) as FellesUttaksplanRequest_fpoversikt;
                return annenPartFødselsnummer
                    ? HttpResponse.json(uttaksplanMedFarSomAnnenPart)
                    : new HttpResponse(null, { status: 204 });
            }),
            http.post(API_URLS.konto, () => HttpResponse.json({ 80: stønadskvoter, 100: stønadskvoter })),
            http.get(API_URLS.sendSøknad, () => HttpResponse.json(kvittering)),
            http.get(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 204 })),
            http.post(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
            http.post(API_URLS.sendSøknad, () => new HttpResponse(null, { status: 200 })),
            http.delete(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
            http.post(API_URLS.sendVedlegg, () => new HttpResponse(null, { status: 200 })),
        );
    },
};

const mellomlagretSøknad = {
    version: VERSJON_MELLOMLAGRING,
    søkerInfo: søkerinfo,
    foreldrepengerSaker: saker.foreldrepenger,
    erEndringssøknad: false,
    søknadGjelderEtNyttBarn: true,
    APP_ROUTE: SøknadRoutes.OM_BARNET,
    SØKERSITUASJON: { situasjon: 'fødsel', rolle: 'far' },
    OM_BARNET: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: ['2025-05-05'],
        termindato: '2025-05-02',
    },
    ANNEN_FORELDER: { kanIkkeOppgis: true },
    ARBEIDSFORHOLD_OG_INNTEKT: {
        harJobbetSomFrilans: false,
        harJobbetSomSelvstendigNæringsdrivende: false,
    },
    UTENLANDSOPPHOLD: {
        harBoddUtenforNorgeSiste12Mnd: false,
        skalBoUtenforNorgeNeste12Mnd: false,
    },
    PERIODE_MED_FORELDREPENGER: '80',
    UTTAKSPLAN: [
        {
            fom: '2025-05-05',
            tom: '2025-05-16',
            søker: {
                kontoType: 'FORELDREPENGER',
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
        },
    ],
} satisfies FpMellomlagretData;

const mellomlagretEndringssøknad = {
    ...mellomlagretSøknad,
    erEndringssøknad: true,
    søknadGjelderEtNyttBarn: false,
    APP_ROUTE: SøknadRoutes.UTTAKSPLAN,
    VALGT_EKSISTERENDE_SAKSNR: notEmpty(saker.foreldrepenger[0]).saksnummer,
    OPPRINNELIG_UTTAKSPLAN: {
        saksnummer: notEmpty(saker.foreldrepenger[0]).saksnummer,
        perioder: mellomlagretSøknad.UTTAKSPLAN,
    },
} satisfies FpMellomlagretData;

export const MedMellomlagretSøknad: Story = {
    beforeEach({ msw }) {
        msw.use(http.get(API_URLS.mellomlagring, () => HttpResponse.json(mellomlagretSøknad)));
    },
};

export const MedMellomlagretEndringssøknad: Story = {
    beforeEach({ msw }) {
        msw.use(http.get(API_URLS.mellomlagring, () => HttpResponse.json(mellomlagretEndringssøknad)));
    },
};

export const MedUtdatertEndringssøknad: Story = {
    beforeEach({ msw }) {
        msw.use(
            http.get(API_URLS.mellomlagring, () =>
                HttpResponse.json({
                    ...mellomlagretEndringssøknad,
                    søkerInfo: { ...søkerinfo, erGift: true },
                }),
            ),
        );
    },
};

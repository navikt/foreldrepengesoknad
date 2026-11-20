import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router';
import { mellomlagretEndringssøknad, mellomlagretSøknad } from 'storybookData/mellomlagretSøknad';
import { saker } from 'storybookData/saker';
import { stønadskvoter } from 'storybookData/stønadskvoter';
import { søkerinfo, søkerinfoKvinne } from 'storybookData/søkerinfo';
import { uttaksplanMedFarSomAnnenPart, uttaksplanMedMorSomAnnenPart } from 'storybookData/uttaksplan';

import { FellesUttaksplanDto, FpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { lagHandlers } from '../mock/scenarioer.ts';
import { AppContainer } from './AppContainer';

const lagStoryHandlers = (personopplysninger: FpPersonopplysningerDto_fpoversikt, uttaksplan: FellesUttaksplanDto) => [
    http.post(API_URLS.konto, () => HttpResponse.json({ 80: stønadskvoter, 100: stønadskvoter })),
    http.get(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 204 })),
    http.post(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
    http.delete(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
    ...lagHandlers({ søkerinfo: personopplysninger, saker, uttaksplan }),
];

const meta = {
    component: AppContainer,

    beforeEach({ msw }) {
        msw.use(...lagStoryHandlers(søkerinfo, uttaksplanMedMorSomAnnenPart));
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
        msw.use(...lagStoryHandlers(søkerinfoKvinne, uttaksplanMedFarSomAnnenPart));
    },
};

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

const fellesUttaksplanUtenPerioder = {
    antallBarn: 1,
    dekningsgrad: 'ÅTTI',
    perioder: [],
} satisfies FellesUttaksplanDto;

// Gjenopptatt på «Den andre forelderen» med lagret felles uttaksplan. Når brukeren krysser av for at
// den andre forelderen ikke kan oppgis, hentes uttaksplanen på nytt med ny nøkkel. Bruk «Neste steg»
// for å sjekke at brukeren går videre og ikke sendes tilbake til steget søknaden ble gjenopptatt på.
export const MedMellomlagretSøknadPåAnnenForelder: Story = {
    beforeEach({ msw }) {
        msw.use(
            http.get(API_URLS.mellomlagring, () =>
                HttpResponse.json({
                    ...mellomlagretSøknad,
                    APP_ROUTE: SøknadRoutes.ANNEN_FORELDER,
                    ANNEN_FORELDER: {
                        kanIkkeOppgis: false,
                        fornavn: 'Malin',
                        etternavn: 'Utvikler',
                        fnr: '12345678910',
                        utenlandskFnr: false,
                        harRettPåForeldrepengerINorge: true,
                        erAleneOmOmsorg: false,
                        erInformertOmSøknaden: true,
                    },
                    UTTAKSPLAN: undefined,
                    fellesUttaksplan: fellesUttaksplanUtenPerioder,
                } satisfies FpMellomlagretData),
            ),
            http.post(API_URLS.uttaksplan, () => HttpResponse.json(fellesUttaksplanUtenPerioder)),
        );
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

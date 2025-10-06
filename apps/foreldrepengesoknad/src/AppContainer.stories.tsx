import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { annenPartVedtak } from 'storybookData/annenPartVedtak';
import { kvittering } from 'storybookData/kvittering';
import { saker } from 'storybookData/saker';
import { stønadskontoer } from 'storybookData/stønadskontoer';

import { Søkerinfo } from '@navikt/fp-types';

import { AppContainer } from './AppContainer';

const søkerinfo = {
    søker: {
        fnr: '06499121154',
        fornavn: 'Tapper',
        etternavn: 'Konvolutt',
        kjønn: 'M',
        fødselsdato: '1991-09-06',
        bankkonto: {
            kontonummer: '',
            banknavn: '',
        },
        barn: [],
    },
    arbeidsforhold: [
        {
            arbeidsgiverId: '896929119',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SAUEFABRIKK',
            stillingsprosent: 100,
            fom: '2018-03-01',
        },
    ],
} satisfies Søkerinfo;

const meta = {
    component: AppContainer,
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker)),
                http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak)),
                http.post(API_URLS.konto, () => HttpResponse.json({ 80: stønadskontoer, 100: stønadskontoer })),
                http.get(API_URLS.sendSøknad, () => HttpResponse.json(kvittering)),
                http.get(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.sendSøknad, () => new HttpResponse(null, { status: 200 })),
                http.delete(API_URLS.mellomlagring, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.sendVedlegg, () => new HttpResponse(null, { status: 200 })),
            ],
        },
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

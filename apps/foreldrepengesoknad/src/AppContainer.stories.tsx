import { Meta, StoryObj } from '@storybook/react-vite';
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
} as Søkerinfo;

const meta = {
    component: AppContainer,
    parameters: {
        msw: {
            handlers: [
                http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () => HttpResponse.json(søkerinfo)),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
                http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () =>
                    HttpResponse.json(annenPartVedtak),
                ),
                http.post(`${import.meta.env.BASE_URL}/rest/konto`, () =>
                    HttpResponse.json({ 80: stønadskontoer, 100: stønadskontoer }),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/storage/kvittering/foreldrepenger`, () =>
                    HttpResponse.json(kvittering),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/foreldrepenger`, () => HttpResponse.json(kvittering)),
                http.get(
                    `${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`,
                    () => new HttpResponse(null, { status: 200 }),
                ),
                http.post(
                    `${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`,
                    () => new HttpResponse(null, { status: 200 }),
                ),
                http.post(`${import.meta.env.BASE_URL}/rest/soknad`, () => new HttpResponse(null, { status: 200 })),
                http.delete(
                    `${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`,
                    () => new HttpResponse(null, { status: 200 }),
                ),
                http.post(
                    `${import.meta.env.BASE_URL}/rest/storage/foreldrepenger/vedlegg`,
                    () => new HttpResponse(null, { status: 200 }),
                ),
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

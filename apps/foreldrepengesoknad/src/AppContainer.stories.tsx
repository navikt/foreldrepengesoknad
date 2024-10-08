import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, http } from 'msw';
import annenPartVedtak from 'storybookData/annenPartVedtak/annenPartVedtak.json';
import storageKvittering from 'storybookData/kvittering/storage_kvittering.json';
import saker from 'storybookData/saker/saker.json';
import stønadskontoer from 'storybookData/stonadskontoer/stønadskontoer.json';

import '@navikt/ds-css';

import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo } from '@navikt/fp-types';

import AppContainer from './AppContainer';

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
                http.get('https://fp/rest/sokerinfo', () => HttpResponse.json(søkerinfo)),
                http.get('https://fp/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
                http.get('https://fp/rest/innsyn/v2/annenPartVedtak', () => HttpResponse.json(annenPartVedtak)),
                http.get('https://fp/rest/konto', () => HttpResponse.json(stønadskontoer)),
                http.get('https://fp/rest/storage/kvittering/foreldrepenger', () =>
                    HttpResponse.json(storageKvittering),
                ),
                http.get('https://fp/rest/foreldrepenger', () => HttpResponse.json(storageKvittering)),
                http.post('https://fp/rest/innsyn/v2/annenPartVedtak', () => new HttpResponse(null, { status: 200 })),
                http.post('https://fp/rest/storage/foreldrepenger', () => new HttpResponse(null, { status: 200 })),
                http.post('https://fp/rest/soknad', () => new HttpResponse(null, { status: 200 })),
                http.delete('https://fp/rest/storage/foreldrepenger', () => new HttpResponse(null, { status: 200 })),
            ],
        },
    },
    render: () => {
        initAmplitude();
        return <AppContainer />;
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const SøkerErMann: Story = {};

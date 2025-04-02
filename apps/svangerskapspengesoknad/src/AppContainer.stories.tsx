import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { Søkerinfo } from '@navikt/fp-types';

import { AppContainer } from './AppContainer';

const defaultSøkerinfo = {
    søker: {
        fnr: '30088930610',
        fornavn: 'ERLINGA-MASK',
        etternavn: 'ORAVAKANGAS',
        kjønn: 'K',
        fødselsdato: '1989-08-30',
        barn: [],
        bankkonto: {
            kontonummer: '10824223373',
            banknavn: 'Din Bank',
        },
    },
    arbeidsforhold: [
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD',
            stillingsprosent: 32.63,
            fom: '2014-05-22',
            tom: '2019-05-31',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD',
            stillingsprosent: 0,
            fom: '2018-04-09',
            tom: '2018-09-09',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD',
            stillingsprosent: 80,
            fom: '2018-06-25',
            tom: '2018-08-05',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD',
            stillingsprosent: 85.09,
            fom: '2019-06-01',
        },
        {
            arbeidsgiverId: '990322244',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'OMSORGSPARTNER VESTFOLD',
            stillingsprosent: 100,
            fom: '2017-04-05',
        },
        {
            arbeidsgiverId: '995090910',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'RE KOMMUNE',
            stillingsprosent: 0,
            fom: '2018-06-01',
        },
    ],
} satisfies Søkerinfo;

const KVITTERING = {
    mottattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941',
};

const HANDLERS = [
    http.post(`${import.meta.env.BASE_URL}/rest/soknad/svangerskapspenger`, () => HttpResponse.json(KVITTERING)),
    http.post(
        `${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger/vedlegg`,
        () => new HttpResponse(null, { status: 200 }),
    ),
    http.post(
        `${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`,
        () => new HttpResponse(null, { status: 200 }),
    ),
    http.get(
        `${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`,
        () => new HttpResponse(null, { status: 200 }),
    ),
    http.delete(
        `${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`,
        () => new HttpResponse(null, { status: 200 }),
    ),
];

const meta = {
    component: AppContainer,
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

export const VisAppKvinneMedArbeid: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () => HttpResponse.json(defaultSøkerinfo)),
            ]),
        },
    },
};

export const VisAppKvinneUtenArbeid: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () =>
                    HttpResponse.json({
                        ...defaultSøkerinfo,
                        arbeidsforhold: [],
                    }),
                ),
            ]),
        },
    },
};

export const VisAppMann: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () =>
                    HttpResponse.json({
                        ...defaultSøkerinfo,
                        søker: { ...defaultSøkerinfo.søker, kjønn: 'M' },
                    }),
                ),
            ]),
        },
    },
};

export const VisAppUmyndig: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () =>
                    HttpResponse.json({
                        ...defaultSøkerinfo,
                        søker: { ...defaultSøkerinfo.søker, kjønn: 'K', fødselsdato: '2023-08-30' },
                    }),
                ),
            ]),
        },
    },
};

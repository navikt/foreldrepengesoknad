import { Meta, StoryObj } from '@storybook/react';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { VERSJON_MELLOMLAGRING } from 'appData/useEsMellomlagring';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { AppContainer } from './AppContainer';

const KVITTERING = {
    mottattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941',
};

const DEFAULT_PERSONINFO = {
    fnr: '11111111111',
    fornavn: 'Henrikke',
    etternavn: 'Ibsen',
    kjønn: 'K',
    fødselsdato: '1979-01-28',
    bankkonto: {
        kontonummer: '49875234987',
        banknavn: 'Storebank',
    },
    barn: [],
};

const HANDLERS = [
    http.post(`${import.meta.env.BASE_URL}/rest/soknad/engangsstonad`, () => HttpResponse.json(KVITTERING)),
    http.post(`${import.meta.env.BASE_URL}/rest/storage/engangsstonad`, () => new HttpResponse(null, { status: 200 })),
    http.delete(
        `${import.meta.env.BASE_URL}/rest/storage/engangsstonad`,
        () => new HttpResponse(null, { status: 200 }),
    ),
    http.post(
        `${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg`,
        () => new HttpResponse(null, { status: 200 }),
    ),
];

const meta = {
    title: 'Applikasjon - Engangsstønad (AppContainer)',
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

export const SøkerErKvinne: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/personinfo`, () => HttpResponse.json(DEFAULT_PERSONINFO)),
                http.get(
                    `${import.meta.env.BASE_URL}/rest/storage/engangsstonad`,
                    () => new HttpResponse(null, { status: 200 }),
                ),
            ]),
        },
    },
};

export const SøkerErKvinneMedMellomlagretData: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/personinfo`, () => HttpResponse.json(DEFAULT_PERSONINFO)),
                http.get(`${import.meta.env.BASE_URL}/rest/storage/engangsstonad`, () =>
                    HttpResponse.json({
                        version: VERSJON_MELLOMLAGRING,
                        locale: 'nb',
                        [ContextDataType.SØKERSITUASJON]: {
                            situasjon: 'fødsel',
                        },
                        [ContextDataType.CURRENT_PATH]: Path.SØKERSITUASJON,
                    }),
                ),
            ]),
        },
    },
};

export const SøkerErMann: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/personinfo`, () =>
                    HttpResponse.json({
                        fnr: '1231111111',
                        fornavn: 'Espen',
                        etternavn: 'Utvikler',
                        kjønn: 'M',
                        fødselsdato: '1979-01-28',
                        bankkonto: {
                            kontonummer: '49875234987',
                            banknavn: 'Storebank',
                        },
                        barn: [],
                    }),
                ),
                http.get(
                    `${import.meta.env.BASE_URL}/rest/storage/engangsstonad`,
                    () => new HttpResponse(null, { status: 200 }),
                ),
            ]),
        },
    },
};

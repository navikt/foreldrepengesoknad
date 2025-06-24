import { Meta, StoryObj } from '@storybook/react-vite';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { VERSJON_MELLOMLAGRING } from 'appData/useEsMellomlagring';
import dayjs from 'dayjs';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { expect, fireEvent, within } from 'storybook/test';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

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
    play: async ({ canvasElement, userEvent }) => {
        const canvas = within(canvasElement);
        expect(await canvas.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        await userEvent.click(canvas.getByText('Ja, jeg har forstått mine plikter.'));
        await userEvent.click(canvas.getByText('Start søknaden'));

        expect(await canvas.findAllByText('Din situasjon')).toHaveLength(2);
        expect(canvas.getByText('Steg 1 av 4')).toBeInTheDocument();
        await userEvent.click(canvas.getByText('Fødsel'));
        await userEvent.click(canvas.getByText('Neste steg'));

        expect(await canvas.findByText('Steg 2 av 4')).toBeInTheDocument();
        expect(canvas.getAllByText('Barnet')).toHaveLength(2);
        await userEvent.click(canvas.getByText('Ja'));
        const fødselsdato = canvas.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        await fireEvent.blur(fødselsdato);
        const termindato = canvas.getByLabelText('Termindato');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        await fireEvent.blur(termindato);
        await userEvent.click(canvas.getByText('Ett barn'));
        await userEvent.click(canvas.getByText('Neste steg'));

        expect(await canvas.findByText('Steg 3 av 4')).toBeInTheDocument();
        expect(canvas.getAllByText('Bo i utlandet')).toHaveLength(2);

        await userEvent.click(canvas.getByText('Jeg har bodd i Norge'));
        await userEvent.click(canvas.getByText('Jeg skal bo i Norge'));
        await userEvent.click(canvas.getByText('Neste steg'));

        expect(await canvas.findByText('Søknaden gjelder')).toBeInTheDocument();
        expect(canvas.getAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(
            canvas.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(canvas.getByText('Forrige steg'));
        expect(canvas.getAllByText('Bo i utlandet')).toHaveLength(2);

        await userEvent.click(canvas.getByText('Forrige steg'));
        expect(canvas.getAllByText('Barnet')).toHaveLength(2);

        await userEvent.click(canvas.getByText('Forrige steg'));
        expect(canvas.getAllByText('Din situasjon')).toHaveLength(2);

        await userEvent.click(canvas.getByText('Forrige steg'));
        expect(canvas.getByText('Ja, jeg har forstått mine plikter.')).toBeInTheDocument();
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

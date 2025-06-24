import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import dayjs from 'dayjs';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { expect, fireEvent, fn, within } from 'storybook/test';
import { OmBarnet } from 'types/OmBarnet';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { DokumentasjonSteg } from './DokumentasjonSteg';

const promiseAction = () => (): Promise<void> => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    omBarnet: OmBarnet;
    path: Path;
} & ComponentProps<typeof DokumentasjonSteg>;

const meta = {
    title: 'steg/DokumentasjonSteg',
    component: DokumentasjonSteg,
    render: ({ gåTilNesteSide = action('button-click'), mellomlagreOgNaviger, omBarnet, path }) => {
        return (
            <MemoryRouter initialEntries={[path]}>
                <EsDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.OM_BARNET]: omBarnet,
                    }}
                >
                    <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Terminbekreftelse: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    `${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg`,
                    () => new HttpResponse('uuid-test', { status: 200, headers: { location: 'test.com' } }),
                ),
            ],
        },
    },
    args: {
        path: Path.TERMINBEKREFTELSE,
        omBarnet: {
            erBarnetFødt: false,
            antallBarn: 1,
            termindato: '2023-10-06',
        },
        mellomlagreOgNaviger: fn(),
        gåTilNesteSide: fn(),
    },
    play: async ({ args, canvasElement, userEvent }) => {
        const canvas = within(canvasElement);

        expect(await canvas.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(canvas.getAllByText('Bekreft termin')).toHaveLength(2);
        expect(canvas.getByText('Steg 3 av 5')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(canvas.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(canvas.getAllByText('Du må oppgi terminbekreftelse dato')).toHaveLength(2);

        const terminbekreftelse = canvas.getByLabelText('Når fikk du terminbekreftelsen?');
        await userEvent.type(terminbekreftelse, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(terminbekreftelse);

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(canvas.getByText('Du må laste opp bekreftelse på termindato')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = canvas.getByLabelText('Last opp bekreftelse på termindato');

        await userEvent.upload(fileInput, file);

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                terminbekreftelsedato: dayjs().format(ISO_DATE_FORMAT),
                vedlegg: [
                    expect.objectContaining({
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: 'I000141',
                        type: 'terminbekreftelse',
                        uploaded: true,
                        url: 'test.com',
                        uuid: 'uuid-test',
                    }),
                ],
            },
            key: ContextDataType.DOKUMENTASJON,
            type: 'update',
        });

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.UTENLANDSOPPHOLD,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(args.mellomlagreOgNaviger).toHaveBeenCalledOnce();
    },
};

export const Adopsjonsbekreftelse: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    `${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg`,
                    () => new HttpResponse('uuid-test', { status: 200, headers: { location: 'test.com' } }),
                ),
            ],
        },
    },
    args: {
        path: Path.ADOPSJONSBEKREFTELSE,
        omBarnet: {
            adopsjonAvEktefellesBarn: true,
            adopsjonsdato: '2020-01-01',
            antallBarn: 1,
            fødselsdatoer: [{ dato: '2020-01-01' }],
        },
        mellomlagreOgNaviger: fn(),
        gåTilNesteSide: fn(),
    },
    play: async ({ args, canvasElement, userEvent }) => {
        const canvas = within(canvasElement);

        expect(await canvas.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(canvas.getAllByText('Bekreft adopsjon')).toHaveLength(2);
        expect(canvas.getByText('Steg 3 av 5')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Neste steg'));

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(canvas.getByText('Du må laste opp bekreftelse på adopsjon')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = canvas.getByLabelText('Bekreftelse på adopsjon');
        await userEvent.upload(fileInput, file);

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                vedlegg: [
                    expect.objectContaining({
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: 'I000042',
                        type: 'omsorgsovertakelse',
                        uploaded: true,
                        url: 'test.com',
                        uuid: 'uuid-test',
                    }),
                ],
            },
            key: 'DOKUMENTASJON',
            type: 'update',
        });

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.UTENLANDSOPPHOLD,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(args.mellomlagreOgNaviger).toHaveBeenCalledOnce();
    },
};

export const FeilerOpplastinger: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    `${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg`,
                    () => new HttpResponse(null, { status: 400 }),
                ),
            ],
        },
    },
    args: {
        path: Path.ADOPSJONSBEKREFTELSE,
        omBarnet: {
            adopsjonAvEktefellesBarn: true,
            adopsjonsdato: '2020-01-01',
            antallBarn: 1,
            fødselsdatoer: [{ dato: '2020-01-01' }],
        },
        mellomlagreOgNaviger: promiseAction(),
    },
};

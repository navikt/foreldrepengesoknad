import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect, fireEvent, fn, within } from 'storybook/test';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { Situasjon } from '@navikt/fp-types';

import { OmBarnetSteg } from './OmBarnetSteg';

type StoryArgs = {
    søkersituasjon: Situasjon;
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof OmBarnetSteg>;

const meta = {
    title: 'steg/OmBarnetSteg',
    component: OmBarnetSteg,
    render: ({ søkersituasjon, kjønn, gåTilNesteSide, mellomlagreOgNaviger }) => {
        return (
            <MemoryRouter initialEntries={[Path.OM_BARNET]}>
                <EsDataContext
                    initialState={{ [ContextDataType.SØKERSITUASJON]: { situasjon: søkersituasjon } }}
                    onDispatch={gåTilNesteSide}
                >
                    <OmBarnetSteg kjønn={kjønn} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const VisSideForAdopsjonKvinne: Story = {
    args: {
        søkersituasjon: 'adopsjon',
        kjønn: 'K',
        gåTilNesteSide: fn(),
        mellomlagreOgNaviger: fn(),
    },
    play: async ({ args, canvasElement, userEvent }) => {
        const canvas = within(canvasElement);

        expect(await canvas.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(canvas.getAllByText('Barnet')).toHaveLength(2);
        expect(canvas.getByText('Steg 2 av 4')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(canvas.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(canvas.getAllByText('Du må oppgi om du adopterer ektefelles barn')).toHaveLength(2);
        expect(canvas.getAllByText('Du må oppgi dato for omsorgsovertakelsen')).toHaveLength(2);
        expect(canvas.getAllByText('Du må oppgi antall barn du skal adoptere')).toHaveLength(2);

        await userEvent.click(canvas.getByText('Ja'));

        const adopsjonsdato = canvas.getByLabelText('Fra hvilken dato adopterer du din ektefelles barn?');
        await userEvent.type(adopsjonsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(adopsjonsdato);

        await userEvent.click(canvas.getByText('Ett barn'));

        const fødselsdato = canvas.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                adopsjonAvEktefellesBarn: true,
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                antallBarn: 1,
                fødselsdatoer: [
                    {
                        dato: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
                    },
                ],
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.ADOPSJONSBEKREFTELSE,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(args.mellomlagreOgNaviger).toHaveBeenCalledOnce();
    },
};

export const VisSideForAdopsjonMann: Story = {
    args: {
        søkersituasjon: 'adopsjon',
        kjønn: 'M',
        gåTilNesteSide: fn(),
        mellomlagreOgNaviger: fn(),
    },
    play: async ({ args, canvasElement, userEvent }) => {
        const canvas = within(canvasElement);

        expect(await canvas.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(canvas.getAllByText('Barnet')).toHaveLength(2);
        expect(canvas.getByText('Steg 2 av 4')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Nei'));

        const adopsjonsdato = canvas.getByLabelText('Når overtar du omsorgen?');
        await userEvent.type(adopsjonsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(adopsjonsdato);

        await userEvent.click(canvas.getByText('Ett barn'));

        const fødselsdato = canvas.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(canvas.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(canvas.getAllByText('Du må oppgi om du adopterer alene')).toHaveLength(2);

        await userEvent.click(canvas.getAllByText('Ja')[1]);

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                adopsjonAvEktefellesBarn: false,
                adopsjonsdato: dayjs().format(ISO_DATE_FORMAT),
                antallBarn: 1,
                fødselsdatoer: [
                    {
                        dato: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
                    },
                ],
                søkerAdopsjonAlene: true,
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.ADOPSJONSBEKREFTELSE,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(args.mellomlagreOgNaviger).toHaveBeenCalledOnce();
    },
};

export const VisSideForFodsel: Story = {
    args: {
        søkersituasjon: 'fødsel',
        kjønn: 'K',
        gåTilNesteSide: fn(),
        mellomlagreOgNaviger: fn(),
    },
    play: async ({ args, canvasElement, userEvent }) => {
        const canvas = within(canvasElement);

        expect(await canvas.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(await canvas.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(canvas.getAllByText('Du må oppgi om barnet er født')).toHaveLength(2);
        expect(canvas.getAllByText('Du må oppgi termindato')).toHaveLength(2);
        expect(canvas.getAllByText('Du må oppgi hvor mange barn du venter')).toHaveLength(2);

        await userEvent.click(canvas.getByText('Ja'));

        const fødselsdato = canvas.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);

        const termindato = canvas.getByLabelText('Termindato');
        await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);

        await userEvent.click(canvas.getByText('Ett barn'));

        await userEvent.click(canvas.getByText('Neste steg'));

        expect(args.gåTilNesteSide).toHaveBeenCalledTimes(3);
        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                erBarnetFødt: true,
                antallBarn: 1,
                fødselsdato: dayjs().format(ISO_DATE_FORMAT),
                termindato: dayjs().format(ISO_DATE_FORMAT),
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.DOKUMENTASJON,
            type: 'update',
        });

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: Path.UTENLANDSOPPHOLD,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(args.mellomlagreOgNaviger).toHaveBeenCalledOnce();
    },
};

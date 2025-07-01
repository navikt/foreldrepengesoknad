import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect, fn, within } from 'storybook/test';

import { Velkommen } from './Velkommen';

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof Velkommen>;

const meta = {
    component: Velkommen,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[Path.VELKOMMEN]}>
                <EsDataContext onDispatch={props.gåTilNesteSide}>
                    <Velkommen {...props} />
                </EsDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        startSøknad: fn(),
        mellomlagreOgNaviger: fn(),
        gåTilNesteSide: fn(),
        erVelkommen: false,
    },
    play: async ({ args, canvasElement, userEvent }) => {
        const canvas = within(canvasElement);

        expect(await canvas.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Start søknaden'));

        expect(canvas.getByText('Du må bekrefte at du har lest og forstått')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Ja, jeg har forstått mine plikter.'));

        await userEvent.click(canvas.getByText('Start søknaden'));

        expect(args.startSøknad).toHaveBeenCalledTimes(1);
        expect(args.startSøknad).toHaveBeenNthCalledWith(1, true);

        expect(args.gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: Path.SØKERSITUASJON,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(args.mellomlagreOgNaviger).toHaveBeenCalledOnce();
    },
};

import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { Velkommen } from './Velkommen';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof Velkommen>;

const meta = {
    component: Velkommen,
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        return (
            <MemoryRouter initialEntries={[Path.VELKOMMEN]}>
                <EsDataContext onDispatch={gåTilNesteSide}>
                    <Velkommen {...rest} />
                </EsDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        startSøknad: action('button-click'),
        mellomlagreOgNaviger: promiseAction(),
        erVelkommen: false,
    },
};

import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { SøkersituasjonSteg } from './SøkersituasjonSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof SøkersituasjonSteg>;

const meta = {
    title: 'steg/SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    render: ({ gåTilNesteSide, mellomlagreOgNaviger }) => {
        return (
            <MemoryRouter initialEntries={[Path.SØKERSITUASJON]}>
                <EsDataContext onDispatch={gåTilNesteSide}>
                    <SøkersituasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        gåTilNesteSide: action('button-click'),
        mellomlagreOgNaviger: promiseAction(),
    },
};

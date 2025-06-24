import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { SenereUtenlandsoppholdSteg } from './SenereUtenlandsoppholdSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: true,
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof SenereUtenlandsoppholdSteg>;

const meta = {
    title: 'steg/SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
    render: ({ gåTilNesteSide = action('button-click'), mellomlagreOgNaviger }) => {
        return (
            <MemoryRouter initialEntries={[Path.SENERE_UTENLANDSOPPHOLD]}>
                <EsDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    }}
                >
                    <SenereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        mellomlagreOgNaviger: promiseAction(),
    },
};

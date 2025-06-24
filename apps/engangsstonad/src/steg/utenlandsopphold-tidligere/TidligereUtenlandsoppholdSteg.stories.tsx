import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { TidligereUtenlandsoppholdSteg } from './TidligereUtenlandsoppholdSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: true,
    skalBoUtenforNorgeNeste12Mnd: false,
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof TidligereUtenlandsoppholdSteg>;

const meta = {
    title: 'steg/TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
    render: ({ gåTilNesteSide = action('button-click'), mellomlagreOgNaviger }) => {
        return (
            <MemoryRouter initialEntries={[Path.TIDLIGERE_UTENLANDSOPPHOLD]}>
                <EsDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    }}
                >
                    <TidligereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
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

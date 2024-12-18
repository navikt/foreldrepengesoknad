import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { UtenlandsoppholdSteg } from './UtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof UtenlandsoppholdSteg>;

const meta = {
    title: 'steg/UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
    render: ({ gåTilNesteSide = action('button-click'), mellomlagreOgNaviger }) => {
        return (
            <MemoryRouter initialEntries={[Path.UTENLANDSOPPHOLD]}>
                <EsDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel' },
                    }}
                >
                    <UtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
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

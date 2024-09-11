import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
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
        initAmplitude();
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

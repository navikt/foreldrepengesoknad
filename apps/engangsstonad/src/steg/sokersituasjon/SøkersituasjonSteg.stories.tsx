import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import { SøkersituasjonSteg } from './SøkersituasjonSteg';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof SøkersituasjonSteg>;

const meta = {
    title: 'steg/SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    render: ({ gåTilNesteSide, mellomlagreOgNaviger }) => {
        initAmplitude();
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

import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { Situasjon } from '@navikt/fp-types';

import { OmBarnetSteg } from './OmBarnetSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

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
        gåTilNesteSide: action('button-click'),
        mellomlagreOgNaviger: promiseAction(),
    },
};

export const VisSideForAdopsjonMann: Story = {
    args: {
        søkersituasjon: 'adopsjon',
        kjønn: 'M',
        gåTilNesteSide: action('button-click'),
        mellomlagreOgNaviger: promiseAction(),
    },
};

export const VisSideForFodsel: Story = {
    args: {
        søkersituasjon: 'fødsel',
        kjønn: 'K',
        gåTilNesteSide: action('button-click'),
        mellomlagreOgNaviger: promiseAction(),
    },
};

import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';
import { Dokumentasjon } from 'types/Dokumentasjon';

import { BarnDto, Søkersituasjon } from '@navikt/fp-types';

import { SøkersituasjonSteg } from './SøkersituasjonSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    søkersituasjon?: Søkersituasjon;
    omBarnet?: BarnDto;
    dokumentasjon?: Dokumentasjon;
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof SøkersituasjonSteg>;

const meta = {
    title: 'steg/SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    render: ({ søkersituasjon, omBarnet, dokumentasjon, gåTilNesteSide, mellomlagreOgNaviger }) => {
        return (
            <MemoryRouter initialEntries={[Path.SØKERSITUASJON]}>
                <EsDataContext
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                        [ContextDataType.OM_BARNET]: omBarnet,
                        [ContextDataType.DOKUMENTASJON]: dokumentasjon,
                    }}
                    onDispatch={gåTilNesteSide}
                >
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

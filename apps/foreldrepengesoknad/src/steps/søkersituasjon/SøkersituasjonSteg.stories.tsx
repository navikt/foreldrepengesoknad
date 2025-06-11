import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { SøkersituasjonFp } from '@navikt/fp-types';

import { SøkersituasjonSteg } from './SøkersituasjonSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    søkersituasjon?: SøkersituasjonFp;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof SøkersituasjonSteg>;

const meta = {
    title: 'steps/SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    render: ({ søkersituasjon, gåTilNesteSide = action('button-click'), ...rest }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.SØKERSITUASJON]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                    }}
                >
                    <SøkersituasjonSteg {...rest} />
                </FpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Mor: Story = {
    args: {
        kjønn: 'K',
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const Far: Story = {
    args: {
        ...Mor.args,
        kjønn: 'M',
    },
};

export const HarMellomlagretData: Story = {
    args: {
        ...Mor.args,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
    },
};

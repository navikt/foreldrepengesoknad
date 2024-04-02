import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';
import { SøkersituasjonFp } from '@navikt/fp-types';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import SøkersituasjonSteg from './SøkersituasjonSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    søkersituasjon?: SøkersituasjonFp;
    gåTilNesteSide: (action: Action) => void;
} & ComponentProps<typeof SøkersituasjonSteg>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({
    kjønn,
    søkersituasjon,
    mellomlagreSøknadOgNaviger = promiseAction(),
    avbrytSøknad = action('button-click'),
    gåTilNesteSide,
    arbeidsforhold = [],
}: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.SØKERSITUASJON]}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                }}
            >
                <SøkersituasjonSteg
                    arbeidsforhold={arbeidsforhold}
                    kjønn={kjønn}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={avbrytSøknad}
                />
            </FpDataContext>
        </MemoryRouter>
    );
};

const meta = {
    title: 'steps/SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

export const Mor: Story = {
    args: {
        kjønn: 'K',
    },
};

export const Far: Story = {
    args: {
        kjønn: 'M',
    },
};

export const HarMellomlagretData: Story = {
    args: {
        kjønn: 'K',
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
    },
};

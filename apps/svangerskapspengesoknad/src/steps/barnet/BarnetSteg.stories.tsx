import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { Skjemautkast } from '@navikt/fp-form-hooks';

import { BarnetSteg } from './BarnetSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    skjemautkast?: Skjemautkast;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof BarnetSteg>;

const meta = {
    title: 'steps/BarnetSteg',
    component: BarnetSteg,
    render: ({ gåTilNesteSide = action('button-click'), skjemautkast, ...rest }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoute.BARNET]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{ [ContextDataType.SKJEMAUTKAST]: skjemautkast }}
                >
                    <BarnetSteg {...rest} />
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        arbeidsforhold: [],
        harRegistrertNæring: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: () => action('button-click'),
    },
};

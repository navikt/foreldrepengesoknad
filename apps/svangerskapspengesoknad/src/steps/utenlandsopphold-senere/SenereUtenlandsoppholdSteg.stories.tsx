import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { Utenlandsopphold } from '@navikt/fp-types';

import { SenereUtenlandsoppholdSteg } from './SenereUtenlandsoppholdSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

const defaultUtenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: true,
} as Utenlandsopphold;

type StoryArgs = {
    utenlandsforhold?: Utenlandsopphold;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof SenereUtenlandsoppholdSteg>;

const meta = {
    title: 'steps/SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
    render: ({ gåTilNesteSide = action('button-click'), utenlandsforhold = defaultUtenlandsopphold, ...rest }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoute.SKAL_BO_I_UTLANDET]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold,
                    }}
                >
                    <SenereUtenlandsoppholdSteg {...rest} />
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
        arbeidsforhold: [],
    },
};

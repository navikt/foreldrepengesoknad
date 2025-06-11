import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { Utenlandsopphold } from '@navikt/fp-types';

import { SenereUtenlandsoppholdSteg } from './SenereUtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultUtenlandsopphold = {
    skalBoUtenforNorgeNeste12Mnd: true,
    harBoddUtenforNorgeSiste12Mnd: false,
};

type StoryArgs = {
    utenlandsopphold?: Utenlandsopphold;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof SenereUtenlandsoppholdSteg>;

const meta = {
    title: 'steps/SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
    parameters: {
        msw: {
            handlers: [
                http.post(
                    `${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`,
                    () => new HttpResponse(null, { status: 200 }),
                ),
            ],
        },
    },
    render: ({ gåTilNesteSide = action('button-click'), utenlandsopphold = defaultUtenlandsopphold, ...rest }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.SENERE_UTENLANDSOPPHOLD]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    }}
                >
                    <SenereUtenlandsoppholdSteg {...rest} />
                </FpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';
import { Utenlandsopphold } from '@navikt/fp-types';

import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultUtenlandsopphold = {
    skalBoUtenforNorgeNeste12Mnd: false,
    harBoddUtenforNorgeSiste12Mnd: true,
};

type StoryArgs = {
    utenlandsopphold?: Utenlandsopphold;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof TidligereUtenlandsoppholdSteg>;

const meta = {
    title: 'steps/TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
    parameters: {
        msw: {
            handlers: [
                http.post('https://fp/rest/storage/foreldrepenger', () => new HttpResponse(null, { status: 200 })),
            ],
        },
    },
    render: ({ gåTilNesteSide = action('button-click'), utenlandsopphold = defaultUtenlandsopphold, ...rest }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    }}
                >
                    <TidligereUtenlandsoppholdSteg {...rest} />
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

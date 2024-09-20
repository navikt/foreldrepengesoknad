import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import MockAdapter from 'axios-mock-adapter/types';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';
import { Utenlandsopphold } from '@navikt/fp-types';

import AxiosMock from '../../__mocks__/AxiosMock';
import SenereUtenlandsoppholdSteg from './SenereUtenlandsoppholdSteg';

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
    render: ({ gåTilNesteSide = action('button-click'), utenlandsopphold = defaultUtenlandsopphold, ...rest }) => {
        initAmplitude();
        const restMock = (apiMock: MockAdapter) => {
            apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
        };
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.SENERE_UTENLANDSOPPHOLD]}>
                <AxiosMock mock={restMock}>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                        }}
                    >
                        <SenereUtenlandsoppholdSteg {...rest} />
                    </FpDataContext>
                </AxiosMock>
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

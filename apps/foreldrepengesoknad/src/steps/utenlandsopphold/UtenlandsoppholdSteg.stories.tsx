import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import MockAdapter from 'axios-mock-adapter/types';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import AxiosMock from '../../__mocks__/AxiosMock';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof UtenlandsoppholdSteg>;

const meta = {
    title: 'steps/UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
    render: ({ gåTilNesteSide, ...rest }) => {
        initAmplitude();
        const restMock = (apiMock: MockAdapter) => {
            apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
        };
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.UTENLANDSOPPHOLD]}>
                <AxiosMock mock={restMock}>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.SØKERSITUASJON]: {
                                situasjon: 'fødsel',
                                rolle: 'mor',
                            },
                        }}
                    >
                        <UtenlandsoppholdSteg {...rest} />
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

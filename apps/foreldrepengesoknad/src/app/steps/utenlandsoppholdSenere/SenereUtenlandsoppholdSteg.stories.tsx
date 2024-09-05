import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybookData/utils/AxiosMock';

import { initAmplitude } from '@navikt/fp-metrics';

import { Action, ContextDataType, FpDataContext } from 'app/appData/FpDataContext';
import SøknadRoutes from 'app/appData/routes';

import SenereUtenlandsoppholdSteg from './SenereUtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultUtenlandsopphold = {
    iNorgeNeste12Mnd: false,
    iNorgeSiste12Mnd: true,
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof SenereUtenlandsoppholdSteg>;

const meta = {
    component: SenereUtenlandsoppholdSteg,
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
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
                            [ContextDataType.UTENLANDSOPPHOLD]: defaultUtenlandsopphold,
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

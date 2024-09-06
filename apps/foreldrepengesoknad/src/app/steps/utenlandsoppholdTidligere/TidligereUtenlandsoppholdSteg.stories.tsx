import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybookData/utils/AxiosMock';

import { initAmplitude } from '@navikt/fp-metrics';

import { Action, ContextDataType, FpDataContext } from 'app/appData/FpDataContext';
import SøknadRoutes from 'app/appData/routes';
import { Opphold } from 'app/types/InformasjonOmUtenlandsopphold';

import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultUtenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false,
};

type StoryArgs = {
    utenlandsforhold?: Opphold;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof TidligereUtenlandsoppholdSteg>;

const meta = {
    component: TidligereUtenlandsoppholdSteg,
    render: ({ gåTilNesteSide = action('button-click'), utenlandsforhold = defaultUtenlandsopphold, ...rest }) => {
        initAmplitude();
        const restMock = (apiMock: MockAdapter) => {
            apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
        };
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD]}>
                <AxiosMock mock={restMock}>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold,
                        }}
                    >
                        <TidligereUtenlandsoppholdSteg {...rest} />
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

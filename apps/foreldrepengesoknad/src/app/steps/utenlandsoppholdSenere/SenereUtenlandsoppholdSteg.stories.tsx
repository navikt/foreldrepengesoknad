import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybook/utils/AxiosMock';

import { initAmplitude } from '@navikt/fp-metrics';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import { Opphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import SøknadRoutes from 'app/routes/routes';

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

export default {
    title: 'steps/SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsforhold: Opphold;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide,
    utenlandsforhold = defaultUtenlandsopphold,
}) => {
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
                        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold,
                    }}
                >
                    <SenereUtenlandsoppholdSteg
                        arbeidsforhold={[]}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={action('button-click')}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});

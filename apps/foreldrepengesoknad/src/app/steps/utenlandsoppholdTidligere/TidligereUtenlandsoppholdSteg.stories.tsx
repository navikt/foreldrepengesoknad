import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from 'storybook/utils/AxiosMock';
import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { Opphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import SøknadRoutes from 'app/routes/routes';
import { MemoryRouter } from 'react-router-dom';
import { initAmplitude } from '@navikt/fp-metrics';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'steps/TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsopphold?: Opphold;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide,
    utenlandsopphold = {
        iNorgeNeste12Mnd: true,
        iNorgeSiste12Mnd: false,
    },
}) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    }}
                >
                    <TidligereUtenlandsoppholdSteg
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={() => undefined}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});

import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from 'storybook/utils/AxiosMock';
import SenereUtenlandsoppholdSteg from './SenereUtenlandsoppholdSteg';
import { Action, FpDataContext, FpDataType } from 'app/context/FpDataContext';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'steps/SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
    decorators: [withRouter],
};

interface Props {
    mellomlagreSøknad?: () => Promise<any>;
    gåTilNesteSide: (action: Action) => void;
}

const Template: StoryFn<Props> = ({ mellomlagreSøknad = promiseAction(), gåTilNesteSide }) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage').reply(200, undefined);
    };
    return (
        <AxiosMock mock={restMock}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [FpDataType.UTENLANDSOPPHOLD]: {
                        iNorgeNeste12Mnd: true,
                        iNorgeSiste12Mnd: false,
                    },
                }}
            >
                <SenereUtenlandsoppholdSteg
                    mellomlagreSøknad={mellomlagreSøknad}
                    avbrytSøknad={action('button-click')}
                />
            </FpDataContext>
        </AxiosMock>
    );
};

export const Default = Template.bind({});

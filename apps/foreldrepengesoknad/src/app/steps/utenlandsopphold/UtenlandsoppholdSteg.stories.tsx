import { StoryFn } from '@storybook/react';
import withRouter from 'storybook/decorators/withRouter';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from 'storybook/utils/AxiosMock';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';
import { FpDataContext, FpDataType } from 'app/context/FpDataContext';

export default {
    title: 'steps/UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
    decorators: [withRouter],
};

const Template: StoryFn = () => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage').reply(200, undefined);
    };
    return (
        <AxiosMock mock={restMock}>
            <FpDataContext
                initialState={{
                    [FpDataType.SØKERSITUASJON]: {
                        situasjon: 'fødsel',
                        rolle: 'mor',
                    },
                }}
            >
                <UtenlandsoppholdSteg mellomlagreSøknad={() => undefined} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>
    );
};

export const Default = Template.bind({});

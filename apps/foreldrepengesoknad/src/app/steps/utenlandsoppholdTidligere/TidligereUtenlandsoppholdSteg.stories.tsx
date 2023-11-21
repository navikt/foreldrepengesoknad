import { StoryFn } from '@storybook/react';
import withRouter from 'storybook/decorators/withRouter';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from 'storybook/utils/AxiosMock';
import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';
import { FpDataContext, FpDataType } from 'app/context/FpDataContext';

export default {
    title: 'steps/TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
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
                    [FpDataType.UTENLANDSOPPHOLD]: {
                        iNorgeNeste12Mnd: false,
                        iNorgeSiste12Mnd: true,
                    },
                }}
            >
                <TidligereUtenlandsoppholdSteg mellomlagreSøknad={() => undefined} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>
    );
};

export const Default = Template.bind({});

import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from 'storybook/utils/AxiosMock';
import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { Opphold } from 'app/context/types/InformasjonOmUtenlandsopphold';

export default {
    title: 'steps/TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
    decorators: [withRouter],
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<any>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsopphold?: Opphold;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = action('button-click'),
    gåTilNesteSide,
    utenlandsopphold = {
        iNorgeNeste12Mnd: true,
        iNorgeSiste12Mnd: false,
    },
}) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
    };
    return (
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
    );
};

export const Default = Template.bind({});

import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from 'storybook/utils/AxiosMock';
import SenereUtenlandsoppholdSteg from './SenereUtenlandsoppholdSteg';
import { Action, FpDataContext, FpDataType } from 'app/context/FpDataContext';
import { Opphold } from 'app/context/types/InformasjonOmUtenlandsopphold';

const defaultUtenlandsopphold = {
    iNorgeNeste12Mnd: false,
    iNorgeSiste12Mnd: true,
};

export default {
    title: 'steps/SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
    decorators: [withRouter],
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<any>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsforhold: Opphold;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = action('button-click'),
    gåTilNesteSide,
    utenlandsforhold = defaultUtenlandsopphold,
}) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage').reply(200, undefined);
    };
    return (
        <AxiosMock mock={restMock}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [FpDataType.UTENLANDSOPPHOLD]: utenlandsforhold,
                }}
            >
                <SenereUtenlandsoppholdSteg
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={action('button-click')}
                />
            </FpDataContext>
        </AxiosMock>
    );
};

export const Default = Template.bind({});

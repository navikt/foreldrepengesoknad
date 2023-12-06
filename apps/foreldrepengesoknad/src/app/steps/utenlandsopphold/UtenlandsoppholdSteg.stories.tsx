import { StoryFn } from '@storybook/react';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import withRouter from 'storybook/decorators/withRouter';
import withForeldrepengersøknadContext from 'storybook/decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from 'storybook/utils/ForeldrepengerStateMock';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from 'storybook/utils/AxiosMock';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedEttBarn.json';
import _context from 'storybook/storyData/soknad/soknadMedEttBarn.json';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';

const søkerinfo = _søkerinfo as any;
const context = _context as any;

export default {
    title: 'steps/UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
    decorators: [withRouter, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const Template: StoryFn<Props> = ({ context, søkerinfo }) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage').reply(200, undefined);
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <UtenlandsoppholdSteg />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
    søkerinfo,
};

import React from 'react';
import { Story } from '@storybook/react';
import { Kjønn } from '@navikt/fp-common';
import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Søkersituasjon from 'app/steps/søkersituasjon/Søkersituasjon';
import withIntlProvider from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from '../../../utils/AxiosMock';

export default {
    title: 'steps/Søkersituasjon',
    component: Søkersituasjon,
    decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
    kjønn: Kjønn;
}

const Template: Story<Props> = ({ context, søkerinfo }) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage').reply(200, undefined);
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Søkersituasjon />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
    søkerinfo,
    kjønn: 'K',
};

export const Far = Template.bind({});
Far.args = {
    context,
    søkerinfo: {
        søker: {
            ...søkerinfo,
            kjønn: 'M',
        },
    } as SøkerinfoDTO,
    kjønn: 'M',
};

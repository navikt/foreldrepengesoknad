import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import OmBarnet from 'app/steps/om-barnet/OmBarnet';
import withIntlProvider from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';
import AxiosMock from '../../../utils/AxiosMock';

export default {
    title: 'steps/OmBarnet',
    component: OmBarnet,
    decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const Template: Story<Props> = ({ context, søkerinfo }) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage/vedlegg').reply(
            200,
            { data: {} },
            {
                location: '',
            }
        );
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            barn: undefined,
        },
    },
    søkerinfo,
};

export const FarFødsel = Template.bind({});
FarFødsel.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
            barn: undefined,
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: { ...søkerinfo, kjønn: 'M' },
};

export const MedmorFødsel = Template.bind({});
MedmorFødsel.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'medmor',
            },
            barn: undefined,
        },
    },
    søkerinfo,
};

export const ForAdopsjon = Template.bind({});
ForAdopsjon.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'adopsjon',
                rolle: 'mor',
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

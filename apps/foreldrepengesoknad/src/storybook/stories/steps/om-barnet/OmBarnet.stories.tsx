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
import { BarnType } from 'app/context/types/Barn';

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
        apiMock.onPost('/storage').reply(200, undefined);
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

export const RegistrertBarnFødselFar = Template.bind({});
RegistrertBarnFødselFar.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
            barn: {
                antallBarn: 1,
                fnr: ['21091981146'],
                fødselsdatoer: [new Date('2021-03-15')],
                type: BarnType.FØDT,
            },
        },
        søknadGjelderEtNyttBarn: false,
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const RegistrertBarnFødselMor = Template.bind({});
RegistrertBarnFødselMor.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'mor',
            },
            barn: {
                antallBarn: 2,
                fnr: ['31091981146', '31091981147'],
                fødselsdatoer: [new Date('2022-08-02'), new Date('2022-08-02')],
                type: BarnType.FØDT,
            },
        },
        søknadGjelderEtNyttBarn: false,
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const RegistrertBarnAdopsjonMor = Template.bind({});
RegistrertBarnAdopsjonMor.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'adopsjon',
                rolle: 'mor',
            },
            barn: {
                antallBarn: 1,
                fnr: ['21091981146'],
                fødselsdatoer: [new Date('2021-03-15')],
                type: BarnType.FØDT,
            },
        },
        søknadGjelderEtNyttBarn: false,
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

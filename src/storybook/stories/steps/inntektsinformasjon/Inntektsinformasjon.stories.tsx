import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Inntektsinformasjon from 'app/steps/inntektsinformasjon/Inntektsinformasjon';
import withIntlProvider from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';
import AxiosMock from '../../../utils/AxiosMock';

export default {
    title: 'steps/Inntektsinformasjon',
    component: Inntektsinformasjon,
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
                <Inntektsinformasjon />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
    søkerinfo,
};

export const HarArbeidsforhold = Template.bind({});
HarArbeidsforhold.args = {
    context,
    søkerinfo: {
        søker: {
            ...søkerinfo,
        },
        arbeidsforhold: [
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Auto Joachim Bilpleie',
                stillingsprosent: 80,
                fom: '2015-01-01',
            },
            {
                arbeidsgiverId: '2',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Taco Express',
                stillingsprosent: 20,
                fom: '2019-01-01',
                tom: '2021-01-01',
            },
        ],
    } as SøkerinfoDTO,
};

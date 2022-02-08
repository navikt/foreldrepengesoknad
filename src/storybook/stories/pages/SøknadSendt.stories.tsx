import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import { SøkerinfoDTO, SøkerinfoDTOArbeidsforhold } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import SøknadSendt from 'app/pages/søknadSendt/SøknadSendt';
import withIntlProvider from '../../decorators/withIntl';
import ForeldrepengerStateMock from '../../utils/ForeldrepengerStateMock';
import withForeldrepengersøknadContext from '../../decorators/withForeldrepengersøknadContext';
import AxiosMock from '../../utils/AxiosMock';

export default {
    title: 'pages/SøknadSendt',
    component: SøknadSendt,
    decorators: [withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    erFerdig: boolean;
    bankkonto?: {
        kontonummer: number;
    };
    arbeidsforhold: SøkerinfoDTOArbeidsforhold[];
}

const Template: Story<Props> = ({ erFerdig, bankkonto, arbeidsforhold }) => {
    const restMock = (apiMock: MockAdapter) => {
        if (erFerdig) {
            apiMock.onPost('/storage/kvittering/foreldrepenger').replyOnce(200, {});
        }
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock
                søknad={{} as ForeldrepengesøknadContextState}
                søkerinfo={
                    {
                        søker: { fnr: '1233434', fornavn: 'Espen', etternavn: 'Utvikler', bankkonto },
                        arbeidsforhold,
                    } as SøkerinfoDTO
                }
            >
                <SøknadSendt />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    erFerdig: true,
};

export const MedBankkonto = Template.bind({});
MedBankkonto.args = {
    erFerdig: true,
    bankkonto: { kontonummer: 5646464535 },
};

export const MedArbeidsforhold = Template.bind({});
MedArbeidsforhold.args = {
    erFerdig: true,
    arbeidsforhold: [{} as SøkerinfoDTOArbeidsforhold],
};

export const VenterPåLagring = Template.bind({});
VenterPåLagring.args = {
    erFerdig: false,
};

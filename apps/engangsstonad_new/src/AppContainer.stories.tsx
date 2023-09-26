import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';

import { foreldrepengersoknadApi } from './api';
import AppContainer from './AppContainer';

const person = {
    fnr: '11111111111',
    fornavn: 'Henrikke',
    etternavn: 'Ibsen',
    kjønn: 'K',
    fødselsdato: '1979-01-28',
    bankkonto: {
        kontonummer: '49875234987',
        banknavn: 'Storebank',
    },
};

const kvittering = {
    mottattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941',
};

export default {
    title: 'AppContainer',
    component: AppContainer,
};

const Template: StoryFn<any> = () => {
    const apiMock = new MockAdapter(foreldrepengersoknadApi);
    apiMock.onGet('/personinfo').reply(200, person);
    apiMock.onPost('/soknad').reply(200, kvittering);

    return <AppContainer />;
};

export const VisApp = Template.bind({});

import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { initAmplitude } from '@navikt/fp-metrics';
import { attachmentApi } from '@navikt/fp-api';

import Person, { Kjønn } from 'types/Person';
import AppContainer from './AppContainer';
import { esApi } from './Engangsstønad';
import { EsDataMap, EsDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';

const kvittering = {
    mottattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941',
};

export default {
    title: 'Applikasjon - Engangsstønad (AppContainer)',
    component: AppContainer,
};

const Template: StoryFn<{ person: Person; mellomlagretData?: EsDataMap }> = ({ person, mellomlagretData }) => {
    initAmplitude();

    const apiMock = new MockAdapter(esApi);
    apiMock.onGet('/personinfo').reply(200, person);
    apiMock.onGet('/storage/engangstønad').reply(200, mellomlagretData);
    apiMock.onPost('/soknad/engangssoknad').reply(200, kvittering);
    apiMock.onPost('/soknad/engangssoknad').reply(200);

    const attachmentApiMock = new MockAdapter(attachmentApi);
    attachmentApiMock.onPost('/storage/vedlegg').reply(200); //story
    attachmentApiMock.onPost('http://localhost:8888/rest/storage/vedlegg').reply(200); //test

    return <AppContainer />;
};

export const SøkerErKvinne = Template.bind({});
SøkerErKvinne.args = {
    person: {
        fnr: '11111111111',
        fornavn: 'Henrikke',
        etternavn: 'Ibsen',
        kjønn: Kjønn.KVINNE,
        fødselsdato: '1979-01-28',
        adresse: 'Oslo 123',
        bankkonto: {
            kontonummer: '49875234987',
            banknavn: 'Storebank',
        },
    },
};

export const SøkerErKvinneMedMellomlagretData = Template.bind({});
SøkerErKvinneMedMellomlagretData.args = {
    mellomlagretData: {
        [EsDataType.SØKERSITUASJON]: {
            situasjon: 'fødsel',
        },
        [EsDataType.CURRENT_PATH]: Path.SØKERSITUASJON,
    },
    person: {
        fnr: '11111111111',
        fornavn: 'Henrikke',
        etternavn: 'Ibsen',
        kjønn: Kjønn.KVINNE,
        fødselsdato: '1979-01-28',
        adresse: 'Oslo 123',
        bankkonto: {
            kontonummer: '49875234987',
            banknavn: 'Storebank',
        },
    },
};

export const SøkerErMann = Template.bind({});
SøkerErMann.args = {
    person: {
        fnr: '1231111111',
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        kjønn: Kjønn.MANN,
        fødselsdato: '1979-01-28',
        adresse: 'Oslo 123',
        bankkonto: {
            kontonummer: '49875234987',
            banknavn: 'Storebank',
        },
    },
};

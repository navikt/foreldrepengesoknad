import { attachmentApi } from '@navikt/fp-api';
import { initAmplitude } from '@navikt/fp-metrics';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';

import { Person } from '@navikt/fp-types';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { EsDataMapAndMetaData } from 'appData/useEsMellomlagring';
import AppContainer from './AppContainer';
import { esApi } from './EngangsstønadRoutes';

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

const Template: StoryFn<{ person: Person; mellomlagretData?: EsDataMapAndMetaData; doLogging?: boolean }> = ({
    person,
    mellomlagretData,
    doLogging = true,
}) => {
    initAmplitude();

    const apiMock = new MockAdapter(esApi);
    apiMock.onGet('/personinfo').reply(() => {
        if (doLogging) {
            console.log('network request: get /personinfo');
        }
        return [200, person];
    });
    apiMock.onGet('/storage/engangsstonad').reply(() => {
        if (doLogging) {
            console.log('network request: get /storage/engangstonad');
        }
        return [200, mellomlagretData];
    });
    apiMock.onPost('/soknad/engangsstonad').reply(() => {
        if (doLogging) {
            console.log('network request: post /soknad/engangsstonad');
        }
        return [200, kvittering];
    });
    apiMock.onPost('/storage/engangsstonad').reply(() => {
        if (doLogging) {
            console.log('network request: post /storage/engangstonad');
        }
        return [200];
    });
    apiMock.onDelete('/storage/engangsstonad').reply(() => {
        if (doLogging) {
            console.log('network request: delete /storage/engangstonad');
        }
        return [200];
    });

    const attachmentApiMock = new MockAdapter(attachmentApi);
    attachmentApiMock.onPost('/storage/engangsstonad/vedlegg').reply(200); //story
    attachmentApiMock.onPost('http://localhost:8888/rest/storage/engangsstonad/vedlegg').reply(200); //test

    return <AppContainer />;
};

export const SøkerErKvinne = Template.bind({});
SøkerErKvinne.args = {
    person: {
        fnr: '11111111111',
        fornavn: 'Henrikke',
        etternavn: 'Ibsen',
        kjønn: 'K',
        fødselsdato: '1979-01-28',
        bankkonto: {
            kontonummer: '49875234987',
            banknavn: 'Storebank',
        },
        barn: [],
    },
};

export const SøkerErKvinneMedMellomlagretData = Template.bind({});
SøkerErKvinneMedMellomlagretData.args = {
    mellomlagretData: {
        version: 1,
        locale: 'nb',
        [ContextDataType.SØKERSITUASJON]: {
            situasjon: 'fødsel',
        },
        [ContextDataType.CURRENT_PATH]: Path.SØKERSITUASJON,
    },
    person: {
        fnr: '11111111111',
        fornavn: 'Henrikke',
        etternavn: 'Ibsen',
        kjønn: 'K',
        fødselsdato: '1979-01-28',
        bankkonto: {
            kontonummer: '49875234987',
            banknavn: 'Storebank',
        },
        barn: [],
    },
};

export const SøkerErMann = Template.bind({});
SøkerErMann.args = {
    person: {
        fnr: '1231111111',
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        kjønn: 'M',
        fødselsdato: '1979-01-28',
        bankkonto: {
            kontonummer: '49875234987',
            banknavn: 'Storebank',
        },
        barn: [],
    },
};

import { Meta, StoryObj } from '@storybook/react';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { EsDataMapAndMetaData } from 'appData/useEsMellomlagring';
import MockAdapter from 'axios-mock-adapter';
import { ComponentProps } from 'react';

import { initAmplitude } from '@navikt/fp-metrics';
import { Søker } from '@navikt/fp-types';

import AppContainer from './AppContainer';
import { AxiosInstanceAPI } from './api/AxiosInstance';

const kvittering = {
    mottattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941',
};

type StoryArgs = {
    søker: Søker;
    mellomlagretData?: EsDataMapAndMetaData;
    doLogging?: boolean;
} & ComponentProps<typeof AppContainer>;

const meta = {
    title: 'Applikasjon - Engangsstønad (AppContainer)',
    component: AppContainer,
    render: ({ søker, mellomlagretData, doLogging = true }) => {
        initAmplitude();

        const apiMock = new MockAdapter(AxiosInstanceAPI());
        apiMock.onGet('/rest/personinfo').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: get /personinfo');
            }
            return [200, søker];
        });
        apiMock.onGet('/rest/storage/engangsstonad').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: get /storage/engangstonad');
            }
            return [200, mellomlagretData];
        });
        apiMock.onPost('/rest/soknad/engangsstonad').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: post /soknad/engangsstonad');
            }
            return [200, kvittering];
        });
        apiMock.onPost('/rest/storage/engangsstonad').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: post /storage/engangstonad');
            }
            return [200];
        });
        apiMock.onDelete('/rest/storage/engangsstonad').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: delete /storage/engangstonad');
            }
            return [200];
        });

        apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
        apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //test

        return <AppContainer />;
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SøkerErKvinne: Story = {
    args: {
        søker: {
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
    },
};

export const SøkerErKvinneMedMellomlagretData: Story = {
    args: {
        mellomlagretData: {
            version: 1,
            locale: 'nb',
            [ContextDataType.SØKERSITUASJON]: {
                situasjon: 'fødsel',
            },
            [ContextDataType.CURRENT_PATH]: Path.SØKERSITUASJON,
        },
        søker: {
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
    },
};

export const SøkerErMann: Story = {
    args: {
        søker: {
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
    },
};

import { Meta, StoryObj } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';

import '@navikt/ds-css';

import { initAmplitude } from '@navikt/fp-metrics';
import { Søker, Søkerinfo } from '@navikt/fp-types';

import AppContainer from './AppContainer';
import { AxiosInstanceAPI } from './api/AxiosInstance';
import { SvpDataMapAndMetaData } from './app-data/useMellomlagreSøknad';

const defaultSøkerinfo = {
    søker: {
        fnr: '30088930610',
        fornavn: 'ERLINGA-MASK',
        etternavn: 'ORAVAKANGAS',
        kjønn: 'K',
        fødselsdato: '1989-08-30',
        land: 'NO',
        barn: [],
        bankkonto: {
            kontonummer: '10824223373',
            banknavn: 'Din Bank',
        },
    } as Søker,
    arbeidsforhold: [
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD',
            stillingsprosent: 32.63,
            fom: '2014-05-22',
            tom: '2019-05-31',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD',
            stillingsprosent: 0,
            fom: '2018-04-09',
            tom: '2018-09-09',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD',
            stillingsprosent: 80,
            fom: '2018-06-25',
            tom: '2018-08-05',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SYKEHUSET I VESTFOLD',
            stillingsprosent: 85.09,
            fom: '2019-06-01',
        },
        {
            arbeidsgiverId: '990322244',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'OMSORGSPARTNER VESTFOLD',
            stillingsprosent: 100,
            fom: '2017-04-05',
        },
        {
            arbeidsgiverId: '995090910',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'RE KOMMUNE',
            stillingsprosent: 0,
            fom: '2018-06-01',
        },
    ],
};

type StoryArgs = {
    søkerinfo: Søkerinfo;
    mellomlagretData?: SvpDataMapAndMetaData;
    doLogging?: boolean;
};

const meta = {
    component: AppContainer,
    render: ({ søkerinfo, mellomlagretData, doLogging = true }) => {
        initAmplitude();
        const apiMock = new MockAdapter(AxiosInstanceAPI());
        apiMock.onGet('/rest/sokerinfo').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: get /sokerinfo');
            }
            return [200, søkerinfo];
        });

        apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: get /storage/svangerskapspenger');
            }
            return [200, mellomlagretData];
        });

        apiMock.onPost('rest-api/soknad').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: post rest-api/soknad');
            }
            return [200, {}];
        });

        apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: post /storage/svangerskapspenger/vedlegg');
            }
            return [200];
        });
        apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: post /storage/svangerskapspenger');
            }
            return [200];
        });

        apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: delete /storage/svangerskapspenger');
            }
            return [200];
        });

        //story
        apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
            if (doLogging) {
                // eslint-disable-next-line no-console
                console.log('network request: post /storage/svangerskapspenger/vedlegg');
            }
            return [200];
        });
        apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

        return <AppContainer />;
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const VisAppKvinneMedArbeid: Story = {
    args: {
        søkerinfo: defaultSøkerinfo,
    },
};

export const VisAppKvinneUtenArbeid: Story = {
    args: {
        søkerinfo: {
            ...defaultSøkerinfo,
            arbeidsforhold: [],
        },
    },
};

export const VisAppMann: Story = {
    args: {
        søkerinfo: {
            ...defaultSøkerinfo,
            søker: { ...defaultSøkerinfo.søker, kjønn: 'M' },
        },
    },
};

export const VisAppUmyndig: Story = {
    args: {
        søkerinfo: {
            ...defaultSøkerinfo,
            søker: { ...defaultSøkerinfo.søker, kjønn: 'K', fødselsdato: '2023-08-30' },
        },
    },
};

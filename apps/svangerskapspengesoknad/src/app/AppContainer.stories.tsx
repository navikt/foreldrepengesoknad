import '@navikt/ds-css';
import MockAdapter from 'axios-mock-adapter';
import AppContainer from 'app/AppContainer';
import { StoryFn } from '@storybook/react';
import _søkerinfo from 'storybook/storydata/sokerinfo/sokerinfo.json';
import { svpApi } from './routes/SvangerskapspengesøknadRoutes';
import { Søkerinfo } from './types/Søkerinfo';
import { SvpDataMapAndMetaData } from './context/useMellomlagreSøknad';
import { attachmentApi } from '@navikt/fp-api';

const søkerinfo = _søkerinfo as any;

export default {
    title: 'AppContainer',
    component: AppContainer,
};

const Template: StoryFn<{ søkerinfo: Søkerinfo; mellomlagretData?: SvpDataMapAndMetaData; doLogging?: boolean }> = ({
    søkerinfo,
    mellomlagretData,
    doLogging = true,
}) => {
    const apiMock = new MockAdapter(svpApi);
    apiMock.onGet('/sokerinfo').reply(() => {
        if (doLogging) {
            console.log('network request: get /sokerinfo');
        }
        return [200, søkerinfo];
    });

    apiMock.onGet('/storage/svangerskapspenger').reply(() => {
        if (doLogging) {
            console.log('network request: get /storage/svangerskapspenger');
        }
        return [200, mellomlagretData];
    });

    apiMock.onPost('rest-api/soknad/svangerskapspenger').reply(() => {
        if (doLogging) {
            console.log('network request: post rest-api/soknad/svangerskapspenger');
        }
        return [200, {}];
    });

    apiMock.onPost('/storage/svangerskapspenger/vedlegg').reply(() => {
        if (doLogging) {
            console.log('network request: post /storage/svangerskapspenger/vedlegg');
        }
        return [200];
    });
    apiMock.onPost('/storage/svangerskapspenger').reply(() => {
        if (doLogging) {
            console.log('network request: post /storage/svangerskapspenger');
        }
        return [200];
    });

    apiMock.onDelete('/storage/svangerskapspenger').reply(() => {
        if (doLogging) {
            console.log('network request: delete /storage/svangerskapspenger');
        }
        return [200];
    });

    const attachmentApiMock = new MockAdapter(attachmentApi);
    //story
    attachmentApiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(() => {
        if (doLogging) {
            console.log('network request: post /storage/svangerskapspenger/vedlegg');
        }
        return [200];
    });
    attachmentApiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

    return <AppContainer />;
};

export const VisAppKvinneMedArbeid = Template.bind({});
VisAppKvinneMedArbeid.args = {
    søkerinfo,
};

export const VisAppKvinneUtenArbeid = Template.bind({});
VisAppKvinneUtenArbeid.args = {
    søkerinfo: {
        ...søkerinfo,
        arbeidsforhold: [],
    },
};

export const VisAppMann = Template.bind({});
VisAppMann.args = {
    søkerinfo: {
        ...søkerinfo,
        søker: { ...søkerinfo.søker, kjønn: 'M' },
    },
};

export const VisAppUmyndig = Template.bind({});
VisAppUmyndig.args = {
    søkerinfo: {
        ...søkerinfo,
        søker: { ...søkerinfo.søker, kjønn: 'K', fødselsdato: '2023-08-30' },
    },
};

import '@navikt/ds-css';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'app/api/apiInterceptor';
import AppContainer from 'app/AppContainer';
import { Story } from '@storybook/react';
import søkerinfo from 'storybook/storydata/sokerinfo/sokerinfo.json';

export default {
    title: 'AppContainer',
    component: AppContainer,
};

const Template: Story = ({ søkerinfo }) => {
    const apiMock = new MockAdapter(AxiosInstance);
    apiMock.onGet('/sokerinfo').reply(200, søkerinfo);
    apiMock.onPost('/soknad').reply(200, {});
    apiMock.onPost('/sendSøknadUrl').reply(200, {});
    apiMock.onPost('/storage/vedlegg').reply(200);

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

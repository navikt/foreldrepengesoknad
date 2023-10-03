import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { Path } from 'appData/paths';
import DokumentasjonSteg from './DokumentasjonSteg';
import IntlProvider from '../../../intl/IntlProvider';
import withRouter from 'storybookHelpers/withRouter';
import { attachmentApi } from 'fpcommon/uploader/attachmentApi';

export default {
    title: 'DokumentasjonSteg',
    component: DokumentasjonSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.DOKUMENTASJON,
    },
};

const Template: StoryFn<any> = () => {
    const apiMock = new MockAdapter(attachmentApi);
    apiMock.onPost('/storage/vedlegg').reply(200);

    return (
        <IntlProvider språkkode="nb">
            <DokumentasjonSteg />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});

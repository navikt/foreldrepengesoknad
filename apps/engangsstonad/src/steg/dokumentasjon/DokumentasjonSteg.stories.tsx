import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MockAdapter from 'axios-mock-adapter';
import { initAmplitude } from '@navikt/fp-metrics';
import { attachmentApi } from '@navikt/fp-api';

import { Path } from 'appData/paths';
import withRouter from 'storybookHelpers/withRouter';
import EsContextStorybookHelper from 'storybookHelpers/EsContextStorybookHelper';
import { Action, EsDataType } from 'appData/EsDataContext';
import { OmBarnet } from 'types/OmBarnet';
import DokumentasjonSteg from './DokumentasjonSteg';

export default {
    title: 'DokumentasjonSteg',
    component: DokumentasjonSteg,
    decorators: [withRouter],
};

const Template: StoryFn<{
    routerDecoratorInitUrl: string;
    gåTilNesteSide: (action: Action) => void;
    omBarnet: OmBarnet;
    skalFeileOpplasting?: boolean;
}> = ({ gåTilNesteSide, omBarnet, skalFeileOpplasting = false }) => {
    initAmplitude();

    const apiMock = new MockAdapter(attachmentApi);
    if (!skalFeileOpplasting) {
        apiMock.onPost('/storage/vedlegg').reply(200); //story
        apiMock.onPost('http://localhost:8888/rest/storage/vedlegg').reply(200); //test
    }

    return (
        <EsContextStorybookHelper
            onDispatch={gåTilNesteSide}
            initialState={{
                [EsDataType.OM_BARNET]: omBarnet,
            }}
        >
            <DokumentasjonSteg />
        </EsContextStorybookHelper>
    );
};

export const Terminbekreftelse = Template.bind({});
Terminbekreftelse.args = {
    gåTilNesteSide: action('button-click'),
    routerDecoratorInitUrl: Path.TERMINBEKREFTELSE,
    omBarnet: {
        erBarnetFødt: false,
        antallBarn: 1,
        termindato: '2023-10-06',
    },
};

export const Adopsjonsbekreftelse = Template.bind({});
Adopsjonsbekreftelse.args = {
    gåTilNesteSide: action('button-click'),
    routerDecoratorInitUrl: Path.ADOPSJONSBEKREFTELSE,
    omBarnet: {
        adopsjonAvEktefellesBarn: true,
        adopsjonsdato: '2020-01-01',
        antallBarn: 1,
        fødselsdatoer: [{ dato: '2020-01-01' }],
    },
};

export const FeilerOpplastinger = Template.bind({});
FeilerOpplastinger.args = {
    gåTilNesteSide: action('button-click'),
    skalFeileOpplasting: true,
    routerDecoratorInitUrl: Path.ADOPSJONSBEKREFTELSE,
    omBarnet: {
        adopsjonAvEktefellesBarn: true,
        adopsjonsdato: '2020-01-01',
        antallBarn: 1,
        fødselsdatoer: [{ dato: '2020-01-01' }],
    },
};

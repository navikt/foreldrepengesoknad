import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MockAdapter from 'axios-mock-adapter';
import { initAmplitude } from '@navikt/fp-metrics';
import { attachmentApi } from '@navikt/fp-api';

import { Path } from 'appData/paths';
import { Action, EsDataContext, ContextDataType } from 'appData/EsDataContext';
import { OmBarnet } from 'types/OmBarnet';
import DokumentasjonSteg from './DokumentasjonSteg';
import { MemoryRouter } from 'react-router-dom';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'DokumentasjonSteg',
    component: DokumentasjonSteg,
};

const Template: StoryFn<{
    routerDecoratorInitUrl: string;
    gåTilNesteSide?: (action: Action) => void;
    mellomlagreOgNaviger?: () => Promise<void>;
    omBarnet: OmBarnet;
    skalFeileOpplasting?: boolean;
    path: Path;
}> = ({
    gåTilNesteSide = action('button-click'),
    mellomlagreOgNaviger = promiseAction(),
    omBarnet,
    skalFeileOpplasting = false,
    path,
}) => {
    initAmplitude();

    const apiMock = new MockAdapter(attachmentApi);
    if (!skalFeileOpplasting) {
        apiMock.onPost('/storage/engangssoknad/vedlegg').reply(200); //story
        apiMock.onPost('http://localhost:8888/rest/engangssoknad/storage/vedlegg').reply(200); //test
    }

    return (
        <MemoryRouter initialEntries={[path]}>
            <EsDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.OM_BARNET]: omBarnet,
                }}
            >
                <DokumentasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>
    );
};

export const Terminbekreftelse = Template.bind({});
Terminbekreftelse.args = {
    path: Path.TERMINBEKREFTELSE,
    omBarnet: {
        erBarnetFødt: false,
        antallBarn: 1,
        termindato: '2023-10-06',
    },
};

export const Adopsjonsbekreftelse = Template.bind({});
Adopsjonsbekreftelse.args = {
    path: Path.ADOPSJONSBEKREFTELSE,
    omBarnet: {
        adopsjonAvEktefellesBarn: true,
        adopsjonsdato: '2020-01-01',
        antallBarn: 1,
        fødselsdatoer: [{ dato: '2020-01-01' }],
    },
};

export const FeilerOpplastinger = Template.bind({});
FeilerOpplastinger.args = {
    skalFeileOpplasting: true,
    path: Path.ADOPSJONSBEKREFTELSE,
    omBarnet: {
        adopsjonAvEktefellesBarn: true,
        adopsjonsdato: '2020-01-01',
        antallBarn: 1,
        fødselsdatoer: [{ dato: '2020-01-01' }],
    },
};

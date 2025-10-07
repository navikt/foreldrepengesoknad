import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { API_URLS } from 'appData/queries';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { OmBarnet } from 'types/OmBarnet';

import { DokumentasjonSteg } from './DokumentasjonSteg';

const promiseAction = () => (): Promise<void> => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    omBarnet: OmBarnet;
    path: Path;
} & ComponentProps<typeof DokumentasjonSteg>;

const meta = {
    title: 'steg/DokumentasjonSteg',
    component: DokumentasjonSteg,
    render: ({ gåTilNesteSide = action('button-click'), mellomlagreOgNaviger, omBarnet, path }) => {
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
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Terminbekreftelse: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    API_URLS.sendVedlegg,
                    () => new HttpResponse('uuid-test', { status: 200, headers: { location: 'test.com' } }),
                ),
            ],
        },
    },
    args: {
        path: Path.TERMINBEKREFTELSE,
        omBarnet: {
            erBarnetFødt: false,
            antallBarn: 1,
            termindato: '2023-10-06',
        },
        mellomlagreOgNaviger: promiseAction(),
    },
};

export const Adopsjonsbekreftelse: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(
                    API_URLS.sendVedlegg,
                    () => new HttpResponse('uuid-test', { status: 200, headers: { location: 'test.com' } }),
                ),
            ],
        },
    },
    args: {
        path: Path.ADOPSJONSBEKREFTELSE,
        omBarnet: {
            adopsjonAvEktefellesBarn: true,
            adopsjonsdato: '2020-01-01',
            antallBarn: 1,
            fødselsdatoer: [{ dato: '2020-01-01' }],
        },
        mellomlagreOgNaviger: promiseAction(),
    },
};

export const FeilerOpplastinger: Story = {
    parameters: {
        msw: {
            handlers: [http.post(API_URLS.sendVedlegg, () => new HttpResponse(null, { status: 400 }))],
        },
    },
    args: {
        path: Path.ADOPSJONSBEKREFTELSE,
        omBarnet: {
            adopsjonAvEktefellesBarn: true,
            adopsjonsdato: '2020-01-01',
            antallBarn: 1,
            fødselsdatoer: [{ dato: '2020-01-01' }],
        },
        mellomlagreOgNaviger: promiseAction(),
    },
};

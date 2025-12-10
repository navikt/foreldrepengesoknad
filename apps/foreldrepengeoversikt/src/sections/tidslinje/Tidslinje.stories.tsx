import { Meta, StoryObj } from '@storybook/react-vite';
import { useQuery } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { manglendeVedlegg, manglendeVedlegg_FP } from 'storybookData/manglendeVedlegg/manglendeVedlegg';
import {
    saker,
    saker_ES_adopsjon_avslag,
    saker_ES_adopsjon_innvilget,
    saker_ES_under_behandling,
    saker_FP_adopsjon,
    saker_FP_etterlyst_IM,
    saker_FP_for_tidlig_søknad,
    saker_FP_fødsel_tilbakekreving,
    saker_FP_mangler_dokumentasjon,
    saker_FP_ny_søknad,
    saker_FP_termin_innvilget,
    saker_SVP_innvilget,
    saker_SVP_under_behandling,
} from 'storybookData/saker/saker';
import { søkerinfo } from 'storybookData/sokerinfo/sokerinfo.ts';
import {
    tidslinjeHendelserFP,
    tidslinjeHendelser_FP_Adopsjon,
    tidslinjeHendelser_FP_etterlys_IM,
    tidslinjeHendelser_FP_termin_innvilget,
    tidslinjeHendelser_FP_tilbakekreving,
    tidslinjehendelser_ES_adopsjon_avslag,
    tidslinjehendelser_ES_adopsjon_innvilget,
    tidslinjehendelser_ES_under_behandling,
    tidslinjehendelser_FP_for_tidlig_søknad,
    tidslinjehendelser_FP_mangler_dokumentasjon,
    tidslinjehendelser_FP_ny_søknad,
    tidslinjehendelser_SVP_innvilget,
    tidslinjehendelser_SVP_under_behandling,
} from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.ts';

import { BarnDto_fpoversikt } from '@navikt/fp-types';
import { withMockDate, withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS, hentManglendeVedleggOptions, hentTidslinjehendelserOptions } from '../../api/queries.ts';
import { useGetSelectedSak } from '../../hooks/useSelectedSak.ts';
import { Tidslinje } from './Tidslinje.tsx';

const søkersBarn = [
    {
        navn: {
            fornavn: 'Olga',
            etternavn: 'Utvikler',
        },
        fnr: '23232424',
        fødselsdato: '2024-01-01',
        kjønn: 'K',
    },
] satisfies BarnDto_fpoversikt[];

type MockProps = {
    søkersBarn: BarnDto_fpoversikt[];
};
const MockTidslinje = (props: MockProps) => {
    const params = useParams();
    const sak = useGetSelectedSak();
    const tidslinjeHendelser = useQuery(hentTidslinjehendelserOptions(params.saksnummer!)).data;
    const manglendeVedleggData = useQuery(hentManglendeVedleggOptions(params.saksnummer!)).data;

    if (!tidslinjeHendelser || !manglendeVedleggData || !sak) {
        return 'Laster story...';
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <Tidslinje
                {...props}
                sak={sak}
                manglendeVedlegg={manglendeVedleggData}
                tidslinjeHendelser={tidslinjeHendelser}
            />
        </div>
    );
};

type StoryArgs = {
    saksnummer: string;
    mockDate?: number;
} & MockProps;

const meta = {
    title: 'Tidslinje',
    component: MockTidslinje,
    decorators: [withQueryClient, withMockDate(new Date('2025-11-27').getTime())],
    argTypes: {
        mockDate: {
            control: 'date',
            description: 'Mock the current date for the story',
        },
    },
    render: ({ saksnummer, ...props }) => {
        return (
            <MemoryRouter initialEntries={[`/${saksnummer}`]}>
                <Routes>
                    <Route element={<MockTidslinje {...props} />} path={`/:saksnummer`} />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FP: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '1',
    },
};

export const FPAdopsjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_adopsjon)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser_FP_Adopsjon)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '818',
    },
};

export const FPTerminInnvilget: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_termin_innvilget)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser_FP_termin_innvilget)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '821',
    },
};

export const FPMedTilbakekreving: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_fødsel_tilbakekreving)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser_FP_tilbakekreving)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '827',
    },
};

export const FPEtterlysIM: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_etterlyst_IM)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser_FP_etterlys_IM)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '830',
    },
};

export const FPForTidligSøknad: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_for_tidlig_søknad)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_FP_for_tidlig_søknad)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '837',
    },
};

export const FPManglerDokumentasjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_mangler_dokumentasjon)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_FP_mangler_dokumentasjon)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg_FP)),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '352028412',
    },
};

export const FPNySøknad: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_ny_søknad)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_FP_ny_søknad)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg_FP)),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '352028412',
    },
};

export const SVPInnvilget: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_SVP_innvilget)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_SVP_innvilget)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '843',
    },
};

export const SVPUnderBehandling: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_SVP_under_behandling)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_SVP_under_behandling)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '848',
    },
};

export const ESAdopsjonInnvilget: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_ES_adopsjon_innvilget)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_ES_adopsjon_innvilget)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '838',
    },
};

export const ESAdopsjonAvslag: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_ES_adopsjon_avslag)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_ES_adopsjon_avslag)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '839',
    },
};

export const ESUnderBehandling: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker_ES_under_behandling)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_ES_under_behandling)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '842',
    },
};

import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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
import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { OversiktRoutes } from '../../routes/routes';
import { TidslinjePage } from './TidslinjePage';

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

type StoryArgs = {
    saksnummer: string;
} & ComponentProps<typeof TidslinjePage>;

const meta = {
    title: 'TidslinjePage',
    component: TidslinjePage,
    decorators: [withQueryClient],
    render: ({ saksnummer, ...props }) => {
        return (
            <MemoryRouter initialEntries={[`/${OversiktRoutes.TIDSLINJEN}/${saksnummer}`]}>
                <Routes>
                    <Route element={<TidslinjePage {...props} />} path={`/${OversiktRoutes.TIDSLINJEN}/:saksnummer`} />
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
                http.get(API_URLS.saker, () => HttpResponse.json(saker_FP_mangler_dokumentasjon)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjehendelser_FP_mangler_dokumentasjon)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg_FP)),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '352028412',
        visHeleTidslinjen: true,
    },
};

export const FPNySøknad: Story = {
    parameters: {
        msw: {
            handlers: [
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

// TODO: termindato burde ikke være aktivt?
export const SVPInnvilget: Story = {
    parameters: {
        msw: {
            handlers: [
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

// TODO: kun blå for etter fødsel
export const ESAdopsjonInnvilget: Story = {
    parameters: {
        msw: {
            handlers: [
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

import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { manglendeVedlegg } from 'storybookData/manglendeVedlegg/manglendeVedlegg';
import { saker } from 'storybookData/saker/saker';
import { tidslinjeHendelserFP } from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.ts';

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

export const SVP: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)), // TODO
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '308',
    },
};

export const ES: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelserFP)), // TODO
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
            ],
        },
    },
    args: {
        søkersBarn,
        saksnummer: '2',
    },
};

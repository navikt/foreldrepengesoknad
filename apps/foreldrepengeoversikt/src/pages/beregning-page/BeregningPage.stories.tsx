import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
    saker_beregning_aap,
    saker_beregning_cross_year,
    saker_beregning_dagpenger,
    saker_beregning_delvis_refusjon,
    saker_beregning_direkte_utbetaling,
    saker_beregning_full_refusjon,
    saker_beregning_kun_ytelse,
    saker_beregning_svp_direkte_utbetaling,
} from 'storybookData/saker/saker.ts';

import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { OversiktRoutes } from '../../routes/routes.ts';
import { BeregningPage } from './BeregningPage.tsx';

const meta = {
    title: 'Beregning',
    decorators: [withQueryClient],

    render: (args) => {
        return (
            <MemoryRouter
                initialEntries={[`${OversiktRoutes.SAKSOVERSIKT}/${args.saksnummer}/${OversiktRoutes.BEREGNING}`]}
            >
                <Routes>
                    <Route
                        element={<BeregningPage />}
                        path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.BEREGNING}`}
                    />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const BeregningDirekteUtbetaling: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_direkte_utbetaling)),
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        saksnummer: '611',
    },
};

export const BeregningDelvisRefusjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_delvis_refusjon)),
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        saksnummer: '613',
    },
};

export const BeregningFullRefusjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_full_refusjon)),
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        saksnummer: '616',
    },
};

export const BeregningSvpDirekteUtbetaling: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_svp_direkte_utbetaling)),
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        saksnummer: '701',
    },
};

export const BeregningMedNaturalytelser: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_direkte_utbetaling)),
                http.get(API_URLS.inntektsmelding, () =>
                    HttpResponse.json([
                        {
                            arbeidsgiverIdent: '992260475',
                            arbeidsgiverNavn: 'SJOKKANSEN AS',
                            bortfalteNaturalytelser: [
                                {
                                    beløpPerMnd: 500,
                                    fomDato: '2025-11-12',
                                    tomDato: '2026-03-03',
                                    type: 'ELEKTRISK_KOMMUNIKASJON',
                                },
                            ],
                            erAktiv: true,
                            inntektPrMnd: 80000,
                            journalpostId: 'jp-nat-1',
                            mottattTidspunkt: '2025-11-01T10:00:00.000',
                            refusjonPrMnd: 0,
                            refusjonsperioder: [],
                            startDatoPermisjon: '2025-11-12',
                            stillingsprosent: 100,
                            versjon: 2,
                        },
                    ]),
                ),
            ],
        },
    },
    args: {
        saksnummer: '611',
    },
};

export const BeregningDagpenger: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_dagpenger)),
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
                http.get(API_URLS.dokumenter, () =>
                    HttpResponse.json([
                        {
                            dokumentId: 'dok-1',
                            journalpostId: 'jp-1',
                            mottatt: '2025-12-10',
                            saksnummer: '801',
                            tittel: 'Innvilgelsesbrev foreldrepenger',
                            type: 'UTGÅENDE_DOKUMENT',
                        },
                    ]),
                ),
            ],
        },
    },
    args: {
        saksnummer: '801',
    },
};

export const BeregningAAP: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_aap)),
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
                http.get(API_URLS.dokumenter, () =>
                    HttpResponse.json([
                        {
                            dokumentId: 'dok-2',
                            journalpostId: 'jp-2',
                            mottatt: '2025-12-10',
                            saksnummer: '802',
                            tittel: 'Innvilgelsesbrev foreldrepenger',
                            type: 'UTGÅENDE_DOKUMENT',
                        },
                    ]),
                ),
            ],
        },
    },
    args: {
        saksnummer: '802',
    },
};

export const BeregningKunYtelse: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_kun_ytelse)),
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
                http.get(API_URLS.dokumenter, () =>
                    HttpResponse.json([
                        {
                            dokumentId: 'dok-3',
                            journalpostId: 'jp-3',
                            mottatt: '2025-12-10',
                            saksnummer: '803',
                            tittel: 'Innvilgelsesbrev foreldrepenger',
                            type: 'UTGÅENDE_DOKUMENT',
                        },
                    ]),
                ),
            ],
        },
    },
    args: {
        saksnummer: '803',
    },
};

export const BeregningCrossYear: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker_beregning_cross_year)),
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json([])),
            ],
        },
    },
    args: {
        saksnummer: '901',
    },
};

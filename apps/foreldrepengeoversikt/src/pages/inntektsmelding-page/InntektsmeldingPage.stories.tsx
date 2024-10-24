import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import enBortfaltNaturalytelse from 'storybookData/inntektsmeldinger/enBortfaltNaturalytelse.json';
import flereBortfalteNaturalytelser from 'storybookData/inntektsmeldinger/flereBortfalteNaturalytelser.json';
import medDelvisRefusjon from 'storybookData/inntektsmeldinger/medDelvisRefusjon.json';
import medRefusjon from 'storybookData/inntektsmeldinger/medRefusjon.json';
import medRefusjonsPerioder from 'storybookData/inntektsmeldinger/medRefusjonsPerioder.json';
import utenRefusjon from 'storybookData/inntektsmeldinger/utenRefusjon.json';
import saker from 'storybookData/saker/saker.json';

import OversiktRoutes from '../../routes/routes';
import { InntektsmeldingPage } from './InntektsmeldingPage';

const queryClient = new QueryClient();

const meta = {
    title: 'Inntektsmelding',
    render: () => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter
                    initialEntries={[`${OversiktRoutes.SAKSOVERSIKT}/1/${OversiktRoutes.INNTEKTSMELDING}/1017115920`]}
                >
                    <Routes>
                        <Route
                            element={<InntektsmeldingPage />}
                            path={`${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.INNTEKTSMELDING}/:journalpostId`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const EnBortfaltNaturalytelse: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/inntektsmeldinger', () =>
                    HttpResponse.json(enBortfaltNaturalytelse),
                ),
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
            ],
        },
    },
    args: {},
};

export const FlereBortfalteNaturalytelser: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/inntektsmeldinger', () =>
                    HttpResponse.json(flereBortfalteNaturalytelser),
                ),
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
            ],
        },
    },
    args: {},
};

export const UtenRefusjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/inntektsmeldinger', () => HttpResponse.json(utenRefusjon)),
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
            ],
        },
    },
    args: {},
};

export const DelvisRefusjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/inntektsmeldinger', () => HttpResponse.json(medDelvisRefusjon)),
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
            ],
        },
    },
    args: {},
};

export const MedRefusjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/inntektsmeldinger', () => HttpResponse.json(medRefusjon)),
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
            ],
        },
    },
    args: {},
};

export const Refusjonsperioder: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/inntektsmeldinger', () =>
                    HttpResponse.json(medRefusjonsPerioder),
                ),
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
            ],
        },
    },
    args: {},
};

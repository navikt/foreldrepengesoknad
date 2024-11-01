import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import enBortfaltNaturalytelse from 'storybookData/inntektsmeldinger/enBortfaltNaturalytelse.json';
import flereBortfalteNaturalytelser from 'storybookData/inntektsmeldinger/flereBortfalteNaturalytelser.json';
import medDelvisRefusjon from 'storybookData/inntektsmeldinger/medDelvisRefusjon.json';
import medRefusjon from 'storybookData/inntektsmeldinger/medRefusjon.json';
import medRefusjonsPerioder from 'storybookData/inntektsmeldinger/medRefusjonsPerioder.json';
import satser from 'storybookData/inntektsmeldinger/satser.json';
import utenRefusjon from 'storybookData/inntektsmeldinger/utenRefusjon.json';
import saker from 'storybookData/saker/saker.json';

import OversiktRoutes from '../../routes/routes';
import { InntektsmeldingPage } from './InntektsmeldingPage';

const queryClient = new QueryClient();

const meta = {
    title: 'Inntektsmelding',
    render: (args) => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter
                    initialEntries={[
                        `${OversiktRoutes.SAKSOVERSIKT}/${args.saksnummer}/${OversiktRoutes.INNTEKTSMELDING}/${args.journalpostId}`,
                    ]}
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

const HANDLERS = [
    http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
    http.get(`${import.meta.env.BASE_URL}/rest/satser`, () => HttpResponse.json(satser)),
];

export const EnBortfaltNaturalytelse: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger`, () =>
                    HttpResponse.json(enBortfaltNaturalytelse),
                ),
            ]),
        },
    },
    args: {
        saksnummer: '352011079',
        journalpostId: '1017115920',
    },
};

export const FlereBortfalteNaturalytelser: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger`, () =>
                    HttpResponse.json(flereBortfalteNaturalytelser),
                ),
            ]),
        },
    },
    args: {
        saksnummer: '352011079',
        journalpostId: '1017115920',
    },
};

export const UtenRefusjon: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger`, () =>
                    HttpResponse.json(utenRefusjon),
                ),
            ]),
        },
    },
    args: {
        saksnummer: '352011079',
        journalpostId: '1017115920',
    },
};

export const DelvisRefusjon: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger`, () =>
                    HttpResponse.json(medDelvisRefusjon),
                ),
            ]),
        },
    },
    args: {
        saksnummer: '308',
        journalpostId: '1017115920',
    },
};

export const MedRefusjon: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger`, () =>
                    HttpResponse.json(medRefusjon),
                ),
            ]),
        },
    },
    args: {
        saksnummer: '352011079',
        journalpostId: '1017115920',
    },
};

export const Refusjonsperioder: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/inntektsmeldinger`, () =>
                    HttpResponse.json(medRefusjonsPerioder),
                ),
            ]),
        },
    },
    args: {
        saksnummer: '352011079',
        journalpostId: '1017115920',
    },
};

import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { enBortfaltNaturalytelse } from 'storybookData/inntektsmeldinger/enBortfaltNaturalytelse';
import { flereBortfalteNaturalytelser } from 'storybookData/inntektsmeldinger/flereBortfalteNaturalytelser';
import { medDelvisRefusjon } from 'storybookData/inntektsmeldinger/medDelvisRefusjon';
import { medRefusjon } from 'storybookData/inntektsmeldinger/medRefusjon';
import { medRefusjonsPerioder } from 'storybookData/inntektsmeldinger/medRefusjonsPerioder';
import { utenRefusjon } from 'storybookData/inntektsmeldinger/utenRefusjon';
import { saker } from 'storybookData/saker/saker';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/api.ts';
import { OversiktRoutes } from '../../routes/routes';
import { InntektsmeldingPage } from './InntektsmeldingPage';

const meta = {
    title: 'Inntektsmelding',
    decorators: [withQueryClient],
    render: (args) => {
        return (
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
        );
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const HANDLERS = [
    http.get(API_URLS.saker, () => HttpResponse.json(saker)),
    http.get(API_URLS.satser, () => HttpResponse.json(DEFAULT_SATSER)),
];

export const EnBortfaltNaturalytelse: Story = {
    parameters: {
        msw: {
            handlers: HANDLERS.concat([
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json(enBortfaltNaturalytelse)),
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
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json(flereBortfalteNaturalytelser)),
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
            handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(utenRefusjon))]),
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
            handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(medDelvisRefusjon))]),
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
            handlers: HANDLERS.concat([http.get(API_URLS.inntektsmelding, () => HttpResponse.json(medRefusjon))]),
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
                http.get(API_URLS.inntektsmelding, () => HttpResponse.json(medRefusjonsPerioder)),
            ]),
        },
    },
    args: {
        saksnummer: '352011079',
        journalpostId: '1017115920',
    },
};

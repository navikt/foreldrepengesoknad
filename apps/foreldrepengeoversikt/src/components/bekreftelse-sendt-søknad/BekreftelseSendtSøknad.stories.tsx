import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';
import { søkerinfo, søkerinfoUtenArbeidsforhold } from 'storybookData/sokerinfo/sokerinfo';

import { Skjemanummer } from '@navikt/fp-constants';
import { TidslinjeHendelseDto } from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { OversiktRoutes } from '../../routes/routes.ts';
import { BekreftelseSendtSøknad } from './BekreftelseSendtSøknad';

const defaultHandlers = {
    msw: {
        handlers: [
            http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () => HttpResponse.json(søkerinfo)),
            http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
        ],
    },
};

const meta = {
    title: 'BekreftelseSendtSøknad',
    component: BekreftelseSendtSøknad,
    decorators: [withQueryClient],
    parameters: defaultHandlers,
    render: ({ saksnummer, ...props }) => (
        <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/${saksnummer}`]}>
            <Routes>
                <Route
                    element={<BekreftelseSendtSøknad {...props} />}
                    path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`}
                />
            </Routes>
        </MemoryRouter>
    ),
} satisfies Meta<typeof BekreftelseSendtSøknad & { saksnummer: string }>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ForForeldrepenger: Story = {
    args: {
        saksnummer: '352011079',
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            aktørType: 'BRUKER',
            tidslinjeHendelseType: 'INNTEKTSMELDING',
            dokumenter: [
                {
                    dokumentId: '1',
                    journalpostId: '1',
                    tittel: 'Søknad',
                },
            ],
        } satisfies TidslinjeHendelseDto,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: 'FORELDREPENGER',
        harMinstEttArbeidsforhold: true,
        manglendeVedlegg: [],
    },
};

export const ForForeldrepengerNårEnIkkeHarArbeidsforhold: Story = {
    args: {
        ...ForForeldrepenger.args,
        harMinstEttArbeidsforhold: false,
    },
    parameters: {
        msw: {
            handlers: [
                http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () =>
                    HttpResponse.json(søkerinfoUtenArbeidsforhold),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
            ],
        },
    },
};

export const ForForeldrepengerManglerDokumentasjon: Story = {
    args: {
        ...ForForeldrepenger.args,
        manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK],
    },
};

export const ForForeldrepengerUtenTidligsteBehandlingsdato: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            aktørType: 'BRUKER',
            tidslinjeHendelseType: 'INNTEKTSMELDING',
            dokumenter: [
                {
                    dokumentId: '1',
                    journalpostId: '1',
                    tittel: 'Søknad',
                },
            ],
        } satisfies TidslinjeHendelseDto,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: 'FORELDREPENGER',
        harMinstEttArbeidsforhold: true,
        manglendeVedlegg: [],
    },
};

export const ForEngangsstønad: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            aktørType: 'BRUKER',
            tidslinjeHendelseType: 'INNTEKTSMELDING',
            dokumenter: [
                {
                    dokumentId: '1',
                    journalpostId: '1',
                    tittel: 'Søknad',
                },
            ],
        } satisfies TidslinjeHendelseDto,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: 'ENGANGSSTØNAD',
        harMinstEttArbeidsforhold: true,
        manglendeVedlegg: [],
    },
};

export const ForEngangsstønadManglerDokumentasjon: Story = {
    args: {
        ...ForEngangsstønad.args,
        manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK],
    },
};

export const ForSvangerskapspenger: Story = {
    args: {
        saksnummer: '308',
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            aktørType: 'BRUKER',
            tidslinjeHendelseType: 'INNTEKTSMELDING',
            dokumenter: [
                {
                    dokumentId: '1',
                    journalpostId: '1',
                    tittel: 'Søknad',
                },
            ],
        } satisfies TidslinjeHendelseDto,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: 'SVANGERSKAPSPENGER',
        harMinstEttArbeidsforhold: true,
        manglendeVedlegg: [],
    },
};

export const ForSvangerskapspengerUtenArbeidsforhold: Story = {
    args: {
        ...ForSvangerskapspenger.args,
        harMinstEttArbeidsforhold: false,
    },
    parameters: {
        msw: {
            handlers: [
                http.get(`${import.meta.env.BASE_URL}/rest/sokerinfo`, () =>
                    HttpResponse.json(søkerinfoUtenArbeidsforhold),
                ),
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)),
            ],
        },
    },
};

export const ForSvangerskapspengerUtenTidligsteBehandlingsdato: Story = {
    args: {
        saksnummer: '308',
        relevantNyTidslinjehendelse: {
            aktørType: 'BRUKER',
            tidslinjeHendelseType: 'INNTEKTSMELDING',
            opprettet: new Date().toISOString(),
            dokumenter: [
                {
                    dokumentId: '1',
                    journalpostId: '1',
                    tittel: 'Søknad',
                },
            ],
        } satisfies TidslinjeHendelseDto,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: 'SVANGERSKAPSPENGER',
        harMinstEttArbeidsforhold: true,
        manglendeVedlegg: [],
    },
};

export const ForSvangerskapspengerManglerDokumentasjon: Story = {
    args: {
        ...ForSvangerskapspenger.args,
        manglendeVedlegg: [Skjemanummer.DOK_UTDANNING_MOR, Skjemanummer.TERMINBEKREFTELSE],
    },
};

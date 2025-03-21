import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';

import { Skjemanummer } from '@navikt/fp-constants';
import { DokumentType, Tidslinjehendelse, Ytelse } from '@navikt/fp-types';

import { BekreftelseSendtSøknad } from './BekreftelseSendtSøknad';

const meta = {
    title: 'BekreftelseSendtSøknad',
    component: BekreftelseSendtSøknad,
    render: (props) => (
        <MemoryRouter>
            <BekreftelseSendtSøknad {...props} />
        </MemoryRouter>
    ),
} satisfies Meta<typeof BekreftelseSendtSøknad>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ForForeldrepenger: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            tidligstBehandlingsDato: new Date().toISOString(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date().toISOString(),
                    saksnummer: '1212',
                    tittel: 'Søknad',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.FORELDREPENGER,
        harMinstEttArbeidsforhold: true,
    },
};

export const ForForeldrepengerNårEnIkkeHarArbeidsforhold: Story = {
    args: {
        ...ForForeldrepenger.args,
        harMinstEttArbeidsforhold: false,
    },
};

export const ForForeldrepengerManglerDokumentasjon: Story = {
    args: {
        ...ForForeldrepenger.args,
        manglendeVedlegg: [Skjemanummer.HV_ØVELSE, Skjemanummer.NAV_TILTAK],
        saksnummer: '12345',
    },
};

export const ForForeldrepengerUtenTidligsteBehandlingsdato: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date().toISOString(),
                    saksnummer: '1212',
                    tittel: 'Søknad',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.FORELDREPENGER,
        harMinstEttArbeidsforhold: true,
    },
};

export const ForEngangsstønad: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            tidligstBehandlingsDato: new Date().toISOString(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date().toISOString(),
                    saksnummer: '1212',
                    tittel: 'Søknad',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.ENGANGSSTØNAD,
        harMinstEttArbeidsforhold: true,
    },
};

export const ForEngangsstønadManglerDokumentasjon: Story = {
    args: {
        ...ForEngangsstønad.args,
        manglendeVedlegg: [Skjemanummer.DEPRECATED_TERMINBEKREFTELSE, Skjemanummer.NAV_TILTAK],
        saksnummer: '12345',
    },
};

export const ForSvangerskapspenger: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            tidligstBehandlingsDato: new Date().toISOString(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date().toISOString(),
                    saksnummer: '1212',
                    tittel: 'Søknad',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.SVANGERSKAPSPENGER,
        harMinstEttArbeidsforhold: true,
    },
};

export const ForSvangerskapspengerUtenArbeidsforhold: Story = {
    args: {
        ...ForSvangerskapspenger.args,
        harMinstEttArbeidsforhold: false,
    },
};

export const ForSvangerskapspengerUtenTidligsteBehandlingsdato: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date().toISOString(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date().toISOString(),
                    saksnummer: '1212',
                    tittel: 'Søknad',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.SVANGERSKAPSPENGER,
        harMinstEttArbeidsforhold: true,
    },
};

export const ForSvangerskapspengerManglerDokumentasjon: Story = {
    args: {
        ...ForSvangerskapspenger.args,
        manglendeVedlegg: [Skjemanummer.DOK_UTDANNING_MOR, Skjemanummer.TERMINBEKREFTELSE],
        saksnummer: '12345',
    },
};

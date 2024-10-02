import { Meta, StoryObj } from '@storybook/react/*';

import { DokumentType } from 'app/types/DokumentType';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';

import { Ytelse } from '../../types/Ytelse';
import BekreftelseSendtSøknad from './BekreftelseSendtSøknad';

const meta = {
    title: 'BekreftelseSendtSøknad',
    component: BekreftelseSendtSøknad,
} satisfies Meta<typeof BekreftelseSendtSøknad>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ForForeldrepenger: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date(),
            tidligstBehandlingsDato: new Date(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date(),
                    saksnummer: '1212',
                    tittel: 'Søknad',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.FORELDREPENGER,
    },
};

export const ForEngangsstønad: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date(),
            tidligstBehandlingsDato: new Date(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date(),
                    saksnummer: '1212',
                    tittel: 'Søknad',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.ENGANGSSTØNAD,
    },
};

export const ForSvangerskapspenger: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date(),
            tidligstBehandlingsDato: new Date(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date(),
                    saksnummer: '1212',
                    tittel: 'Søknad',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.SVANGERSKAPSPENGER,
    },
};

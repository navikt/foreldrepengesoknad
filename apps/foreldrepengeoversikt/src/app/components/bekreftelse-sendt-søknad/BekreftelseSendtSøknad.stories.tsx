import { Meta, StoryObj } from '@storybook/react/*';
import { DokumentType } from 'types/DokumentType';
import { Tidslinjehendelse } from 'types/Tidslinjehendelse';

import { Ytelse } from '../../types/Ytelse';
import BekreftelseSendtSøknad from './BekreftelseSendtSøknad';

const meta = {
    title: 'BekreftelseSendtSøknad',
    component: BekreftelseSendtSøknad,
} satisfies Meta<typeof BekreftelseSendtSøknad>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        relevantNyTidslinjehendelse: {
            opprettet: new Date(),
            dokumenter: [
                {
                    dokumentId: '1',
                    type: DokumentType.ARBEIDSGIVER,
                    journalpostId: '1',
                    mottatt: new Date(),
                    saksnummer: '1212',
                    tittel: 'Dokumenttittel',
                    url: 'test',
                },
            ],
        } as Tidslinjehendelse,
        bankkonto: { kontonummer: '1212224', banknavn: 'Luster Sparebank' },
        ytelse: Ytelse.FORELDREPENGER,
    },
};

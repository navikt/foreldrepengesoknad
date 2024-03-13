import { StoryFn } from '@storybook/react';

import '@navikt/ds-css';

import { DokumentType } from 'app/types/DokumentType';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { Ytelse } from 'app/types/Ytelse';

import BekreftelseSendtSøknad from './BekreftelseSendtSøknad';

export default {
    title: 'BekreftelseSendtSøknad',
    component: BekreftelseSendtSøknad,
};

const Template: StoryFn<any> = () => {
    return (
        <BekreftelseSendtSøknad
            relevantNyTidslinjehendelse={
                {
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
                } as Tidslinjehendelse
            }
            bankkonto={{ kontonummer: '1212224', banknavn: 'Luster Sparebank' }}
            ytelse={Ytelse.FORELDREPENGER}
        />
    );
};

export const VisApp = Template.bind({});

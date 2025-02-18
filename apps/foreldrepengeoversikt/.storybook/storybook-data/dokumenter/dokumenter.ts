import { Dokument } from '../../../src/types/Dokument';
import { DokumentType } from '../../../src/types/DokumentType';

export const dokumenter = [
    {
        type: DokumentType.UTGÅENDE_DOKUMENT,
        mottatt: '2023-01-31T09:17:24',
        saksnummer: '352011079',
        tittel: 'Opphør Foreldrepenger',
        journalpostId: '598115880',
        dokumentId: '624862996',
        url: '',
    },
    {
        type: DokumentType.UTGÅENDE_DOKUMENT,
        mottatt: '2023-01-31T09:17:13',
        saksnummer: '352011080',
        tittel: 'Innvilgelsesbrev Foreldrepenger',
        journalpostId: '598115879',
        dokumentId: '624862995',
        url: '',
    },
    {
        type: DokumentType.INNGÅENDE_DOKUMENT,
        mottatt: '2023-01-31T09:11:56',
        saksnummer: '352011080',
        tittel: 'Søknad om foreldrepenger ved fødsel',
        journalpostId: '598115877',
        dokumentId: '624862992',
        url: '',
    },
    {
        type: DokumentType.INNGÅENDE_DOKUMENT,
        mottatt: '2023-01-31T09:11:56',
        saksnummer: '352011080',
        tittel: 'Bekreftelse på ventet fødselsdato',
        journalpostId: '598115877',
        dokumentId: '624862993',
        url: '',
    },
    {
        type: DokumentType.UTGÅENDE_DOKUMENT,
        mottatt: '2023-01-31T09:09:48',
        saksnummer: '352011079',
        tittel: 'Innvilgelsesbrev Foreldrepenger',
        journalpostId: '598115875',
        dokumentId: '624862990',
        url: '',
    },
    {
        type: DokumentType.INNGÅENDE_DOKUMENT,
        mottatt: '2023-01-31T09:06:48',
        saksnummer: '352011079',
        tittel: 'Søknad om foreldrepenger ved fødsel',
        journalpostId: '598115874',
        dokumentId: '624862989',
        url: '',
    },
    {
        type: DokumentType.INNGÅENDE_DOKUMENT,
        mottatt: '2023-01-31T09:06:48',
        saksnummer: '352011079',
        tittel: 'Bekreftelse på ventet fødselsdato',
        journalpostId: '598115877',
        dokumentId: '624862993',
        url: '',
    },
] satisfies Dokument[];

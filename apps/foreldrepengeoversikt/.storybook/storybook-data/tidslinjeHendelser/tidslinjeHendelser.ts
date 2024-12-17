import { AktørType } from '../../../src/types/AktørType';
import { DokumentType } from '../../../src/types/DokumentType';
import { Tidslinjehendelse } from '../../../src/types/Tidslinjehendelse';
import { TidslinjehendelseType } from '../../../src/types/TidslinjehendelseType';

export const tidslinjeHendelser = [
    {
        type: 'søknad',
        opprettet: '2023-01-31T09:06:46.541655',
        aktørType: AktørType.BRUKER,
        tidslinjeHendelseType: TidslinjehendelseType.FØRSTEGANGSSØKNAD,
        dokumenter: [
            {
                type: DokumentType.INNGÅENDE_DOKUMENT,
                mottatt: '2023-01-31T09:06:48',
                saksnummer: '352011079',
                tittel: 'Søknad om foreldrepenger ved fødsel',
                journalpostId: '598115874',
                dokumentId: '624862989',
            },
        ],
        manglendeVedlegg: [],
    },
    {
        type: 'vedtak',
        opprettet: '2023-01-31T09:09:48',
        aktørType: AktørType.NAV,
        tidslinjeHendelseType: TidslinjehendelseType.VEDTAK,
        dokumenter: [
            {
                type: DokumentType.UTGÅENDE_DOKUMENT,
                mottatt: '2023-01-31T09:09:48',
                saksnummer: '352011079',
                tittel: 'Innvilgelsesbrev Foreldrepenger',
                journalpostId: '598115875',
                dokumentId: '624862990',
            },
        ],
        vedtakType: 'INNVILGELSE',
    },
    {
        type: 'vedtak',
        opprettet: '2023-01-31T09:17:13',
        aktørType: AktørType.NAV,
        tidslinjeHendelseType: TidslinjehendelseType.VEDTAK,
        dokumenter: [
            {
                type: DokumentType.UTGÅENDE_DOKUMENT,
                mottatt: '2023-01-31T09:17:13',
                saksnummer: '352011080',
                tittel: 'Innvilgelsesbrev Foreldrepenger',
                journalpostId: '598115879',
                dokumentId: '624862995',
            },
        ],
        vedtakType: 'INNVILGELSE',
    },
    {
        type: 'vedtak',
        opprettet: '2023-01-31T09:17:24',
        aktørType: AktørType.NAV,
        tidslinjeHendelseType: TidslinjehendelseType.VEDTAK,
        dokumenter: [
            {
                type: DokumentType.UTGÅENDE_DOKUMENT,
                mottatt: '2023-01-31T09:17:24',
                saksnummer: '352011079',
                tittel: 'Opphør Foreldrepenger',
                journalpostId: '598115880',
                dokumentId: '624862996',
            },
        ],
        vedtakType: 'INNVILGELSE',
    },
    {
        type: 'vedtak',
        opprettet: '2023-01-31T09:17:24',
        aktørType: AktørType.NAV,
        tidslinjeHendelseType: TidslinjehendelseType.UTGÅENDE_INNHENT_OPPLYSNINGER,
        dokumenter: [],
        vedtakType: 'INNVILGELSE',
    },
] satisfies Tidslinjehendelse[];

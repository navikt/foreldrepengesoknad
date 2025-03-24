import { TidslinjeHendelseDto } from '@navikt/fp-types';

export const tidslinjeHendelser = [
    {
        opprettet: '2023-01-31T09:06:46.541655',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                tittel: 'Søknad om foreldrepenger ved fødsel',
                journalpostId: '598115874',
                dokumentId: '624862989',
            },
        ],
    },
    {
        opprettet: '2023-01-31T09:09:48',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                tittel: 'Innvilgelsesbrev Foreldrepenger',
                journalpostId: '598115875',
                dokumentId: '624862990',
            },
        ],
    },
    {
        opprettet: '2023-01-31T09:17:13',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                tittel: 'Innvilgelsesbrev Foreldrepenger',
                journalpostId: '598115879',
                dokumentId: '624862995',
            },
        ],
    },
    {
        opprettet: '2023-01-31T09:17:24',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                tittel: 'Opphør Foreldrepenger',
                journalpostId: '598115880',
                dokumentId: '624862996',
            },
        ],
    },
    {
        opprettet: '2023-01-31T09:17:24',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'UTGÅENDE_INNHENT_OPPLYSNINGER',
        dokumenter: [],
    },
] satisfies TidslinjeHendelseDto[];

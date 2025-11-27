import { TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';

export const tidslinjeHendelserFP = [
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
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjeHendelser_FP_Adopsjon = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091674',
                dokumentId: '112091674',
                tittel: 'Søknad om foreldrepenger ved adopsjon',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjeHendelser_FP_termin_innvilget = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091677',
                dokumentId: '112091677',
                tittel: 'Søknad om foreldrepenger ved fødsel',
            },
        ],
    },
    {
        opprettet: '2025-11-27T09:10:50',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'UTGÅENDE_ETTERLYS_INNTEKTSMELDING',
        dokumenter: [
            {
                journalpostId: '112091678',
                dokumentId: '112091678',
                tittel: 'Etterlys inntektsmelding',
            },
        ],
    },
    {
        opprettet: '2025-11-27T09:10:52.744',
        aktørType: 'ARBEIDSGIVER',
        tidslinjeHendelseType: 'INNTEKTSMELDING',
        dokumenter: [
            {
                journalpostId: '112091679',
                tittel: '',
            },
        ],
    },
    {
        opprettet: '2025-11-27T09:10:55',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                journalpostId: '112091680',
                dokumentId: '112091680',
                tittel: 'Innvilgelsesbrev Foreldrepenger',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjeHendelser_FP_tilbakekreving = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091702',
                dokumentId: '112091702',
                tittel: 'Søknad om foreldrepenger ved fødsel',
            },
        ],
    },
    {
        opprettet: '2025-11-27T09:33:21.731',
        aktørType: 'ARBEIDSGIVER',
        tidslinjeHendelseType: 'INNTEKTSMELDING',
        dokumenter: [
            {
                journalpostId: '112091703',
                tittel: '',
            },
        ],
    },
    {
        opprettet: '2025-11-27T09:33:24',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                journalpostId: '112091704',
                dokumentId: '112091704',
                tittel: 'Innvilgelsesbrev Foreldrepenger',
            },
        ],
    },
    {
        opprettet: '2025-11-27T09:33:33',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                journalpostId: '112091705',
                dokumentId: '112091705',
                tittel: 'Opphør Foreldrepenger',
            },
        ],
    },
    {
        opprettet: '2025-11-27T09:33:34',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'UTGÅENDE_VARSEL_TILBAKEBETALING',
        dokumenter: [
            {
                journalpostId: '112091706',
                dokumentId: '112091706',
                tittel: 'Varsel tilbakebetaling foreldrepenger',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjeHendelser_FP_etterlys_IM = [
    {
        opprettet: '2025-10-30T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091710',
                dokumentId: '112091710',
                tittel: 'Søknad om foreldrepenger ved fødsel',
            },
        ],
    },
    {
        opprettet: '2025-11-27T09:42:36',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'UTGÅENDE_ETTERLYS_INNTEKTSMELDING',
        dokumenter: [
            {
                journalpostId: '112091711',
                dokumentId: '112091711',
                tittel: 'Etterlys inntektsmelding',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjehendelser_FP_for_tidlig_søknad = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091727',
                dokumentId: '112091727',
                tittel: 'Søknad om foreldrepenger ved fødsel',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjehendelser_ES_adopsjon_innvilget = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091728',
                dokumentId: '112091728',
                tittel: 'Søknad om engangsstønad ved adopsjon',
            },
        ],
    },
    {
        opprettet: '2025-11-27T10:51:02',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                journalpostId: '112091729',
                dokumentId: '112091729',
                tittel: 'Vedtak om innvilgelse av engangsstønad',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjehendelser_ES_adopsjon_avslag = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091730',
                dokumentId: '112091730',
                tittel: 'Søknad om engangsstønad ved adopsjon',
            },
        ],
    },
    {
        opprettet: '2025-11-27T10:53:21',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                journalpostId: '112091731',
                dokumentId: '112091731',
                tittel: 'Avslag engangsstønad',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjehendelser_ES_under_behandling = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091738',
                dokumentId: '112091738',
                tittel: 'Søknad om engangsstønad ved fødsel',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjehendelser_SVP_innvilget = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091739',
                dokumentId: '112091739',
                tittel: 'Søknad om svangerskapspenger',
            },
            {
                journalpostId: '112091739',
                dokumentId: '112091740',
                tittel: 'Skjema for tilrettelegging og omplassering ved graviditet',
            },
            {
                journalpostId: '112091739',
                dokumentId: '112091741',
                tittel: 'Skjema for tilrettelegging og omplassering ved graviditet',
            },
        ],
    },
    {
        opprettet: '2025-11-27T11:01:57.032',
        aktørType: 'ARBEIDSGIVER',
        tidslinjeHendelseType: 'INNTEKTSMELDING',
        dokumenter: [
            {
                journalpostId: '112091740',
                tittel: '',
            },
        ],
    },
    {
        opprettet: '2025-11-27T11:01:57.94',
        aktørType: 'ARBEIDSGIVER',
        tidslinjeHendelseType: 'INNTEKTSMELDING',
        dokumenter: [
            {
                journalpostId: '112091741',
                tittel: '',
            },
        ],
    },
    {
        opprettet: '2025-11-27T11:02:01',
        aktørType: 'NAV',
        tidslinjeHendelseType: 'VEDTAK',
        dokumenter: [
            {
                journalpostId: '112091742',
                dokumentId: '112091744',
                tittel: 'Innvilgelsesbrev svangerskapspenger',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

export const tidslinjehendelser_SVP_under_behandling = [
    {
        opprettet: '2025-11-27T01:00:00',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [
            {
                journalpostId: '112091757',
                dokumentId: '112091765',
                tittel: 'Søknad om svangerskapspenger',
            },
            {
                journalpostId: '112091757',
                dokumentId: '112091766',
                tittel: 'Skjema for tilrettelegging og omplassering ved graviditet',
            },
            {
                journalpostId: '112091757',
                dokumentId: '112091767',
                tittel: 'Skjema for tilrettelegging og omplassering ved graviditet',
            },
            {
                journalpostId: '112091757',
                dokumentId: '112091768',
                tittel: 'Skjema for tilrettelegging og omplassering ved graviditet',
            },
        ],
    },
] satisfies TidslinjeHendelseDto_fpoversikt[];

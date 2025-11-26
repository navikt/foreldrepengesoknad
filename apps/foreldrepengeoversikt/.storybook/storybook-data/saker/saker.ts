import { Saker_fpoversikt } from '@navikt/fp-types';

export const saker = {
    foreldrepenger: [
        {
            oppdatertTidspunkt: '2024-02-28T21:19:08.911',
            saksnummer: '1',
            sakAvsluttet: false,
            kanSøkeOmEndring: true,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '03506715317',
            },
            familiehendelse: {
                fødselsdato: '2022-07-01',
                termindato: '2022-07-01',
                antallBarn: 1,
            },
            gjeldendeVedtak: {
                perioder: [
                    {
                        fom: '2022-06-10',
                        tom: '2022-06-30',
                        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                        resultat: {
                            innvilget: true,
                            trekkerMinsterett: true,
                            trekkerDager: true,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2022-07-01',
                        tom: '2022-08-11',
                        kontoType: 'MØDREKVOTE',
                        resultat: {
                            innvilget: true,
                            trekkerMinsterett: true,
                            trekkerDager: true,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2022-08-12',
                        tom: '2022-10-13',
                        kontoType: 'MØDREKVOTE',
                        resultat: {
                            innvilget: true,
                            trekkerMinsterett: true,
                            trekkerDager: true,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2022-10-14',
                        tom: '2022-12-21',
                        kontoType: 'FELLESPERIODE',
                        resultat: {
                            innvilget: true,
                            trekkerMinsterett: true,
                            trekkerDager: true,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                        samtidigUttak: 50,
                    },
                ],
            },
            barn: [
                {
                    fnr: '01472254177',
                },
            ],
            dekningsgrad: 'HUNDRE',
            forelder: 'MOR',
        },
        {
            oppdatertTidspunkt: '2024-02-28T21:19:08.911',
            saksnummer: '352011080',
            sakAvsluttet: false,
            kanSøkeOmEndring: true,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '03506715317',
            },
            forelder: 'MOR',
            familiehendelse: {
                fødselsdato: '2023-01-10',
                termindato: '2023-01-10',
                antallBarn: 1,
            },
            gjeldendeVedtak: {
                perioder: [
                    {
                        fom: '2022-12-20',
                        tom: '2023-01-09',
                        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                        resultat: {
                            innvilget: true,
                            trekkerMinsterett: true,
                            trekkerDager: true,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2023-01-10',
                        tom: '2023-02-20',
                        kontoType: 'MØDREKVOTE',
                        resultat: {
                            innvilget: true,
                            trekkerMinsterett: true,
                            trekkerDager: true,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2023-02-21',
                        tom: '2023-04-24',
                        kontoType: 'MØDREKVOTE',
                        resultat: {
                            innvilget: true,
                            trekkerMinsterett: true,
                            trekkerDager: true,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2024-05-28',
                        tom: '2024-08-14',
                        kontoType: 'FELLESPERIODE',
                        resultat: {
                            innvilget: true,
                            trekkerMinsterett: true,
                            trekkerDager: true,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                ],
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
        },
    ],
    engangsstønad: [
        {
            saksnummer: '2',
            sakAvsluttet: false,
            gjelderAdopsjon: false,
            familiehendelse: {
                fødselsdato: '2020-01-01',
                antallBarn: 1,
            },
            oppdatertTidspunkt: '2024-02-28T21:19:08.911',
        },
    ],
    svangerskapspenger: [
        {
            saksnummer: '308',
            familiehendelse: {
                termindato: '2024-11-21',
                antallBarn: 0,
            },
            sakAvsluttet: false,
            gjeldendeVedtak: {
                arbeidsforhold: [
                    {
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: {
                                id: '991078045',
                                type: 'ORGANISASJON',
                            },
                        },
                        behovFrom: '2024-10-24',
                        tilrettelegginger: [
                            {
                                arbeidstidprosent: 0,
                                fom: '2024-10-24',
                                tom: '2024-10-30',
                                type: 'INGEN',
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 100,
                                },
                            },
                        ],
                        oppholdsperioder: [],
                        avslutningÅrsak: 'NORMAL',
                    },
                    {
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: {
                                id: '992260475',
                                type: 'ORGANISASJON',
                            },
                        },
                        behovFrom: '2024-10-17',
                        tilrettelegginger: [
                            {
                                arbeidstidprosent: 0,
                                fom: '2024-10-17',
                                tom: '2024-10-30',
                                type: 'INGEN',
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 100,
                                },
                            },
                        ],
                        oppholdsperioder: [],
                        avslutningÅrsak: 'NORMAL',
                    },
                ],
            },
            oppdatertTidspunkt: '2024-10-24T09:33:39.69',
        },
    ],
} satisfies Saker_fpoversikt;

export const sakerTidligFPSøknad = {
    foreldrepenger: [
        {
            oppdatertTidspunkt: '2024-02-28T21:19:08.911',
            saksnummer: '352011079',
            sakAvsluttet: false,
            kanSøkeOmEndring: true,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '03506715317',
            },
            forelder: 'MOR',
            familiehendelse: {
                fødselsdato: '2023-01-10',
                termindato: '2023-01-10',
                antallBarn: 1,
            },
            åpenBehandling: {
                søknadsperioder: [],
                tilstand: 'VENT_TIDLIG_SØKNAD',
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const sakerVenterPåFpInntektsmelding = {
    foreldrepenger: [
        {
            oppdatertTidspunkt: '2024-02-28T21:19:08.911',
            saksnummer: '352011079',
            sakAvsluttet: false,
            kanSøkeOmEndring: true,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '03506715317',
            },
            forelder: 'MOR',
            familiehendelse: {
                fødselsdato: '2023-01-10',
                termindato: '2023-01-10',
                antallBarn: 1,
            },
            åpenBehandling: {
                søknadsperioder: [],
                tilstand: 'VENT_INNTEKTSMELDING',
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const endringFPSøknad = {
    foreldrepenger: [
        {
            oppdatertTidspunkt: '2024-02-28T21:19:08.911',
            saksnummer: '352011079',
            sakAvsluttet: false,
            kanSøkeOmEndring: true,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '03506715317',
            },
            forelder: 'MOR',
            familiehendelse: {
                fødselsdato: '2023-01-10',
                termindato: '2023-01-10',
                antallBarn: 1,
            },
            gjeldendeVedtak: saker.foreldrepenger[0]!.gjeldendeVedtak,
            åpenBehandling: {
                søknadsperioder: [],
                tilstand: 'UNDER_BEHANDLING',
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

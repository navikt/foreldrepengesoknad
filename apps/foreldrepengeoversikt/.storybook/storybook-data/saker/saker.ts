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

export const saker_FP_adopsjon = {
    foreldrepenger: [
        {
            saksnummer: '818',
            sakAvsluttet: false,
            kanSøkeOmEndring: false,
            sakTilhørerMor: true,
            gjelderAdopsjon: true,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '18498942799',
            },
            familiehendelse: {
                fødselsdato: '2015-11-27',
                antallBarn: 1,
                omsorgsovertakelse: '2025-11-25',
            },
            åpenBehandling: {
                tilstand: 'UNDER_BEHANDLING',
                søknadsperioder: [
                    {
                        fom: '2025-11-25',
                        tom: '2026-02-03',
                        kontoType: 'MØDREKVOTE',
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                ],
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-11-27T08:49:20.215',
            forelder: 'MOR',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_FP_termin_innvilget = {
    foreldrepenger: [
        {
            saksnummer: '821',
            sakAvsluttet: false,
            kanSøkeOmEndring: true,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '02487625925',
            },
            familiehendelse: {
                termindato: '2025-11-20',
                antallBarn: 1,
            },
            gjeldendeVedtak: {
                perioder: [
                    {
                        fom: '2025-10-30',
                        tom: '2025-11-19',
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
                        fom: '2025-11-20',
                        tom: '2026-03-04',
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
                        fom: '2026-03-05',
                        tom: '2026-06-24',
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
                perioderAnnenpartEøs: [],
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-11-27T09:10:56.442',
            forelder: 'MOR',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
};

export const saker_FP_fødsel_tilbakekreving = {
    foreldrepenger: [
        {
            saksnummer: '827',
            sakAvsluttet: false,
            kanSøkeOmEndring: false,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '13468028500',
            },
            familiehendelse: {
                fødselsdato: '2025-10-27',
                termindato: '2025-10-27',
                antallBarn: 1,
            },
            gjeldendeVedtak: {
                perioder: [
                    {
                        fom: '2025-10-06',
                        tom: '2025-10-24',
                        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                        resultat: {
                            innvilget: false,
                            trekkerMinsterett: false,
                            trekkerDager: false,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2025-10-27',
                        tom: '2026-02-06',
                        kontoType: 'MØDREKVOTE',
                        resultat: {
                            innvilget: false,
                            trekkerMinsterett: false,
                            trekkerDager: false,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2026-02-09',
                        tom: '2026-05-29',
                        kontoType: 'FELLESPERIODE',
                        resultat: {
                            innvilget: false,
                            trekkerMinsterett: false,
                            trekkerDager: false,
                            årsak: 'ANNET',
                        },
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                ],
                perioderAnnenpartEøs: [],
            },
            barn: [
                {
                    fnr: '26502394265',
                },
            ],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-11-27T09:33:34.47',
            forelder: 'MOR',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_FP_etterlyst_IM = {
    foreldrepenger: [
        {
            saksnummer: '830',
            sakAvsluttet: false,
            kanSøkeOmEndring: false,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'ALENEOMSORG',
            annenPart: {
                fnr: '05437017915',
            },
            familiehendelse: {
                termindato: '2025-12-04',
                antallBarn: 1,
            },
            åpenBehandling: {
                tilstand: 'VENT_INNTEKTSMELDING',
                søknadsperioder: [
                    {
                        fom: '2025-11-13',
                        tom: '2025-12-03',
                        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2025-12-04',
                        tom: '2026-03-18',
                        kontoType: 'FORELDREPENGER',
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                    {
                        fom: '2026-04-23',
                        tom: '2026-08-12',
                        kontoType: 'FORELDREPENGER',
                        flerbarnsdager: false,
                        forelder: 'MOR',
                    },
                ],
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-11-27T09:42:36.251',
            forelder: 'MOR',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_FP_for_tidlig_søknad = {
    foreldrepenger: [
        {
            saksnummer: '837',
            sakAvsluttet: false,
            kanSøkeOmEndring: false,
            sakTilhørerMor: false,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BARE_SØKER_RETT',
            annenPart: {
                fnr: '30519210416',
            },
            familiehendelse: {
                termindato: '2026-02-01',
                antallBarn: 1,
            },
            åpenBehandling: {
                tilstand: 'VENT_TIDLIG_SØKNAD',
                søknadsperioder: [
                    {
                        fom: '2026-02-02',
                        tom: '2026-04-10',
                        kontoType: 'FORELDREPENGER',
                        morsAktivitet: 'IKKE_OPPGITT',
                        flerbarnsdager: false,
                        forelder: 'FAR_MEDMOR',
                    },
                    {
                        fom: '2026-04-13',
                        tom: '2026-11-06',
                        kontoType: 'FORELDREPENGER',
                        morsAktivitet: 'ARBEID',
                        flerbarnsdager: false,
                        forelder: 'FAR_MEDMOR',
                    },
                ],
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-11-27T10:44:22.498',
            forelder: 'FAR_MEDMOR',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_ES_adopsjon_innvilget = {
    foreldrepenger: [],
    engangsstønad: [
        {
            saksnummer: '838',
            familiehendelse: {
                fødselsdato: '2015-11-27',
                antallBarn: 1,
                omsorgsovertakelse: '2025-12-27',
            },
            sakAvsluttet: true,
            gjelderAdopsjon: true,
            oppdatertTidspunkt: '2025-11-27T10:51:02.396',
        },
    ],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_ES_adopsjon_avslag = {
    foreldrepenger: [],
    engangsstønad: [
        {
            saksnummer: '839',
            familiehendelse: {
                fødselsdato: '2015-11-27',
                antallBarn: 1,
                omsorgsovertakelse: '2025-12-27',
            },
            sakAvsluttet: true,
            gjelderAdopsjon: true,
            oppdatertTidspunkt: '2025-11-27T10:53:21.382',
        },
    ],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_ES_under_behandling = {
    foreldrepenger: [],
    engangsstønad: [
        {
            saksnummer: '842',
            familiehendelse: {
                fødselsdato: '2025-04-27',
                termindato: '2025-04-27',
                antallBarn: 1,
            },
            sakAvsluttet: false,
            åpenBehandling: {
                tilstand: 'UNDER_BEHANDLING',
            },
            gjelderAdopsjon: false,
            oppdatertTidspunkt: '2025-11-27T10:57:33.262',
        },
    ],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_SVP_innvilget = {
    foreldrepenger: [],
    engangsstønad: [],
    svangerskapspenger: [
        {
            saksnummer: '843',
            familiehendelse: {
                termindato: '2025-12-25',
                antallBarn: 0,
            },
            sakAvsluttet: false,
            gjeldendeVedtak: {
                arbeidsforhold: [
                    {
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: {
                                id: '889640782',
                                type: 'ORGANISASJON',
                            },
                            arbeidsgiverNavn: 'ARBEIDS- OG VELFERDSETATEN',
                        },
                        behovFrom: '2025-11-20',
                        tilrettelegginger: [
                            {
                                fom: '2025-11-20',
                                tom: '2025-12-03',
                                type: 'INGEN',
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 100.0,
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
                                id: '991078045',
                                type: 'ORGANISASJON',
                            },
                            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
                        },
                        behovFrom: '2025-11-27',
                        tilrettelegginger: [
                            {
                                fom: '2025-11-27',
                                tom: '2025-12-03',
                                type: 'INGEN',
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 100.0,
                                },
                            },
                        ],
                        oppholdsperioder: [],
                        avslutningÅrsak: 'NORMAL',
                    },
                ],
            },
            oppdatertTidspunkt: '2025-11-27T11:02:02.251',
        },
    ],
} satisfies Saker_fpoversikt;

export const saker_SVP_under_behandling = {
    foreldrepenger: [],
    engangsstønad: [],
    svangerskapspenger: [
        {
            saksnummer: '848',
            familiehendelse: {
                termindato: '2026-02-27',
                antallBarn: 0,
            },
            sakAvsluttet: false,
            åpenBehandling: {
                tilstand: 'UNDER_BEHANDLING',
                søknad: {
                    arbeidsforhold: [
                        {
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: {
                                    id: '992257822',
                                    type: 'ORGANISASJON',
                                },
                                arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
                            },
                            behovFrom: '2025-12-27',
                            tilrettelegginger: [
                                {
                                    fom: '2025-12-27',
                                    tom: '2026-02-05',
                                    type: 'DELVIS',
                                    arbeidstidprosent: 40.0,
                                },
                            ],
                            oppholdsperioder: [],
                        },
                        {
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: {
                                    id: '992260432',
                                    type: 'ORGANISASJON',
                                },
                                arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER BERGEN',
                            },
                            behovFrom: '2025-11-27',
                            tilrettelegginger: [
                                {
                                    fom: '2025-11-27',
                                    tom: '2026-02-05',
                                    type: 'HEL',
                                },
                            ],
                            oppholdsperioder: [],
                        },
                        {
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: {
                                    id: '992260475',
                                    type: 'ORGANISASJON',
                                },
                                arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
                            },
                            behovFrom: '2025-12-27',
                            tilrettelegginger: [
                                {
                                    fom: '2025-12-27',
                                    tom: '2026-02-05',
                                    type: 'INGEN',
                                },
                            ],
                            oppholdsperioder: [],
                        },
                    ],
                },
            },
            oppdatertTidspunkt: '2025-11-27T11:07:57.455',
        },
    ],
} satisfies Saker_fpoversikt;

export const saker_FP_mangler_dokumentasjon = {
    foreldrepenger: [
        {
            saksnummer: '352028412',
            sakAvsluttet: false,
            kanSøkeOmEndring: false,
            sakTilhørerMor: false,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BARE_SØKER_RETT',
            annenPart: {
                fnr: '10528544822',
            },
            familiehendelse: {
                termindato: '2025-12-11',
                antallBarn: 1,
            },
            åpenBehandling: {
                tilstand: 'VENT_DOKUMENTASJON',
                søknadsperioder: [
                    {
                        fom: '2025-12-11',
                        tom: '2026-02-18',
                        kontoType: 'FORELDREPENGER',
                        morsAktivitet: 'IKKE_OPPGITT',
                        flerbarnsdager: false,
                        forelder: 'FAR_MEDMOR',
                    },
                    {
                        fom: '2026-02-19',
                        tom: '2026-09-16',
                        kontoType: 'FORELDREPENGER',
                        morsAktivitet: 'UTDANNING',
                        flerbarnsdager: false,
                        forelder: 'FAR_MEDMOR',
                    },
                ],
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-11-27T12:33:52.644',
            forelder: 'FAR_MEDMOR',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_FP_ny_søknad = {
    foreldrepenger: [
        {
            saksnummer: '352028412',
            sakAvsluttet: false,
            kanSøkeOmEndring: false,
            sakTilhørerMor: false,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BARE_SØKER_RETT',
            annenPart: {
                fnr: '10528544822',
            },
            familiehendelse: {
                termindato: '2025-12-11',
                antallBarn: 1,
            },
            åpenBehandling: {
                tilstand: 'VENT_DOKUMENTASJON',
                søknadsperioder: [
                    {
                        fom: '2025-12-11',
                        tom: '2026-02-18',
                        kontoType: 'FORELDREPENGER',
                        morsAktivitet: 'IKKE_OPPGITT',
                        flerbarnsdager: false,
                        forelder: 'FAR_MEDMOR',
                    },
                    {
                        fom: '2026-02-19',
                        tom: '2026-09-16',
                        kontoType: 'FORELDREPENGER',
                        morsAktivitet: 'UTDANNING',
                        flerbarnsdager: false,
                        forelder: 'FAR_MEDMOR',
                    },
                ],
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-11-27T12:45:54.033',
            forelder: 'FAR_MEDMOR',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

export const saker_beregning = {
    foreldrepenger: [
        {
            saksnummer: '502',
            sakAvsluttet: false,
            kanSøkeOmEndring: true,
            sakTilhørerMor: true,
            gjelderAdopsjon: false,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '09418027387',
            },
            familiehendelse: {
                fødselsdato: '2025-12-18',
                termindato: '2025-12-18',
                antallBarn: 1,
            },
            gjeldendeVedtak: {
                perioder: [
                    {
                        fom: '2025-11-27',
                        tom: '2025-12-17',
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
                        fom: '2025-12-18',
                        tom: '2026-04-01',
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
                        fom: '2026-04-02',
                        tom: '2026-07-22',
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
                perioderAnnenpartEøs: [],
                beregningsgrunnlag: {
                    skjæringsTidspunkt: '2025-11-27',
                    beregningsAndeler: [
                        {
                            aktivitetStatus: 'ARBEIDSTAKER',
                            fastsattPrÅr: 500000.0,
                            inntektsKilde: 'SKJØNNSFASTSATT',
                            arbeidsforhold: {
                                arbeidsgiverIdent: '992257822',
                                refusjonPrMnd: 41666.0,
                            },
                            dagsatsArbeidsgiver: 1923,
                            dagsatsSøker: 0,
                        },
                        {
                            aktivitetStatus: 'FRILANSER',
                            fastsattPrÅr: 500000.0,
                            inntektsKilde: 'SKJØNNSFASTSATT',
                            dagsatsSøker: 1081,
                        },
                    ],
                    beregningAktivitetStatuser: [
                        {
                            aktivitetStatus: 'KOMBINERT_AT_FL',
                            hjemmel: 'F_14_7_8_40',
                        },
                    ],
                },
            },
            barn: [
                {
                    fnr: '05482365304',
                },
            ],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-12-18T11:05:06.295',
            forelder: 'MOR',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker_fpoversikt;

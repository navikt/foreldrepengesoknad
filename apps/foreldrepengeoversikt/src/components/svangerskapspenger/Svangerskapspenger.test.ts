import { SvangerskapspengeSak } from '../../types/SvangerskapspengeSak';
import { Ytelse } from '../../types/Ytelse';
import { lagKronologiskeSvpPerioder } from './Svangerskapspenger';

describe('lagKronologiskeSvpPerioder', () => {
    it('Case 1', async () => {
        const perioder = lagKronologiskeSvpPerioder(SAK_1);
        expect(perioder).toEqual(PERIODER_1);
    });
    it('Case 2', async () => {
        const perioder = lagKronologiskeSvpPerioder(SAK_2);
        expect(perioder).toEqual(PERIODER_2);
    });
    it('Case 3', async () => {
        const perioder = lagKronologiskeSvpPerioder(SAK_3);
        expect(perioder).toEqual(PERIODER_3);
    });
    it('Case 4', async () => {
        const perioder = lagKronologiskeSvpPerioder(SAK_4);
        expect(perioder).toEqual(PERIODER_4);
    });
});

const SAK_1 = {
    saksnummer: '202',
    familiehendelse: {
        termindato: '2025-06-05',
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
                    arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
                },
                behovFrom: '2025-04-05',
                tilrettelegginger: [
                    {
                        fom: '2025-04-05',
                        tom: '2025-04-12',
                        type: 'DELVIS',
                        arbeidstidprosent: 40,
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 60,
                        },
                    },
                    {
                        fom: '2025-05-01',
                        tom: '2025-05-14',
                        type: 'DELVIS',
                        arbeidstidprosent: 40,
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 60,
                        },
                    },
                ],
                oppholdsperioder: [
                    {
                        fom: '2025-04-13',
                        tom: '2025-04-30',
                        årsak: 'SYKEPENGER',
                        oppholdKilde: 'SAKSBEHANDLER',
                    },
                ],
                avslutningÅrsak: 'NORMAL',
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
                behovFrom: '2025-03-05',
                tilrettelegginger: [],
                oppholdsperioder: [],
                avslutningÅrsak: 'TILBAKE_I_HEL_STILLING',
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
                behovFrom: '2025-04-05',
                tilrettelegginger: [
                    {
                        fom: '2025-04-05',
                        tom: '2025-04-09',
                        type: 'INGEN',
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 100,
                        },
                    },
                    {
                        fom: '2025-04-15',
                        tom: '2025-05-14',
                        type: 'INGEN',
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 100,
                        },
                    },
                ],
                oppholdsperioder: [
                    {
                        fom: '2025-04-10',
                        tom: '2025-04-14',
                        årsak: 'FERIE',
                        oppholdKilde: 'SAKSBEHANDLER',
                    },
                ],
                avslutningÅrsak: 'NORMAL',
            },
        ],
    },
    oppdatertTidspunkt: '2025-03-05T19:59:55.57',
    ytelse: Ytelse.SVANGERSKAPSPENGER,
} satisfies SvangerskapspengeSak;
const PERIODER_1 = [
    {
        fom: '2025-04-05',
        tom: '2025-04-09',
        type: 'DELVIS',
        arbeidstidprosent: 40,
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 60,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-05',
        tom: '2025-04-09',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992260475',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-10',
        tom: '2025-04-12',
        type: 'DELVIS',
        arbeidstidprosent: 40,
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 60,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-10',
        tom: '2025-04-12',
        årsak: 'FERIE',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992260475',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-13',
        tom: '2025-04-14',
        årsak: 'FERIE',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992260475',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-13',
        tom: '2025-04-14',
        årsak: 'SYKEPENGER',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-15',
        tom: '2025-04-30',
        årsak: 'SYKEPENGER',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-15',
        tom: '2025-04-30',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992260475',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-05-01',
        tom: '2025-05-14',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992260475',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-05-01',
        tom: '2025-05-14',
        type: 'DELVIS',
        arbeidstidprosent: 40,
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 60,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-05',
        avslutningÅrsak: 'NORMAL',
    },
];

const SAK_2 = {
    saksnummer: '1',
    familiehendelse: {
        termindato: '2025-04-03',
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
                behovFrom: '2025-03-06',
                tilrettelegginger: [
                    {
                        fom: '2025-03-06',
                        tom: '2025-03-12',
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
                    arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
                },
                behovFrom: '2025-02-27',
                tilrettelegginger: [
                    {
                        fom: '2025-02-27',
                        tom: '2025-03-12',
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
    oppdatertTidspunkt: '2025-03-06T09:24:34.799',
    ytelse: Ytelse.SVANGERSKAPSPENGER,
} satisfies SvangerskapspengeSak;
const PERIODER_2 = [
    {
        fom: '2025-02-27',
        tom: '2025-03-05',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992260475',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
        },
        behovFrom: '2025-02-27',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-03-06',
        tom: '2025-03-12',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992260475',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
        },
        behovFrom: '2025-02-27',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-03-06',
        tom: '2025-03-12',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '889640782',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'ARBEIDS- OG VELFERDSETATEN',
        },
        behovFrom: '2025-03-06',
        avslutningÅrsak: 'NORMAL',
    },
];

const SAK_3 = {
    saksnummer: '101',
    familiehendelse: {
        termindato: '2025-06-06',
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
                    arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
                },
                behovFrom: '2025-04-06',
                tilrettelegginger: [
                    {
                        fom: '2025-04-06',
                        tom: '2025-05-15',
                        type: 'DELVIS',
                        arbeidstidprosent: 40,
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 60,
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
                        id: '992257822',
                        type: 'ORGANISASJON',
                    },
                    arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
                },
                behovFrom: '2025-04-06',
                tilrettelegginger: [
                    {
                        fom: '2025-04-06',
                        tom: '2025-05-15',
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
                    arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
                },
                behovFrom: '2025-03-06',
                tilrettelegginger: [],
                oppholdsperioder: [],
                avslutningÅrsak: 'TILBAKE_I_HEL_STILLING',
            },
        ],
    },
    oppdatertTidspunkt: '2025-03-06T10:02:20.368',
    ytelse: Ytelse.SVANGERSKAPSPENGER,
} satisfies SvangerskapspengeSak;
const PERIODER_3 = [
    {
        fom: '2025-04-06',
        tom: '2025-05-15',
        type: 'DELVIS',
        arbeidstidprosent: 40,
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 60,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-06',
        tom: '2025-05-15',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992257822',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
];

const SAK_4 = {
    saksnummer: '101',
    familiehendelse: {
        termindato: '2025-06-06',
        antallBarn: 0,
    },
    sakAvsluttet: false,
    gjeldendeVedtak: {
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
                behovFrom: '2025-04-06',
                tilrettelegginger: [
                    {
                        fom: '2025-04-06',
                        tom: '2025-04-15',
                        type: 'INGEN',
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 100,
                        },
                    },
                    {
                        fom: '2025-04-23',
                        tom: '2025-05-15',
                        type: 'INGEN',
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 100,
                        },
                    },
                ],
                oppholdsperioder: [
                    {
                        fom: '2025-04-16',
                        tom: '2025-04-17',
                        årsak: 'SYKEPENGER',
                        oppholdKilde: 'SAKSBEHANDLER',
                    },
                    {
                        fom: '2025-04-18',
                        tom: '2025-04-22',
                        årsak: 'FERIE',
                        oppholdKilde: 'SAKSBEHANDLER',
                    },
                ],
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
                behovFrom: '2025-04-06',
                tilrettelegginger: [
                    {
                        fom: '2025-04-06',
                        tom: '2025-04-13',
                        type: 'DELVIS',
                        arbeidstidprosent: 40,
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 60,
                        },
                    },
                    {
                        fom: '2025-04-21',
                        tom: '2025-05-12',
                        type: 'DELVIS',
                        arbeidstidprosent: 40,
                        resultat: {
                            resultatType: 'INNVILGET',
                            utbetalingsgrad: 60,
                        },
                    },
                ],
                oppholdsperioder: [
                    {
                        fom: '2025-05-13',
                        tom: '2025-05-15',
                        årsak: 'FERIE',
                        oppholdKilde: 'SAKSBEHANDLER',
                    },
                    {
                        fom: '2025-04-14',
                        tom: '2025-04-20',
                        årsak: 'FERIE',
                        oppholdKilde: 'SAKSBEHANDLER',
                    },
                ],
                avslutningÅrsak: 'NORMAL',
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
                behovFrom: '2025-03-06',
                tilrettelegginger: [],
                oppholdsperioder: [],
                avslutningÅrsak: 'TILBAKE_I_HEL_STILLING',
            },
        ],
    },
    oppdatertTidspunkt: '2025-03-06T10:15:43.751',
    ytelse: Ytelse.SVANGERSKAPSPENGER,
} satisfies SvangerskapspengeSak;
const PERIODER_4 = [
    {
        fom: '2025-04-06',
        tom: '2025-04-13',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992257822',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-06',
        tom: '2025-04-13',
        type: 'DELVIS',
        arbeidstidprosent: 40,
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 60,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-14',
        tom: '2025-04-15',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992257822',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-14',
        tom: '2025-04-15',
        årsak: 'FERIE',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-16',
        tom: '2025-04-17',
        årsak: 'FERIE',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-16',
        tom: '2025-04-17',
        årsak: 'SYKEPENGER',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992257822',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-18',
        tom: '2025-04-20',
        årsak: 'FERIE',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-18',
        tom: '2025-04-20',
        årsak: 'FERIE',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992257822',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-21',
        tom: '2025-04-22',
        årsak: 'FERIE',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992257822',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-21',
        tom: '2025-04-22',
        type: 'DELVIS',
        arbeidstidprosent: 40,
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 60,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-23',
        tom: '2025-05-12',
        type: 'DELVIS',
        arbeidstidprosent: 40,
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 60,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-23',
        tom: '2025-05-12',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992257822',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-05-13',
        tom: '2025-05-15',
        type: 'INGEN',
        resultat: {
            resultatType: 'INNVILGET',
            utbetalingsgrad: 100,
        },
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '992257822',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-05-13',
        tom: '2025-05-15',
        årsak: 'FERIE',
        oppholdKilde: 'SAKSBEHANDLER',
        aktivitet: {
            type: 'ORDINÆRT_ARBEID',
            arbeidsgiver: {
                id: '991078045',
                type: 'ORGANISASJON',
            },
            arbeidsgiverNavn: 'NAV KLAGEINSTANS MIDT-NORGE',
        },
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
];

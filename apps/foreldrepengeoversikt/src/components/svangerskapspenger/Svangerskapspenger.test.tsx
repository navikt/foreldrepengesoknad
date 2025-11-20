import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import { SAK_1, SAK_2, SAK_3, SAK_4 } from 'storybookData/saker/svpsaker';

import { lagKronologiskeSvpPerioder } from './Svangerskapspenger';
import * as stories from './Svangerskapspenger.stories';

const { SøknadUtenVedtak, Case1 } = composeStories(stories);

describe('lagKronologiskeSvpPerioder', () => {
    it('Case 1', () => {
        const perioder = lagKronologiskeSvpPerioder(SAK_1);
        expect(perioder).toEqual(PERIODER_1);
    });
    it('Case 2', () => {
        const perioder = lagKronologiskeSvpPerioder(SAK_2);
        expect(perioder).toEqual(PERIODER_2);
    });
    it('Case 3', () => {
        const perioder = lagKronologiskeSvpPerioder(SAK_3);
        expect(perioder).toEqual(PERIODER_3);
    });
    it('Case 4', () => {
        const perioder = lagKronologiskeSvpPerioder(SAK_4);
        expect(perioder).toEqual(PERIODER_4);
    });
});

describe('<Svangerskapspenger>', () => {
    it('Skal vise i tittel at det er fra søknaden', () => {
        render(<SøknadUtenVedtak />);
        expect(screen.getByText('Dette har du søkt om')).toBeInTheDocument();
    });
    it('Skal vise i tittel at det er fra vedtak', () => {
        render(<Case1 />);
        expect(screen.getByText('Dette har du fått vedtatt')).toBeInTheDocument();
    });
});

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
const PERIODER_4 = [
    {
        fom: '2025-04-06',
        tom: '2025-04-07',
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
        tom: '2025-04-07',
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
        fom: '2025-04-08',
        tom: '2025-04-10',
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
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-08',
        tom: '2025-04-10',
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
        fom: '2025-04-11',
        tom: '2025-04-12',
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
        behovFrom: '2025-04-06',
        avslutningÅrsak: 'NORMAL',
    },
    {
        fom: '2025-04-11',
        tom: '2025-04-12',
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
        fom: '2025-04-13',
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
        tom: '2025-04-22',
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

import { Saker_fpoversikt } from '@navikt/fp-types';

export const ingenSaker = {
    foreldrepenger: [],
    engangsstønad: [],
    svangerskapspenger: [],
};

export const saker = {
    foreldrepenger: [],
    engangsstønad: [],
    svangerskapspenger: [
        {
            saksnummer: '702',
            familiehendelse: {
                termindato: '2025-09-12',
                antallBarn: 0,
            },
            sakAvsluttet: false,
            åpenBehandling: {
                tilstand: 'VENT_INNTEKTSMELDING',
                søknad: {
                    arbeidsforhold: [
                        {
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: {
                                    id: '992260475',
                                    type: 'ORGANISASJON',
                                },
                                arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER STORD',
                            },
                            behovFrom: '2025-06-12',
                            tilrettelegginger: [
                                {
                                    fom: '2025-06-12',
                                    tom: '2025-08-21',
                                    type: 'INGEN',
                                },
                            ],
                            oppholdsperioder: [],
                        },
                    ],
                },
            },
            oppdatertTidspunkt: '2025-06-12T10:45:38.358',
        },
    ],
} satisfies Saker_fpoversikt;

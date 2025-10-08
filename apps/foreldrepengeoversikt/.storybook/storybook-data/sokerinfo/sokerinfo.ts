import dayjs from 'dayjs';

import { PersonMedArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

export const søkerinfo = {
    person: {
        fnr: '26430359419',
        navn: {
            fornavn: 'Hardhudet',
            etternavn: 'Bokstav',
        },
        kjønn: 'K',
        fødselsdato: '2003-03-26',
        bankkonto: {
            kontonummer: '23232323',
            banknavn: '',
        },
        barn: [
            {
                fnr: '01472254177',
                navn: {
                    fornavn: 'Magnífico',
                    etternavn: 'Fattigmannskost',
                },
                kjønn: 'M',
                fødselsdato: dayjs().subtract(2, 'months').format('YYYY-MM-DD'),
                annenPart: {
                    fnr: '03506715317',
                    navn: {
                        fornavn: 'Aritmetisk',
                        etternavn: 'Okse',
                    },
                    fødselsdato: '1967-10-03',
                },
            },
        ],
    },
    arbeidsforhold: [
        {
            arbeidsgiverId: '992257822',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'NAV FAMILIE- OG PENSJONSYTELSER OSLO',
            stillingsprosent: 50,
            from: dayjs().subtract(2, 'year').format('YYYY-MM-DD'),
        },
    ],
} satisfies PersonMedArbeidsforholdDto_fpoversikt;

export const søkerinfoUtenArbeidsforhold = {
    person: {
        fnr: '26430359419',
        navn: {
            fornavn: 'Hardhudet',
            etternavn: 'Bokstav',
        },
        kjønn: 'K',
        fødselsdato: '2003-03-26',
        bankkonto: {
            kontonummer: '23232323',
            banknavn: '',
        },
        barn: [
            {
                fnr: '01472254177',
                navn: {
                    fornavn: 'Magnífico',
                    etternavn: 'Fattigmannskost',
                },
                kjønn: 'M',
                fødselsdato: dayjs().subtract(2, 'months').format('YYYY-MM-DD'),
                annenPart: {
                    fnr: '03506715317',
                    navn: {
                        fornavn: 'Aritmetisk',
                        etternavn: 'Okse',
                    },
                    fødselsdato: '1967-10-03',
                },
            },
        ],
    },
    arbeidsforhold: [],
} satisfies PersonMedArbeidsforholdDto_fpoversikt;

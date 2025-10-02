import dayjs from 'dayjs';

import { Søkerinfo } from '@navikt/fp-types';

export const søkerinfo = {
    søker: {
        fnr: '26430359419',
        fornavn: 'Hardhudet',
        etternavn: 'Bokstav',
        kjønn: 'K',
        fødselsdato: '2003-03-26',
        bankkonto: {
            kontonummer: '23232323',
            banknavn: '',
        },
        barn: [
            {
                fnr: '01472254177',
                fornavn: 'Magnífico',
                etternavn: 'Fattigmannskost',
                kjønn: 'M',
                fødselsdato: dayjs().subtract(2, 'months').format('YYYY-MM-DD'),
                annenForelder: {
                    fnr: '03506715317',
                    fornavn: 'Aritmetisk',
                    etternavn: 'Okse',
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
            fom: dayjs().subtract(2, 'year').format('YYYY-MM-DD'),
        },
    ],
} satisfies Søkerinfo;

export const søkerinfoUtenArbeidsforhold = {
    søker: {
        fnr: '26430359419',
        fornavn: 'Hardhudet',
        etternavn: 'Bokstav',
        kjønn: 'K',
        fødselsdato: '2003-03-26',
        bankkonto: {
            kontonummer: '23232323',
            banknavn: '',
        },
        barn: [
            {
                fnr: '01472254177',
                fornavn: 'Magnífico',
                etternavn: 'Fattigmannskost',
                kjønn: 'M',
                fødselsdato: dayjs().subtract(2, 'months').format('YYYY-MM-DD'),
                annenForelder: {
                    fnr: '03506715317',
                    fornavn: 'Aritmetisk',
                    etternavn: 'Okse',
                    fødselsdato: '1967-10-03',
                },
            },
        ],
    },
    arbeidsforhold: [],
} satisfies Søkerinfo;

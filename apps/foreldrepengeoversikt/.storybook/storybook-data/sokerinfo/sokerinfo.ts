import dayjs from 'dayjs';

import { OversiktPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

export const søkerinfo = {
    fnr: '26430359419',
    navn: {
        fornavn: 'Hardhudet',
        etternavn: 'Bokstav',
    },
    fødselsdato: '2003-03-26',
    kontonummer: '23232323',
    harArbeidsforhold: true,
    barn: [
        {
            fnr: '01472254177',
            navn: {
                fornavn: 'Magnífico',
                etternavn: 'Fattigmannskost',
            },
            fødselsdato: dayjs().subtract(2, 'months').format('YYYY-MM-DD'),
            annenPartFornavn: 'Aritmetisk',
        },
    ],
} satisfies OversiktPersonopplysningerDto_fpoversikt;

export const søkerinfoUtenArbeidsforhold = {
    fnr: '26430359419',
    navn: {
        fornavn: 'Hardhudet',
        etternavn: 'Bokstav',
    },
    fødselsdato: '2003-03-26',
    kontonummer: '23232323',
    harArbeidsforhold: false,
    barn: [
        {
            fnr: '01472254177',
            navn: {
                fornavn: 'Magnífico',
                etternavn: 'Fattigmannskost',
            },
            fødselsdato: dayjs().subtract(2, 'months').format('YYYY-MM-DD'),
            annenPartFornavn: 'Aritmetisk',
        },
    ],
} satisfies OversiktPersonopplysningerDto_fpoversikt;

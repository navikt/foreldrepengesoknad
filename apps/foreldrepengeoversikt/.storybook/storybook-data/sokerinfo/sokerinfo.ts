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
                fødselsdato: '2022-07-01',
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

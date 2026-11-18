import { FpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

export const søkerinfo = {
    fnr: '06499121154',
    navn: {
        fornavn: 'Tapper',
        etternavn: 'Konvolutt',
    },
    kjønn: 'M',
    fødselsdato: '1991-09-06',
    barn: [],
    erGift: false,
    // Tom liste med hensikt: disse testene går "raskeste vei" gjennom søknaden og skal derfor
    // hoppe over Frilans- og EgenNæring-steget (som kun vises når brukeren har registrerte
    // frilansoppdrag/selvstendig næring).
    frilansoppdrag: [],
    selvstendigNæring: [],
    arbeidsforhold: [
        {
            arbeidsgiverId: '896929119',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'SAUEFABRIKK',
            stillingsprosent: 100,
            fom: '2018-03-01',
        },
    ],
} satisfies FpPersonopplysningerDto_fpoversikt;

export const søkerinfoKvinne = {
    ...søkerinfo,
    kjønn: 'K',
    navn: {
        fornavn: 'Modig',
        etternavn: 'Konvolutt',
    },
} satisfies FpPersonopplysningerDto_fpoversikt;

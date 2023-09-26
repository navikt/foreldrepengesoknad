import Bankkonto from './Bankkonto';

export enum Kjønn {
    MANN = 'M',
    KVINNE = 'K',
}

type Person = {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    adresse: string;
    kjønn: Kjønn;
    fødselsdato: string;
    bankkonto?: Bankkonto;
};

export default Person;

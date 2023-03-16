import Arbeidsforhold from './Arbeidsforhold';

export default interface Bankkonto {
    kontonummer: string;
    banknavn: string;
}

export enum Kjønn {
    'MANN' = 'M',
    'KVINNE' = 'K',
}

export interface PersonBase {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: Date;
}

export interface Person extends PersonBase {
    land: string;
    ikkeNordiskEøsLand: boolean;
    erMyndig: boolean;
    bankkonto?: Bankkonto;
}

export interface Søkerinfo {
    søker: Person;
    arbeidsforhold: Arbeidsforhold[];
}

import Bankkonto from './Bankkonto';
import { Kjønn } from './Kjønn';
import { Sivilstand } from './Sivilstand';

type PersonBase = {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
};

export type SøkerAnnenForelder = {
    fødselsdato?: string;
} & PersonBase;

export type SøkerBarn = {
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
} & PersonBase;

export type Søker = {
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn?: SøkerBarn[];
} & PersonBase;

import Bankkonto from './Bankkonto';
import { Kjønn } from './Kjønn';
import { Sivilstand } from './Sivilstand';

type PersonBase = {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato: string;
};

export type PersonAnnenForelder = PersonBase;

export type PersonBarn = {
    kjønn: Kjønn;
    dødsdato?: string;
    annenForelder?: PersonAnnenForelder;
} & PersonBase;

export type Person = {
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn?: PersonBarn;
} & PersonBase;

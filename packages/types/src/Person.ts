import Bankkonto from './Bankkonto';
import { Kjønn } from './Kjønn';
import { Sivilstand } from './Sivilstand';

type PersonBase = {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
};

export type RegistrertAnnenForelder = {
    fødselsdato?: string;
} & PersonBase;

export type RegistrertBarn = {
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: RegistrertAnnenForelder;
} & PersonBase;

export type Person = {
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn?: RegistrertBarn[];
} & PersonBase;

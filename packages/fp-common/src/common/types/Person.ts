import Bankkonto from './Bankkonto';
import { Kjønn } from './Kjønn';
import { Sivilstand } from './Sivilstand';

export interface PersonBase {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    sivilstand?: Sivilstand;
}

interface Person extends PersonBase {
    erMyndig: boolean;
    bankkonto?: Bankkonto;
}

export interface RegistrertBarn extends PersonBase {
    annenForelder?: RegistrertAnnenForelder;
}

export type RegistrertAnnenForelder = Omit<PersonBase, 'kjønn' | 'fødselsdato'>;

export default Person;

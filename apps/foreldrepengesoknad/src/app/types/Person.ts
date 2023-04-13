import { Kjønn } from '@navikt/fp-common';
import Bankkonto from './Bankkonto';
import { Sivilstand } from './Sivilstand';

export interface PersonBase {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: Date;
    dødsdato?: Date;
    sivilstand?: Sivilstand;
}

interface Person extends PersonBase {
    ikkeNordiskEøsLand: boolean;
    erMyndig: boolean;
    bankkonto?: Bankkonto;
}

export interface RegistrertBarn extends PersonBase {
    annenForelder?: RegistrertAnnenForelder;
}

export type RegistrertAnnenForelder = Omit<PersonBase, 'kjønn' | 'fødselsdato'>;

export default Person;

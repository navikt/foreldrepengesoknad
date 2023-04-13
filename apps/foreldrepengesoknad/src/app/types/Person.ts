import { Kjønn } from '@navikt/fp-common';
import Bankkonto from './Bankkonto';

export interface PersonBase {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: Date;
    dødsdato?: Date;
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

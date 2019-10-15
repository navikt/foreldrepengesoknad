import { Kjønn } from './common';
import Bankkonto from './Bankkonto';

export interface PersonBase {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: Date;
}

interface Person extends PersonBase {
    ikkeNordiskEøsLand: boolean;
    erMyndig: boolean;
    bankkonto?: Bankkonto;
}

export interface RegistrertBarn extends PersonBase {
    annenForelder?: RegistrertAnnenForelder;
}

export interface RegistrertAnnenForelder extends Omit<PersonBase, 'kjønn'> {
    harOpplystOmSinPågåendeSak?: boolean;
}

export type PersonPartial = Partial<Person>;

export default Person;

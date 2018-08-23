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

export interface RegistrertBarn {
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato: Date;
}

export interface RegistrertAnnenForelder extends PersonBase {
    harOpplystOmSinPågåendeSak?: boolean;
}

export interface VelgbartRegistrertBarn extends RegistrertBarn {
    checked?: boolean;
    id: string;
}

export type PersonPartial = Partial<Person>;

export default Person;

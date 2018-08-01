import { Kjønn } from './common';
import Bankkonto from './Bankkonto';

interface PersonBase {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    fnr: string;
    kjønn: Kjønn;
    fødselsdato: string;
}

interface Person extends PersonBase {
    ikkeNordiskEøsLand: boolean;
    erMyndig: boolean;
    registrerteBarn: RegistrertBarn[];
    bankkonto?: Bankkonto;
}

export interface RegistrertBarn {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    fødselsdato: Date;
}

export interface VelgbartRegistrertBarn extends RegistrertBarn {
    checked?: boolean;
    id: string;
}

export type PersonPartial = Partial<Person>;

export default Person;

import { Kjønn } from './common';

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

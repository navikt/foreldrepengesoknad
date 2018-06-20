import { Kjønn } from './common';

interface PersonBase {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    fnr: string;
    kjønn: Kjønn;
    fødselsdato: string;
}

export interface SøkersBarn extends PersonBase {
    checked: boolean;
}

interface Person extends PersonBase {
    ikkeNordiskEøsLand: boolean;
    erMyndig: boolean;
    barn: SøkersBarn[];
}

export type PersonPartial = Partial<Person>;

export default Person;

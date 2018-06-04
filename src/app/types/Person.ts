import { Kjønn } from './common';

interface Person {
    fnr: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    adresse: string;
    kjønn: Kjønn;
    fødselsdato: string;
    ikkeNordiskEøsLand: boolean;
    erMyndig: boolean;
    erFarEllerMedmor: boolean;
}

export default Person;

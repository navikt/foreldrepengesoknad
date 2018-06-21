import { Kjønn } from '../types/common';
import { SøkerRolle } from '../types/søknad/Søknad';
import moment from 'moment';
import Person from '../types/Person';

export const erFarEllerMedmor = (
    kjønn: Kjønn,
    søkerRolle: SøkerRolle
): boolean => kjønn === Kjønn.MANN || søkerRolle === SøkerRolle.MEDMOR;

export const formaterNavn = (
    fornavn: string,
    etternavn: string,
    mellomnavn?: string
) => {
    return mellomnavn
        ? `${fornavn} ${mellomnavn} ${etternavn}`
        : `${fornavn} ${etternavn}`;
};

export const erMyndig = (person: Person) => {
    const now = moment();
    const fødselsdato = moment(person.fødselsdato);
    return now.diff(fødselsdato, 'years') >= 18;
};

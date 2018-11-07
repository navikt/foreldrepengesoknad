import { SøkerRolle } from '../../types/søknad/Søknad';
import moment from 'moment';

export const getErSøkerFarEllerMedmor = (søkerRolle: SøkerRolle): boolean =>
    søkerRolle === SøkerRolle.FAR || søkerRolle === SøkerRolle.MEDMOR || søkerRolle === SøkerRolle.FORESATT2;

export const formaterNavn = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

export const erMyndig = (fødselsdato: string) => {
    const now = moment();
    const fdato = moment(fødselsdato);
    return now.diff(fdato, 'years') >= 18;
};

import { Kjønn } from '../../types/common';
import { SøkerRolle } from '../../types/søknad/Søknad';
import moment from 'moment';
import AnnenForelder from '../../types/søknad/AnnenForelder';

export const erFarEllerMedmor = (kjønn: Kjønn, søkerRolle: SøkerRolle): boolean =>
    kjønn === Kjønn.MANN || søkerRolle === SøkerRolle.MEDMOR;

export const erForelder2 = (kjønn: Kjønn, rolle: SøkerRolle): boolean =>
    rolle === SøkerRolle.FORESATT2 || erFarEllerMedmor(kjønn, rolle);

export const annenForelderSkalHaForeldrepenger = (annenForelder: AnnenForelder): boolean => {
    const { kanIkkeOppgis, harRettPåForeldrepenger } = annenForelder;
    if (kanIkkeOppgis) {
        return false;
    } else {
        return harRettPåForeldrepenger;
    }
};

export const formaterNavn = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

export const erMyndig = (fødselsdato: string) => {
    const now = moment();
    const fdato = moment(fødselsdato);
    return now.diff(fdato, 'years') >= 18;
};

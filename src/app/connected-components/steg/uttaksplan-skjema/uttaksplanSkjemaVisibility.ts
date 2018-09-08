import Søknad, { SøkerRolle, Søkersituasjon } from '../../../types/s\u00F8knad/S\u00F8knad';

export interface UttaksplanSkjemaStegVisibility {
    dekningsgradSpørsmål: boolean;
    startdatoPermisjonSpørsmål: boolean;
    planlagtOppholdIUttakSpørsmål: boolean;
    fordelingFellesperiodeSpørsmål: boolean;
}

const visDekningsgradSpørsmål = (rolle: SøkerRolle, situasjon: Søkersituasjon): boolean => {
    if (situasjon === Søkersituasjon.FØDSEL) {
        return rolle === SøkerRolle.MOR;
    }
    return true;
};

const getUttaksplanSkjemaStegVisibility = (søknad: Søknad): UttaksplanSkjemaStegVisibility => {
    const { uttaksplanSkjema } = søknad.temp;
    const dekningsgradSpørsmål = visDekningsgradSpørsmål(søknad.søker.rolle, søknad.situasjon);
    const startdatoPermisjonSpørsmål = dekningsgradSpørsmål && søknad.dekningsgrad !== undefined;
    const fordelingFellesperiodeSpørsmål =
        startdatoPermisjonSpørsmål &&
        uttaksplanSkjema.skalIkkeHaUttakFørTermin !== undefined &&
        !søknad.søker.erAleneOmOmsorg &&
        søknad.annenForelder.skalHaForeldrepenger;
    const planlagtOppholdIUttakSpørsmål = false; // Egen brukerhistorie som ikke er med enda

    return {
        dekningsgradSpørsmål,
        startdatoPermisjonSpørsmål,
        planlagtOppholdIUttakSpørsmål,
        fordelingFellesperiodeSpørsmål
    };
};

export default getUttaksplanSkjemaStegVisibility;

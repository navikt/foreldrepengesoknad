import Søknad, { SøkerRolle, Søkersituasjon } from '../../../types/s\u00F8knad/S\u00F8knad';

export interface UttaksplanSkjemaStegVisibility {
    visDekningsgradSpørsmål: boolean;
}

const visDekningsgradSpørsmål = (rolle: SøkerRolle, situasjon: Søkersituasjon): boolean => {
    if (situasjon === Søkersituasjon.FØDSEL) {
        return rolle === SøkerRolle.MOR;
    }
    return true;
};

const getUttaksplanSkjemaStegVisibility = (søknad: Søknad): UttaksplanSkjemaStegVisibility => {
    return {
        visDekningsgradSpørsmål: visDekningsgradSpørsmål(søknad.søker.rolle, søknad.situasjon)
    };
};

export default getUttaksplanSkjemaStegVisibility;

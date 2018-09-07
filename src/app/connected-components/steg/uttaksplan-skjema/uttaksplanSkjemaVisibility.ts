import Søknad, { SøkerRolle } from '../../../types/s\u00F8knad/S\u00F8knad';

export interface UttaksplanSkjemaStegVisibility {
    visDekningsgradSpørsmål: boolean;
}

const visDekningsgradSpørsmål = (rolle: SøkerRolle): boolean => {
    return rolle === SøkerRolle.MOR;
};

const getUttaksplanSkjemaStegVisibility = (søknad: Søknad): UttaksplanSkjemaStegVisibility => {
    return {
        visDekningsgradSpørsmål: visDekningsgradSpørsmål(søknad.søker.rolle)
    };
};

export default getUttaksplanSkjemaStegVisibility;

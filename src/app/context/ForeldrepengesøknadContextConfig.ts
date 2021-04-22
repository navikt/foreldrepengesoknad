import SøkersituasjonState from './types/SøkersituasjonState';
import VelkommenState from './types/VelkommenState';

export interface ForeldrepengesøknadContextState {
    søknad: {
        velkommen: VelkommenState;
        søkersituasjon: SøkersituasjonState;
    };
}

export const foreldrepengesøknadInitialState: ForeldrepengesøknadContextState = {
    søknad: {
        velkommen: {
            harForståttRettigheterOgPlikter: false,
        },
        søkersituasjon: {
            rolle: undefined as any,
            situasjon: undefined as any,
        },
    },
};

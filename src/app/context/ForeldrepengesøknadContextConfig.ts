export interface ForeldrepengesøknadContextState {
    søknad: any;
}

export const foreldrepengesøknadInitialState: ForeldrepengesøknadContextState = {
    søknad: {
        velkommen: {
            harLestOgForståttRettigheter: false,
        },
    },
};

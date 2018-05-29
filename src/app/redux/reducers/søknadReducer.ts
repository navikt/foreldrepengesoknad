import {
    SøknadAction,
    SøknadActionKeys
} from '../actions/søknad/søknadActionDefinitions';
import { SøknadPartial } from '../../types/søknad/Søknad';
import { SøknadsvedleggPartial } from '../../types/søknad/Søknadsvedlegg';

const getDefaultState = (): SøknadPartial => {
    return {
        type: 'foreldrepengesøknad',
        annenForelder: {},
        barn: {
            fødselsdatoer: []
        },
        utenlandsopphold: {},
        vedlegg: {
            omsorgsovertakelse: [],
            adopsjonsvedtak: [],
            overtakelsedokumentasjon: [],
            terminbekreftelse: [],
            fødselsattest: []
        },
        harGodkjentVilkår: false
    };
};

const updateVedlegg = (
    state: SøknadPartial,
    vedlegg: SøknadsvedleggPartial
) => ({
    ...state,
    vedlegg: { ...state.vedlegg, ...vedlegg }
});

const søknadReducer = (state = getDefaultState(), action: SøknadAction) => {
    switch (action.type) {
        case SøknadActionKeys.UPDATE_BARN:
            return {
                ...state,
                barn: { ...state.barn, ...action.payload }
            };
        case SøknadActionKeys.UPDATE_ANNEN_FORELDER:
            return {
                ...state,
                annenForelder: { ...state.annenForelder, ...action.payload }
            };
        case SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD:
            return {
                ...state,
                utenlandsopphold: {
                    ...state.utenlandsopphold,
                    ...action.payload
                }
            };
        case SøknadActionKeys.UPDATE_SØKNAD:
            return {
                ...state,
                ...action.payload
            };
        case SøknadActionKeys.UPDATE_VEDLEGG:
            return updateVedlegg(state, action.payload);
    }
    return state;
};

export default søknadReducer;

import { SvangerskapspengerContextState } from '../SvangerskapspengerContextConfig';
import { SvangerskapspengerContextAction, SvangerskapspengerContextActionKeys } from '../action/actionCreator';

const svangerskapspengerReducer = (
    state: SvangerskapspengerContextState,
    action: SvangerskapspengerContextAction
): SvangerskapspengerContextState => {
    switch (action.type) {
        case SvangerskapspengerContextActionKeys.SET_BARN:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    barn: action.payload,
                },
            };
        case SvangerskapspengerContextActionKeys.SET_SØKER:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    søker: action.payload,
                },
            };
        case SvangerskapspengerContextActionKeys.SET_SØKER:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    søker: action.payload,
                },
            };
        case SvangerskapspengerContextActionKeys.SET_SØKERINFO:
            return {
                ...state,
                søkerinfo: { ...action.payload },
            };

        case SvangerskapspengerContextActionKeys.SET_CURRENT_ROUTE:
            return {
                ...state,
                currentRoute: action.payload,
            };
        case SvangerskapspengerContextActionKeys.SET_CURRENT_TILRETTELEGGING_ID:
            return {
                ...state,
                currentTilretteleggingId: action.payload,
            };
        case SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    harGodkjentVilkår: action.payload,
                },
            };
        case SvangerskapspengerContextActionKeys.SET_UTENLANDSOPPHOLD:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    informasjonOmUtenlandsopphold: action.payload,
                },
            };
        case SvangerskapspengerContextActionKeys.SET_TILRETTELEGGING_BEHOV:
            return {
                ...state,
                tilretteleggingBehov: action.payload,
            };
        case SvangerskapspengerContextActionKeys.SET_VEDLEGG:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    vedlegg: action.payload,
                },
            };
        default:
            return state;
    }
};

export default svangerskapspengerReducer;

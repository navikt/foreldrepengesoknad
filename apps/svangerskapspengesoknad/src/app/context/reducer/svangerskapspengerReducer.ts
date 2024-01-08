import { SvangerskapspengerContextState, svangerskapspengerInitialState } from '../SvangerskapspengerContextConfig';
import { SvangerskapspengerContextAction, SvangerskapspengerContextActionKeys } from '../action/actionCreator';

const svangerskapspengerReducer = (
    state: SvangerskapspengerContextState,
    action: SvangerskapspengerContextAction,
): SvangerskapspengerContextState => {
    switch (action.type) {
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
        case SvangerskapspengerContextActionKeys.SET_TILRETTELEGGING:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    tilrettelegging: action.payload,
                },
            };
        case SvangerskapspengerContextActionKeys.AVBRYT_SØKNAD:
            return {
                ...svangerskapspengerInitialState,
                søkerinfo: state.søkerinfo,
            };
        case SvangerskapspengerContextActionKeys.GODKJENT_OPPSUMMERING:
            return {
                ...state,
                søknad: {
                    ...state.søknad,
                    harGodkjentOppsummering: true,
                },
            };
        case SvangerskapspengerContextActionKeys.APPLY_STORED_STATE:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

export default svangerskapspengerReducer;

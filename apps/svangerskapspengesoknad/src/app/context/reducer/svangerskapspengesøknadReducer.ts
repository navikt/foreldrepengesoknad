import { SvangerskapspengesøknadContextState } from '../SvangerskapspengesøknadContextConfig';
import { SvangerskapspengerContextAction, SvangerskapspengerContextActionKeys } from '../action/actionCreator';

const svangerskapspengesøknadReducer = (
    state: SvangerskapspengesøknadContextState,
    action: SvangerskapspengerContextAction
): SvangerskapspengesøknadContextState => {
    switch (action.type) {
        case SvangerskapspengerContextActionKeys.SET_SØKERINFO:
            return {
                ...state,
                søkerinfo: { ...action.payload },
            };

        case SvangerskapspengerContextActionKeys.SET_SPRÅKKODE:
            return {
                ...state,
                //TODO
                // søknad: {
                //     ...state.søknad,
                //     søker: {
                //         ...state.søknad.søker,
                //         språkkode: action.payload,
                //     },
                // },
            };
        default:
            return state;
    }
};

export default svangerskapspengesøknadReducer;

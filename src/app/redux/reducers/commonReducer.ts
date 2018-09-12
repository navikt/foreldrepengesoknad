import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Språkkode } from 'common/intl/types';

const getDefaultState = (): CommonState => ({
    språkkode: 'nb',
    avbrytSøknadDialogErSynlig: false
});

export interface CommonState {
    språkkode: Språkkode;
    avbrytSøknadDialogErSynlig: boolean;
}

const commonReducer = (state = getDefaultState(), action: CommonActionTypes): CommonState => {
    switch (action.type) {
        case CommonActionKeys.SET_SPRÅK:
            return { ...state, språkkode: action.språkkode };
        case CommonActionKeys.VIS_AVBRYT_SØKNAD_DIALOG:
            return { ...state, avbrytSøknadDialogErSynlig: true };
        case CommonActionKeys.SKJUL_AVBRYT_SØKNAD_DIALOG:
            return { ...state, avbrytSøknadDialogErSynlig: false };
    }
    return state;
};

export default commonReducer;

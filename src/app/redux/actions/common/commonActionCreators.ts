import { CommonActionKeys, CommonActionTypes } from './commonActionDefinitions';
import { Språkkode } from 'common/intl/types';

export function setSpråk(språkkode: Språkkode): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_SPRÅK,
        språkkode
    };
}

export function visAvbrytSøknadDialog(erSynlig?: boolean): CommonActionTypes {
    return {
        type: CommonActionKeys.VIS_AVBRYT_SØKNAD_DIALOG
    };
}
export function skjulAvbrytSøknadDialog(erSynlig?: boolean): CommonActionTypes {
    return {
        type: CommonActionKeys.SKJUL_AVBRYT_SØKNAD_DIALOG
    };
}

export default {
    setSpråk,
    visAvbrytSøknadDialog,
    skjulAvbrytSøknadDialog
};

import { CommonActionKeys, CommonActionTypes } from './commonActionDefinitions';
import { Språkkode } from '../../../intl/types';

export function setSpråk(språkkode: Språkkode): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_SPRÅK,
        språkkode
    };
}

export default {
    setSpråk
};

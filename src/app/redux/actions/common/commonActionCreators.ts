import { CommonActionKeys, CommonActionTypes } from './commonActionDefinitions';
import { Språkkode } from '../../../intl/types';

export function setBekreftetInformasjon(
    bekreftetInformasjon: boolean
): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_BEKREFTET_INFORMASJON,
        bekreftetInformasjon
    };
}

export function setGodkjentVilkar(godkjentVilkar: boolean): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_GODKJENT_VILKAR,
        godkjentVilkar
    };
}

export function setSpråk(språkkode: Språkkode): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_SPRÅK,
        språkkode
    };
}

export default {
    setBekreftetInformasjon,
    setGodkjentVilkar,
    setSpråk
};

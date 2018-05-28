import { Språkkode } from '../../../intl/types';

export enum CommonActionKeys {
    'SET_SPRÅK' = 'setSpråk'
}

interface SetSpråk {
    type: CommonActionKeys.SET_SPRÅK;
    språkkode: Språkkode;
}

export type CommonActionTypes = SetSpråk;

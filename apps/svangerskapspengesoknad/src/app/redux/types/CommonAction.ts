import { Språkkode } from 'common/types';

export enum CommonActionTypes {
    'SET_SPRÅK' = 'setSpråk',
}

interface SetSpråk {
    type: CommonActionTypes.SET_SPRÅK;
    payload: {
        språkkode: Språkkode;
    };
}

type CommonAction = SetSpråk;

export default CommonAction;

import svangerskapspengerReducer from './svangerskapspengerReducer';
import { SvangerskapspengerContextActionKeys } from '../action/actionCreator';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { svangerskapspengerInitialState } from '../SvangerskapspengerContextConfig';

describe('<svangerskapspengesøknadReducer>', () => {
    it('skal legge søkerinfo i state', () => {
        const payload = {
            person: {
                fornavn: 'Espen',
            },
        } as Søkerinfo;

        const resultState = svangerskapspengerReducer(svangerskapspengerInitialState, {
            type: SvangerskapspengerContextActionKeys.SET_SØKERINFO,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...svangerskapspengerInitialState,
            søkerinfo: payload,
        });
    });
});

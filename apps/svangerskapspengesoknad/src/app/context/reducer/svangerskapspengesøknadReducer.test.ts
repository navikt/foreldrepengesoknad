import svangerskapspengesøknadReducer from './svangerskapspengesøknadReducer';
import { SvangerskapspengerContextActionKeys } from '../action/actionCreator';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { svangerskapspengesøknadInitialState } from '../SvangerskapspengesøknadContextConfig';

describe('<svangerskapspengesøknadReducer>', () => {
    const leggTil = (data: any) => {
        return {
            ...svangerskapspengesøknadInitialState,
            ...data,
        };
    };

    it('skal legge til har godkjent vilkår i state', () => {
        const payload = true;

        const resultState = svangerskapspengesøknadReducer(svangerskapspengesøknadInitialState, {
            type: SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR,
            payload,
        });

        expect(resultState).toStrictEqual(
            leggTil({
                harGodkjentVilkår: payload,
            })
        );
    });

    it('skal legge søkerinfo i state', () => {
        const payload = {
            person: {
                fornavn: 'Espen',
            },
        } as Søkerinfo;

        const resultState = svangerskapspengesøknadReducer(svangerskapspengesøknadInitialState, {
            type: SvangerskapspengerContextActionKeys.SET_SØKERINFO,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...svangerskapspengesøknadInitialState,
            søkerinfo: payload,
        });
    });
});

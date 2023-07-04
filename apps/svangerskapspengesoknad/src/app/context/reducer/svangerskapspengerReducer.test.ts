import svangerskapspengerReducer from './svangerskapspengerReducer';
import { SvangerskapspengerContextActionKeys } from '../action/actionCreator';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { svangerskapspengerInitialState } from '../SvangerskapspengerContextConfig';
import { Barn } from 'app/types/Barn';
import SøknadRoutes from 'app/routes/routes';

describe('SvangerskapspengesøknadReducer', () => {
    it('skal legge søkerinfo i state', () => {
        const payload = {
            person: {
                fornavn: 'Amalie',
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
    it('skal legge barn i state', () => {
        const payload = {
            erBarnetFødt: true,
            termindato: new Date('10-08-2023'),
            fødselsdato: new Date('10-07-2023'),
        } as Barn;

        const resultState = svangerskapspengerReducer(svangerskapspengerInitialState, {
            type: SvangerskapspengerContextActionKeys.SET_BARN,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...svangerskapspengerInitialState,
            søknad: { ...svangerskapspengerInitialState.søknad, barn: payload },
        });
    });
    it('skal current route state', () => {
        const payload = SøknadRoutes.BARNET;

        const resultState = svangerskapspengerReducer(svangerskapspengerInitialState, {
            type: SvangerskapspengerContextActionKeys.SET_CURRENT_ROUTE,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...svangerskapspengerInitialState,
            currentRoute: payload,
        });
    });
    it('skal legge har godkjent vilkår state', () => {
        const payload = true;

        const resultState = svangerskapspengerReducer(svangerskapspengerInitialState, {
            type: SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR,
            payload,
        });

        expect(resultState).toStrictEqual({
            ...svangerskapspengerInitialState,
            søknad: { ...svangerskapspengerInitialState.søknad, harGodkjentVilkår: payload },
        });
    });
});

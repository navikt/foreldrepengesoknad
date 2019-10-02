import søknadReducer from '../søknadReducer';
import actions from '../../actions/søknad/søknadActionCreators';
import Søknad, { SøknadPartial } from '../../../types/søknad/Søknad';
import mockSøknad from '../../../testdata/soknad.data';

describe('Søknad - Uttaksplan reducer', () => {
    let state: SøknadPartial = { ...(mockSøknad as Søknad) };
    it('should get initial state no perioder', () => {
        expect(state.uttaksplan!.length).toBe(0);
    });
    it('should replace all perioder on setUttaksplan', () => {
        state = søknadReducer(state, actions.uttaksplanSetPerioder([]));
        expect(state.uttaksplan).toBeInstanceOf(Array);
        expect(state.uttaksplan.length).toBe(0);
    });
});

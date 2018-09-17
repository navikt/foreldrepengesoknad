import søknadReducer from '../søknadReducer';
import actions from '../../actions/søknad/søknadActionCreators';
import { Periodetype, Uttaksperiode, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { SøknadPartial } from '../../../types/søknad/Søknad';
import { Periodene } from '../../../util/uttaksplan/Periodene';
import { Forelder } from 'common/types';

let nyPeriode: Uttaksperiode = {
    type: Periodetype.Uttak,
    forelder: Forelder.MOR,
    konto: StønadskontoType.Fedrekvote,
    tidsperiode: {
        fom: new Date(),
        tom: new Date()
    },
    ønskerSamtidigUttak: false
};

describe('Søknad - Uttaksplan reducer', () => {
    let state: SøknadPartial;
    it('should get initial state no perioder', () => {
        state = søknadReducer(undefined, {} as any);
        expect(state.uttaksplan!.length).toBe(0);
    });
    it('should add a new periode with new id to uttaksplan', () => {
        state = søknadReducer(state, actions.uttaksplanAddPeriode(nyPeriode));
        expect(state.uttaksplan.length).toBe(1);
        nyPeriode = state.uttaksplan[0] as Uttaksperiode;
        expect(nyPeriode.id).toBeDefined();
    });
    it('should create uniqe id for adder periode', () => {
        state = søknadReducer(state, actions.uttaksplanAddPeriode(nyPeriode));
        expect(state.uttaksplan.length).toBe(2);
        expect(state.uttaksplan[0].id).not.toBe(state.uttaksplan[1].id);
    });
    it('should update an periode with new data, and keep other periods untouched', () => {
        const periode1: Uttaksperiode = state.uttaksplan[0] as Uttaksperiode;
        const periode2: Uttaksperiode = state.uttaksplan[1] as Uttaksperiode;
        const periode2BeforeUpdate = JSON.stringify(periode2);

        state = søknadReducer(state, actions.uttaksplanUpdatePeriode({ ...periode1, forelder: Forelder.FARMEDMOR }));
        const updatedPeriodeInState: Uttaksperiode = Periodene(state.uttaksplan).getPeriode(
            periode1.id!
        ) as Uttaksperiode;
        expect(state.uttaksplan.length).toBe(2);
        expect(updatedPeriodeInState).toBeDefined();
        expect(updatedPeriodeInState.forelder).toEqual('forelder2');

        const periode2AfterUpdate = Periodene(state.uttaksplan).getPeriode(periode2.id!) as Uttaksperiode;
        expect(JSON.stringify(periode2AfterUpdate)).toEqual(periode2BeforeUpdate);
    });
    it('should delete a periode', () => {
        const len = state.uttaksplan.length;
        const periode = state.uttaksplan[1];
        state = søknadReducer(state, actions.uttaksplanDeletePeriode(periode));
        expect(state.uttaksplan.length).toBe(len - 1);
    });
    it('should replace all perioder on setUttaksplan', () => {
        state = søknadReducer(state, actions.uttaksplanSetPerioder([]));
        expect(state.uttaksplan.length).toBe(0);
    });
});

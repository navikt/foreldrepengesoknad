import { getFarEllerMedmorHarAleneomsorg } from '../farEllerMedmorHarAleneomsorg';

describe('farEllerMedmorHarAleneomsorg', () => {
    it('returns true if søkerErFarEllerMedmor and søkerErAleneOmOmsorg', () => {
        expect(getFarEllerMedmorHarAleneomsorg(true, true, { kanIkkeOppgis: true })).toBeTruthy();
    });
    it('returns true if søkerErFarEllerMedmor and annenForelderKanIkkeOppgis', () => {
        expect(getFarEllerMedmorHarAleneomsorg(true, true, { kanIkkeOppgis: false })).toBeTruthy();
    });
    it('returns false if søkerErMor', () => {
        expect(getFarEllerMedmorHarAleneomsorg(false, true, { kanIkkeOppgis: false })).toBeFalsy();
    });
    it('returns false if søkerErAleneOmOmsorg is falsy or annenForelder.kanIkkeOppgis is falsy', () => {
        expect(getFarEllerMedmorHarAleneomsorg(true, false, { kanIkkeOppgis: false })).toBeFalsy();
    });
});

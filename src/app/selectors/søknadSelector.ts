import { createSelector } from 'reselect';
import Søknad, { SøkerRolle, isEnkelEndringssøknad, Endringssøknad } from '../types/søknad/Søknad';
import { RecursivePartial } from '../types/Partial';
import { Dekningsgrad } from 'common/types';
import { AppState } from '../redux/reducers';

export const søknadSelector = (state: AppState): RecursivePartial<Søknad> => state.søknad;

// Søknad
export const selectBarn = createSelector([søknadSelector], (søknad = {}) => søknad.barn);
export const selectSituasjon = createSelector([søknadSelector], (søknad = {}) => søknad.situasjon);
export const selectErEndringssøknad = createSelector(
    [søknadSelector],
    (søknad = {}): boolean => søknad.erEndringssøknad === true
);
export const selectErEnkelEndringssøknad = createSelector([søknadSelector], (søknad = {}): boolean =>
    isEnkelEndringssøknad(søknad as Søknad)
);
export const selectErEndringssøknadMedUttaksplan = createSelector([søknadSelector], (søknad = {}): boolean => {
    if (isEnkelEndringssøknad(søknad as Søknad)) {
        const { ekstrainfo } = søknad as Endringssøknad;
        return ekstrainfo.eksisterendeSak.uttaksplan !== undefined;
    }
    return false;
});
export const selectDekningsgrad = createSelector(
    [søknadSelector],
    (søknad = {}): Dekningsgrad | undefined => søknad.dekningsgrad
);
export const selectSøker = createSelector([søknadSelector], (søknad = {}) => søknad.søker);
export const selectAnnenForelder = createSelector([søknadSelector], (søknad = {}) => søknad.annenForelder);
export const selectEksisterendeSak = createSelector(
    [søknadSelector],
    (søknad = {}) => (søknad.ekstrainfo ? søknad.ekstrainfo.eksisterendeSak : undefined)
);

// Søker
export const selectSøkerErAleneOmOmsorg = createSelector([selectSøker], (søker = {}): boolean => {
    return søker.erAleneOmOmsorg === true;
});
export const selectSøkerrolle = createSelector([selectSøker], (søker): SøkerRolle | undefined => {
    if (søker !== undefined) {
        return søker.rolle;
    }
    return undefined;
});

// Barn
export const selectAntallBarn = createSelector([selectBarn], (barn = {}) => barn.antallBarn);
export const selectErBarnFødt = createSelector([selectBarn], (barn = {}) => barn.erBarnetFødt);

// Annen forelder
export const selectAnnenForelderHarRettPåForeldrepenger = createSelector(
    [selectAnnenForelder],
    (annenForelder = {}) => annenForelder.harRettPåForeldrepenger
);
export const getAnnenForelderKanIkkeOppgis = createSelector(
    [selectAnnenForelder],
    (annenForelder = {}) => annenForelder.kanIkkeOppgis
);

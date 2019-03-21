import { createSelector } from 'reselect';
import { AppState } from '../redux/reducers';
import Søknad, { SøkerRolle } from '../types/søknad/Søknad';
import { RecursivePartial } from '../types/Partial';
import { Dekningsgrad } from 'common/types';

export const søknadSelector = (state: AppState): RecursivePartial<Søknad> => state.søknad;

// Søknad
export const selectBarn = createSelector([søknadSelector], (søknad = {}) => søknad.barn);
export const selectSituasjon = createSelector([søknadSelector], (søknad = {}) => søknad.situasjon);
export const selectErEndringssøknad = createSelector(
    [søknadSelector],
    (søknad = {}): boolean => søknad.erEndringssøknad === true
);
export const selectDekningsgrad = createSelector(
    [søknadSelector],
    (søknad = {}): Dekningsgrad | undefined => søknad.dekningsgrad
);
export const selectSøker = createSelector([søknadSelector], (søknad = {}) => søknad.søker);
export const selectAnnenForelder = createSelector([søknadSelector], (søknad = {}) => søknad.annenForelder);

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

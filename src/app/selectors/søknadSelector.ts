import { createSelector } from 'reselect';
import { AppState } from '../redux/reducers';
import Søknad from '../types/søknad/Søknad';
import { RecursivePartial } from '../types/Partial';

export const søknadSelector = (state: AppState): RecursivePartial<Søknad> => state.søknad;

// Søknad
export const selectBarn = createSelector([søknadSelector], (søknad = {}) => søknad.barn);
export const selectSituasjon = createSelector([søknadSelector], (søknad = {}) => søknad.situasjon);
export const selectDekningsgrad = createSelector([søknadSelector], (søknad = {}) => søknad.dekningsgrad);
export const selectSøker = createSelector([søknadSelector], (søknad = {}) => søknad.søker);
export const selectAnnenForelder = createSelector([søknadSelector], (søknad = {}) => søknad.annenForelder);

// Søker
export const selectSøkerErAleneOmOmsorg = createSelector([selectSøker], (søker = {}) => søker.erAleneOmOmsorg);
export const selectSøkerrolle = createSelector([selectSøker], (søker = {}) => søker.rolle);

// Barn
export const selectAntallBarn = createSelector([selectBarn], (barn = {}) => barn.antallBarn);

// Annen forelder
export const selectAnnenForelderHarRettPåForeldrepenger = createSelector(
    [selectAnnenForelder],
    (annenForelder = {}) => annenForelder.harRettPåForeldrepenger
);
export const getAnnenForelderKanIkkeOppgis = createSelector(
    [selectAnnenForelder],
    (annenForelder = {}) => annenForelder.kanIkkeOppgis
);

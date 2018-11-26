import { createSelector } from 'reselect';
import { AppState } from '../redux/reducers';
import Søknad, { Søkersituasjon } from '../types/søknad/Søknad';
import { RecursivePartial } from '../types/Partial';
import { ApiState } from 'app/redux/reducers/apiReducer';
import Barn from 'app/types/søknad/Barn';
import { getFamiliehendelsedato } from 'app/util/uttaksplan';

const barnHasRequiredValues = (barn: RecursivePartial<Barn> | undefined): barn is Barn =>
    barn !== undefined && barn.antallBarn !== undefined;

const søkersituasjonHasRequiredValues = (
    situasjon: RecursivePartial<Søkersituasjon> | undefined
): situasjon is Søkersituasjon => situasjon !== undefined;

const søknadSelector = (state: AppState): RecursivePartial<Søknad> => state.søknad;
const apiSelector = (state: AppState): ApiState => state.api;

// Søknad
export const getBarn = createSelector([søknadSelector], (søknad = {}) => søknad.barn);
export const getSituasjon = createSelector([søknadSelector], (søknad = {}) => søknad.situasjon);
export const getDekningsgrad = createSelector([søknadSelector], (søknad = {}) => søknad.dekningsgrad);
export const getSøker = createSelector([søknadSelector], (søknad = {}) => søknad.søker);
export const getAnnenForelder = createSelector([søknadSelector], (søknad = {}) => søknad.annenForelder);

// Søker
export const getSøkerErAleneOmOmsorg = createSelector([getSøker], (søker = {}) => søker.erAleneOmOmsorg);
export const getSøkerRolle = createSelector([getSøker], (søker = {}) => søker.rolle);

// Barn
export const getAntallBarn = createSelector([getBarn], (barn = {}) => barn.antallBarn);

// Annen forelder
export const getAnnenForelderHarRettPåForeldrepenger = createSelector(
    [getAnnenForelder],
    (annenForelder = {}) => annenForelder.harRettPåForeldrepenger
);
export const getAnnenForelderKanIkkeOppgis = createSelector(
    [getAnnenForelder],
    (annenForelder = {}) => annenForelder.kanIkkeOppgis
);

// API
export const getTilgjengeligeStønadskontoer = createSelector([apiSelector], (api) => api.tilgjengeligeStønadskontoer);

// Utledet data
export const familiehendelsesdatoSelector = createSelector(
    [getBarn, getSituasjon],
    (barn, situasjon): Date | undefined =>
        barnHasRequiredValues(barn) && søkersituasjonHasRequiredValues(situasjon)
            ? getFamiliehendelsedato(barn, situasjon)
            : undefined
);

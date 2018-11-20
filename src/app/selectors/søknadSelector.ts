import { createSelector } from 'reselect';
import { AppState } from '../redux/reducers';
import Søknad, { SøkerRolle, Søkersituasjon } from '../types/søknad/Søknad';
import { TilgjengeligStønadskonto } from '../types/uttaksplan/periodetyper';
import { getFamiliehendelsedato } from '../util/uttaksplan';
import { getErDeltUttak } from '../util/uttaksplan/forslag/util';
import { getErSøkerFarEllerMedmor } from '../util/domain/personUtil';
import { Søknadsinfo, Uttaksdatoer } from './types';
import { getUttaksdatoer } from '../util/uttaksplan/uttaksdatoer';
import { RecursivePartial } from '../types/Partial';
import { Barn } from '../types/søknad/Barn';

const søknadSelector = (state: AppState): RecursivePartial<Søknad> => state.søknad;

const getBarn = createSelector([søknadSelector], (søknad) => søknad.barn);
const getSituasjon = createSelector([søknadSelector], (søknad) => søknad.situasjon);
const getDekningsgrad = createSelector([søknadSelector], (søknad) => søknad.dekningsgrad);
const getSøker = createSelector([søknadSelector], (søknad) => søknad.søker);
const getAnnenForelder = createSelector([søknadSelector], (søknad) => søknad.annenForelder);

const getErAleneOmOmsorg = createSelector([getSøker], (søker = {}) => søker.erAleneOmOmsorg);
const getRolle = createSelector([getSøker], (søker = {}) => søker.rolle);

const getAntallBarn = createSelector([getBarn], (barn = {}) => barn.antallBarn);

const getHarRettPåForeldrepenger = createSelector(
    [getAnnenForelder],
    (annenForelder = {}) => annenForelder.harRettPåForeldrepenger
);
const getKanIkkeOppgis = createSelector([getAnnenForelder], (annenForelder = {}) => annenForelder.kanIkkeOppgis);

const tilgjengeligeSøknadskontoerSelector = (state: AppState): TilgjengeligStønadskonto[] | undefined =>
    state.api.tilgjengeligeStønadskontoer.length > 0 ? state.api.tilgjengeligeStønadskontoer : undefined;

const familiehendelsesdatoSelector = createSelector(
    [getBarn, getSituasjon],
    (barn, situasjon): Date | undefined =>
        barnHasRequiredValues(barn) && søkersituasjonHasRequiredValues(situasjon)
            ? getFamiliehendelsedato(barn, situasjon)
            : undefined
);

export const uttaksdatoerSelector = createSelector(
    familiehendelsesdatoSelector,
    (familiehendelsesdato: Date | undefined): Uttaksdatoer | undefined => {
        return familiehendelsesdato !== undefined ? getUttaksdatoer(familiehendelsesdato) : undefined;
    }
);
export const søknadsinfoSelector = createSelector(
    familiehendelsesdatoSelector,
    uttaksdatoerSelector,
    tilgjengeligeSøknadskontoerSelector,
    getSituasjon,
    getDekningsgrad,
    getErAleneOmOmsorg,
    getRolle,
    getAntallBarn,
    getHarRettPåForeldrepenger,
    getKanIkkeOppgis,
    (
        familiehendelsesdato,
        uttaksdatoer,
        tilgjengeligeStønadskontoer,
        situasjon,
        dekningsgrad,
        erAleneOmOmsorg,
        rolle,
        antallBarn,
        harRettPåForeldrepenger,
        kanIkkeOppgis
    ): Søknadsinfo | undefined => {
        if (
            familiehendelsesdato !== undefined &&
            uttaksdatoer !== undefined &&
            tilgjengeligeStønadskontoer !== undefined &&
            situasjon !== undefined &&
            dekningsgrad !== undefined &&
            erAleneOmOmsorg !== undefined &&
            rolle !== undefined &&
            antallBarn !== undefined &&
            harRettPåForeldrepenger !== undefined &&
            kanIkkeOppgis
        ) {
            const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(rolle!);
            const søkerErMor = !søkerErFarEllerMedmor;
            const morHarAleneomsorg = søkerErFarEllerMedmor === false && (erAleneOmOmsorg || kanIkkeOppgis);
            const morHarRett = rolle === SøkerRolle.MOR || (søkerErFarEllerMedmor && harRettPåForeldrepenger === true);
            const farEllerMedmorHarAleneomsorg = søkerErFarEllerMedmor && (erAleneOmOmsorg || kanIkkeOppgis);
            const farEllerMedmorHarRett =
                søkerErFarEllerMedmor || (rolle === SøkerRolle.MOR && harRettPåForeldrepenger === true);

            return {
                situasjon,
                familiehendelsesdato,
                antallBarn,
                dekningsgrad,
                farEllerMedmorHarAleneomsorg,
                farEllerMedmorHarRett,
                morHarAleneomsorg,
                morHarRett,
                søkerErMor,
                søkerErFarEllerMedmor,
                søkerErAleneOmOmsorgen: erAleneOmOmsorg,
                erDeltUttak: getErDeltUttak(tilgjengeligeStønadskontoer),
                uttaksdatoer,
                tilgjengeligeStønadskontoer
            };
        }
        return undefined;
    }
);

const barnHasRequiredValues = (barn: RecursivePartial<Barn> | undefined): barn is Barn =>
    barn !== undefined && barn.antallBarn !== undefined;

const søkersituasjonHasRequiredValues = (
    situasjon: RecursivePartial<Søkersituasjon> | undefined
): situasjon is Søkersituasjon => situasjon !== undefined;

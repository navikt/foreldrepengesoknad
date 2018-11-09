import { createSelector } from 'reselect';
import { AppState } from '../redux/reducers';
import Søknad, { SøkerRolle } from '../types/s\u00F8knad/S\u00F8knad';
import { TilgjengeligStønadskonto } from '../types/uttaksplan/periodetyper';
import { getFamiliehendelsedato } from '../util/uttaksplan';
import { getErDeltUttak } from '../util/uttaksplan/forslag/util';
import { getErSøkerFarEllerMedmor } from '../util/domain/personUtil';
import { Søknadsinfo, Uttaksdatoer } from './types';
import { getUttaksdatoer } from '../util/uttaksplan/uttaksdatoer';

const søknadSelector = (state: AppState): Søknad => state.søknad as Søknad;
const tilgjengeligeSøknadskontoerSelector = (state: AppState): TilgjengeligStønadskonto[] =>
    state.api.tilgjengeligeStønadskontoer;

const familiehendelsesdatoSelector = createSelector(søknadSelector, (søknad): Date =>
    getFamiliehendelsedato(søknad.barn, søknad.situasjon)
);

export const uttaksdatoerSelector = createSelector(
    familiehendelsesdatoSelector,
    (familiehendelsesdato: Date): Uttaksdatoer => {
        return getUttaksdatoer(familiehendelsesdato);
    }
);
export const søknadsinfoSelector = createSelector(
    søknadSelector,
    familiehendelsesdatoSelector,
    uttaksdatoerSelector,
    tilgjengeligeSøknadskontoerSelector,
    (søknad, familiehendelsesdato, uttaksdatoer, tilgjengeligeStønadskontoer): Søknadsinfo => {
        const { barn, situasjon, dekningsgrad, søker, annenForelder } = søknad;
        const { erAleneOmOmsorg, rolle } = søker;
        const { antallBarn } = barn;
        const { harRettPåForeldrepenger } = annenForelder;
        const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(rolle);
        const morHarAleneomsorg =
            søkerErFarEllerMedmor === false && (erAleneOmOmsorg || søknad.annenForelder.kanIkkeOppgis);
        const morHarRett = rolle === SøkerRolle.MOR || (søkerErFarEllerMedmor && harRettPåForeldrepenger === true);
        const farEllerMedmorHarAleneomsorg =
            søkerErFarEllerMedmor && (erAleneOmOmsorg || søknad.annenForelder.kanIkkeOppgis);
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
            søkerErFarEllerMedmor,
            søkerErAleneOmOmsorgen: søknad.søker.erAleneOmOmsorg,
            erDeltUttak: getErDeltUttak(tilgjengeligeStønadskontoer),
            søkerErMor: getErSøkerFarEllerMedmor(søknad.søker.rolle),
            uttaksdatoer
        };
    }
);

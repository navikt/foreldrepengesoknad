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
import { Søker } from '../types/søknad/Søker';
import AnnenForelder from '../types/søknad/AnnenForelder';

const søknadSelector = (state: AppState): RecursivePartial<Søknad> => state.søknad;

const tilgjengeligeSøknadskontoerSelector = (state: AppState): TilgjengeligStønadskonto[] | undefined =>
    state.api.tilgjengeligeStønadskontoer.length > 0 ? state.api.tilgjengeligeStønadskontoer : undefined;

const familiehendelsesdatoSelector = createSelector(
    søknadSelector,
    (søknad): Date | undefined =>
        barnHasRequiredValues(søknad.barn) && søkersituasjonHasRequiredValues(søknad.situasjon)
            ? getFamiliehendelsedato(søknad.barn, søknad.situasjon)
            : undefined
);

export const uttaksdatoerSelector = createSelector(
    familiehendelsesdatoSelector,
    (familiehendelsesdato: Date | undefined): Uttaksdatoer | undefined => {
        return familiehendelsesdato !== undefined ? getUttaksdatoer(familiehendelsesdato) : undefined;
    }
);
export const søknadsinfoSelector = createSelector(
    søknadSelector,
    familiehendelsesdatoSelector,
    uttaksdatoerSelector,
    tilgjengeligeSøknadskontoerSelector,
    (søknad, familiehendelsesdato, uttaksdatoer, tilgjengeligeStønadskontoer): Søknadsinfo | undefined => {
        if (
            søknadHasRequiredValues(søknad) &&
            familiehendelsesdato !== undefined &&
            uttaksdatoer !== undefined &&
            tilgjengeligeStønadskontoer !== undefined
        ) {
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
                søkerErMor: søkerErFarEllerMedmor === false,
                søkerErFarEllerMedmor,
                søkerErAleneOmOmsorgen: søknad.søker.erAleneOmOmsorg,
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

const søkerHasRequiredValues = (søker: RecursivePartial<Søker> | undefined): søker is Søker =>
    søker !== undefined && søker.rolle !== undefined;

const annenForelderHasRequiredValues = (
    annenForelder: RecursivePartial<AnnenForelder> | undefined
): annenForelder is AnnenForelder => annenForelder !== undefined;

const søknadHasRequiredValues = (søknad: RecursivePartial<Søknad>): søknad is Søknad => {
    if (
        barnHasRequiredValues(søknad.barn) &&
        søkerHasRequiredValues(søknad.søker) &&
        annenForelderHasRequiredValues(søknad.annenForelder)
    ) {
        return true;
    }
    return false;
};

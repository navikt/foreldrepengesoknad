import { createSelector } from 'reselect';
import { AppState } from '../redux/reducers';
// import { RecursivePartial } from '../types/Partial';
import Søknad from '../types/s\u00F8knad/S\u00F8knad';
// import { Søkerinfo } from '../types/s\u00F8kerinfo';
import { TilgjengeligStønadskonto } from '../types/uttaksplan/periodetyper';
import { getFamiliehendelsedato } from '../util/uttaksplan';
import { getErDeltUttak } from '../util/uttaksplan/forslag/util';
import { getErSøkerFarEllerMedmor } from '../util/domain/personUtil';

const søknadSelector = (state: AppState): Søknad => state.søknad as Søknad;
// const søkerinfoSelector = (state: AppState): Søkerinfo | undefined => state.api.søkerinfo;
const tilgjengeligeSøknadskontoerSelector = (state: AppState): TilgjengeligStønadskonto[] =>
    state.api.tilgjengeligeStønadskontoer;

const familiehendelsesdatoSelector = createSelector(søknadSelector, (søknad): Date =>
    getFamiliehendelsedato(søknad.barn, søknad.situasjon)
);

export const søknadsinfoSelector = createSelector(
    søknadSelector,
    familiehendelsesdatoSelector,
    tilgjengeligeSøknadskontoerSelector,
    (søknad, familiehendelsesdato, tilgjengeligeStønadskontoer) => ({
        familiehendelsesdato,
        dekningsgrad: søknad.dekningsgrad,
        erAleneOmOmsorg: søknad.søker.erAleneOmOmsorg,
        erDeltUttak: getErDeltUttak(tilgjengeligeStønadskontoer),
        søkerErMor: getErSøkerFarEllerMedmor(søknad.søker.rolle)
    })
);

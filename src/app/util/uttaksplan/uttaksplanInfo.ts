import { NavnPåForeldre } from 'common/types';
import Søknad from '../../types/søknad/Søknad';
import { Søkerinfo } from '../../types/søkerinfo';
import { getNavnPåForeldre, getFamiliehendelsedato } from '.';
import { erFarEllerMedmor } from '../domain/personUtil';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { getVelgbareStønadskontotyper } from './st\u00F8nadskontoer';
import { Kjønn } from '../../types/common';
import { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { beregnGjenståendeUttaksdager } from '../uttaksPlanStatus';

export interface UttaksplanInfo {
    familiehendelsesdato: Date;
    søkerErFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttakStatus: Stønadskontouttak[];
    velgbareStønadskontoer: StønadskontoType[];
    søkerKjønn: Kjønn;
}

export const getAggregertUttaksplanInfo = (
    søknad: Søknad,
    søkerinfo: Søkerinfo,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): UttaksplanInfo => {
    return {
        familiehendelsesdato: getFamiliehendelsedato(søknad.barn, søknad.situasjon),
        navnPåForeldre: getNavnPåForeldre(søknad, søkerinfo.person),
        søkerErFarEllerMedmor: erFarEllerMedmor(søkerinfo.person.kjønn, søknad.søker.rolle),
        tilgjengeligeStønadskontoer,
        søkerKjønn: søkerinfo.person.kjønn,
        velgbareStønadskontoer: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer),
        uttakStatus: beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, søknad.uttaksplan)
    };
};

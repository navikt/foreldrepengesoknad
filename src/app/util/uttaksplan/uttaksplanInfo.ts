import { NavnPåForeldre } from 'common/types';
import Søknad from '../../types/søknad/Søknad';
import { Søkerinfo } from '../../types/søkerinfo';
import { getNavnPåForeldre, getFamiliehendelsedato } from '.';
import { erFarEllerMedmor } from '../domain/personUtil';
import { Kjønn } from '../../types/common';

export interface UttaksplanInfo {
    familiehendelsesdato: Date;
    søkerErFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    søkerKjønn: Kjønn;
}

export const getAggregertUttaksplanInfo = (søknad: Søknad, søkerinfo: Søkerinfo): UttaksplanInfo => {
    return {
        familiehendelsesdato: getFamiliehendelsedato(søknad.barn, søknad.situasjon),
        navnPåForeldre: getNavnPåForeldre(søknad, søkerinfo.person),
        søkerErFarEllerMedmor: erFarEllerMedmor(søkerinfo.person.kjønn, søknad.søker.rolle),
        søkerKjønn: søkerinfo.person.kjønn
    };
};

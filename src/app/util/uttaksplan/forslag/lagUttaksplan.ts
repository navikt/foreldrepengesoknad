import Søknad from '../../../types/søknad/Søknad';
import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { ikkeDeltUttak } from './ikkeDeltUttak';
import { deltUttak } from './deltUttak';
import { erFarEllerMedmor } from '../../domain/personUtil';
import { getErDeltUttak } from './util';
import { getFamiliehendelsedato } from '..';

export const lagUttaksplan = (søknad: Søknad, tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]): Periode[] => {
    const { barn, situasjon, ekstrainfo, annenForelder } = søknad;
    const { erUfør } = annenForelder;
    const { uttaksplanSkjema } = ekstrainfo;
    const { harAnnenForelderSøktFP } = uttaksplanSkjema;
    const { startdatoPermisjon, fellesperiodeukerMor } = uttaksplanSkjema;
    const famDato = getFamiliehendelsedato(barn, situasjon);
    const erDeltUttak: boolean = getErDeltUttak(tilgjengeligeStønadskontoer);

    if (famDato) {
        if (erDeltUttak) {
            return deltUttak(
                situasjon,
                famDato,
                erFarEllerMedmor(søknad.søker.rolle),
                tilgjengeligeStønadskontoer,
                startdatoPermisjon,
                fellesperiodeukerMor,
                harAnnenForelderSøktFP
            );
        } else {
            return ikkeDeltUttak(
                situasjon,
                famDato,
                erFarEllerMedmor(søknad.søker.rolle),
                tilgjengeligeStønadskontoer,
                startdatoPermisjon,
                erUfør
            );
        }
    }

    return [];
};

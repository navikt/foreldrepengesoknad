import Søknad from '../../../types/søknad/Søknad';
import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { ikkeDeltUttak } from './ikkeDeltUttak';
import { deltUttak } from './deltUttak';
import { getErSøkerFarEllerMedmor } from '../../domain/personUtil';
import { getErDeltUttak } from './util';
import { getFamiliehendelsedato } from '..';

export const lagUttaksplan = (søknad: Søknad, tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]): Periode[] => {
    if (søknad.erEndringssøknad) {
        return [];
    }
    const { barn, situasjon, ekstrainfo, annenForelder } = søknad;
    const { erUfør } = annenForelder;
    const { uttaksplanSkjema } = ekstrainfo;
    const {
        harAnnenForelderSøktFP,
        startdatoPermisjon,
        fellesperiodeukerMor,
        antallDagerFellesperiodeFarMedmor,
        antallUkerFellesperiodeFarMedmor,
        morSinSisteUttaksdag,
        farSinFørsteUttaksdag
    } = uttaksplanSkjema;
    const famDato = getFamiliehendelsedato(barn, situasjon);
    const erDeltUttak: boolean = getErDeltUttak(tilgjengeligeStønadskontoer);

    if (famDato) {
        if (erDeltUttak) {
            return deltUttak(
                situasjon,
                famDato,
                getErSøkerFarEllerMedmor(søknad.søker.rolle),
                tilgjengeligeStønadskontoer,
                startdatoPermisjon,
                fellesperiodeukerMor,
                harAnnenForelderSøktFP,
                antallDagerFellesperiodeFarMedmor,
                antallUkerFellesperiodeFarMedmor,
                morSinSisteUttaksdag,
                farSinFørsteUttaksdag
            );
        } else {
            return ikkeDeltUttak(
                situasjon,
                famDato,
                getErSøkerFarEllerMedmor(søknad.søker.rolle),
                tilgjengeligeStønadskontoer,
                startdatoPermisjon,
                erUfør
            );
        }
    }

    return [];
};

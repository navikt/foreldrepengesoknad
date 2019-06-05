import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { ikkeDeltUttak } from './ikkeDeltUttak';
import { deltUttak } from './deltUttak';
import { UttaksplanSkjemadata } from '../../../steg/uttaksplanSkjema/uttaksplanSkjemadata';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import uttakEndringssøknad from './uttakEndringssøknad';

export interface LagUttaksplanParams {
    situasjon: Søkersituasjon;
    familiehendelsesdato: Date;
    erDeltUttak: boolean;
    erEndringssøknad: boolean;
    søkerErFarEllerMedmor: boolean;
    annenForelderErUfør: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksplanSkjema: UttaksplanSkjemadata;
}
export const lagUttaksplan = (params: LagUttaksplanParams): Periode[] => {
    const {
        situasjon,
        familiehendelsesdato,
        erDeltUttak,
        erEndringssøknad,
        søkerErFarEllerMedmor,
        annenForelderErUfør,
        tilgjengeligeStønadskontoer,
        uttaksplanSkjema
    } = params;

    if (erEndringssøknad) {
        if (søkerErFarEllerMedmor) {
            return [];
        } else if (!søkerErFarEllerMedmor && situasjon !== Søkersituasjon.ADOPSJON) {
            return uttakEndringssøknad(uttaksplanSkjema.startdatoPermisjon, familiehendelsesdato);
        } else {
            return [];
        }
    }

    const {
        harAnnenForelderSøktFP,
        startdatoPermisjon,
        fellesperiodeukerMor,
        antallDagerFellesperiodeFarMedmor,
        antallUkerFellesperiodeFarMedmor,
        morSinSisteUttaksdag,
        farSinFørsteUttaksdag
    } = uttaksplanSkjema;

    if (familiehendelsesdato) {
        if (erDeltUttak) {
            return deltUttak(
                situasjon,
                familiehendelsesdato,
                søkerErFarEllerMedmor,
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
                familiehendelsesdato,
                søkerErFarEllerMedmor,
                tilgjengeligeStønadskontoer,
                startdatoPermisjon,
                annenForelderErUfør
            );
        }
    }

    return [];
};

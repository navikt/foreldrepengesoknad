import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { ikkeDeltUttak } from './ikkeDeltUttak';
import { deltUttak } from './deltUttak';
import { UttaksplanSkjemadata } from '../../../steg/uttaksplanSkjema/uttaksplanSkjemadata';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { finnOgSettInnHull } from '../builder/UttaksplanBuilder';
import { Uttaksdagen } from '../Uttaksdagen';
import moment from 'moment';

export interface LagUttaksplanParams {
    situasjon: Søkersituasjon;
    familiehendelsesdato: Date;
    erDeltUttak: boolean;
    erEndringssøknad: boolean;
    søkerErFarEllerMedmor: boolean;
    annenForelderErUfør: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksplanSkjema: UttaksplanSkjemadata;
    erEnkelEndringssøknad: boolean;
    førsteUttaksdagEtterSeksUker: Date;
    søkerHarMidlertidigOmsorg: boolean;
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
        uttaksplanSkjema,
        erEnkelEndringssøknad,
        førsteUttaksdagEtterSeksUker,
        søkerHarMidlertidigOmsorg,
    } = params;

    if (uttaksplanSkjema.ønskerIkkeFlerePerioder || erEndringssøknad) {
        return [];
    }

    const erEndringssøknadUtenEksisterendeSak = erEndringssøknad && !erEnkelEndringssøknad;

    const {
        harAnnenForelderSøktFP,
        startdatoPermisjon,
        fellesperiodeukerMor,
        antallDagerFellesperiodeFarMedmor,
        antallUkerFellesperiodeFarMedmor,
        morSinSisteUttaksdag,
        farSinFørsteUttaksdag,
        begrunnelseForUtsettelse,
    } = uttaksplanSkjema;

    if (familiehendelsesdato) {
        if (erDeltUttak) {
            const forslag = deltUttak(
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
                farSinFørsteUttaksdag,
                begrunnelseForUtsettelse
            );
            const dagEtterMorsSisteDag = morSinSisteUttaksdag ? Uttaksdagen(morSinSisteUttaksdag).neste() : undefined;
            const relevantStartDatoForUttak = moment(dagEtterMorsSisteDag).isSameOrAfter(
                moment(førsteUttaksdagEtterSeksUker)
            )
                ? dagEtterMorsSisteDag
                : førsteUttaksdagEtterSeksUker;

            return finnOgSettInnHull(
                forslag,
                erEndringssøknadUtenEksisterendeSak,
                søkerHarMidlertidigOmsorg,
                relevantStartDatoForUttak
            );
        } else {
            const forslag = ikkeDeltUttak(
                situasjon,
                familiehendelsesdato,
                søkerErFarEllerMedmor,
                tilgjengeligeStønadskontoer,
                startdatoPermisjon,
                annenForelderErUfør
            );

            return finnOgSettInnHull(
                forslag,
                erEndringssøknadUtenEksisterendeSak,
                søkerHarMidlertidigOmsorg,
                familiehendelsesdato
            );
        }
    }

    return [];
};

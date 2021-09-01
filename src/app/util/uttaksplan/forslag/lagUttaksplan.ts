import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import moment from 'moment';
import { UttaksplanSkjemadata } from '../../../steg/uttaksplanSkjema/uttaksplanSkjemadata';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { finnOgSettInnHull } from '../builder/UttaksplanBuilder';
import { Uttaksdagen } from '../Uttaksdagen';
import { deltUttak } from './deltUttak';
import { ikkeDeltUttak } from './ikkeDeltUttak';

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
    const kunFarMedmorHarRett = søkerErFarEllerMedmor && !erDeltUttak;

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

    const morSinSisteUttaksdagDate = ISOStringToDate(morSinSisteUttaksdag);
    if (familiehendelsesdato) {
        if (erDeltUttak) {
            const forslag = deltUttak(
                situasjon,
                familiehendelsesdato,
                søkerErFarEllerMedmor,
                tilgjengeligeStønadskontoer,
                ISOStringToDate(startdatoPermisjon),
                fellesperiodeukerMor,
                harAnnenForelderSøktFP,
                antallDagerFellesperiodeFarMedmor,
                antallUkerFellesperiodeFarMedmor,
                morSinSisteUttaksdagDate,
                ISOStringToDate(farSinFørsteUttaksdag),
                begrunnelseForUtsettelse
            );
            const dagEtterMorsSisteDag = morSinSisteUttaksdagDate
                ? Uttaksdagen(morSinSisteUttaksdagDate).neste()
                : undefined;
            const relevantStartDatoForUttak = moment(dagEtterMorsSisteDag).isSameOrAfter(
                moment(førsteUttaksdagEtterSeksUker)
            )
                ? dagEtterMorsSisteDag
                : førsteUttaksdagEtterSeksUker;

            return finnOgSettInnHull(
                forslag,
                erEndringssøknadUtenEksisterendeSak,
                søkerHarMidlertidigOmsorg,
                kunFarMedmorHarRett,
                familiehendelsesdato,
                relevantStartDatoForUttak
            );
        } else {
            const forslag = ikkeDeltUttak(
                situasjon,
                familiehendelsesdato,
                søkerErFarEllerMedmor,
                tilgjengeligeStønadskontoer,
                ISOStringToDate(startdatoPermisjon),
                annenForelderErUfør
            );

            return finnOgSettInnHull(
                forslag,
                erEndringssøknadUtenEksisterendeSak,
                søkerHarMidlertidigOmsorg,
                kunFarMedmorHarRett,
                familiehendelsesdato,
                familiehendelsesdato
            );
        }
    }

    return [];
};

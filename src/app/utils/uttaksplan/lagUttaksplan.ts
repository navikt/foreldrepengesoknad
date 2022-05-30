import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Situasjon } from 'app/types/Situasjon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { UttaksplanSkjemadata } from 'app/types/UttaksplanSkjemaData';
import dayjs from 'dayjs';
import { finnOgSettInnHull } from 'uttaksplan/builder/UttaksplanBuilder';
import { Periode } from 'uttaksplan/types/Periode';
import { førsteOktober2021ReglerGjelder, ISOStringToDate } from '../dateUtils';
import { deltUttak } from './deltUttak';
import { ikkeDeltUttak } from './ikkeDeltUttak';

export interface LagUttaksplanParams {
    situasjon: Situasjon;
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
    bareFarMedmorHarRett: boolean;
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
        bareFarMedmorHarRett,
    } = params;

    if (uttaksplanSkjema.ønskerIkkeFlerePerioder || erEndringssøknad) {
        return [];
    }

    const erEndringssøknadUtenEksisterendeSak = erEndringssøknad && !erEnkelEndringssøknad;
    const kunFarMedmorHarRett =
        søkerErFarEllerMedmor && !erDeltUttak && førsteOktober2021ReglerGjelder(familiehendelsesdato);
    const erAdopsjon = situasjon === 'adopsjon';

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
            const relevantStartDatoForUttak = dayjs(dagEtterMorsSisteDag).isSameOrAfter(
                dayjs(førsteUttaksdagEtterSeksUker)
            )
                ? dagEtterMorsSisteDag
                : førsteUttaksdagEtterSeksUker;

            return finnOgSettInnHull(
                forslag,
                erEndringssøknadUtenEksisterendeSak,
                søkerHarMidlertidigOmsorg,
                kunFarMedmorHarRett,
                familiehendelsesdato,
                erAdopsjon,
                relevantStartDatoForUttak
            );
        } else {
            const forslag = ikkeDeltUttak(
                situasjon,
                familiehendelsesdato,
                søkerErFarEllerMedmor,
                tilgjengeligeStønadskontoer,
                ISOStringToDate(startdatoPermisjon),
                annenForelderErUfør,
                bareFarMedmorHarRett
            );

            const førsteUttaksdagEtterSeksUker = Uttaksdagen(
                Uttaksdagen(familiehendelsesdato).denneEllerNeste()
            ).leggTil(30);

            let relevantStartDatoForUttak = familiehendelsesdato;

            if (søkerErFarEllerMedmor) {
                if (erAdopsjon) {
                    relevantStartDatoForUttak = familiehendelsesdato;
                }

                relevantStartDatoForUttak = førsteUttaksdagEtterSeksUker;
            }

            return finnOgSettInnHull(
                forslag,
                erEndringssøknadUtenEksisterendeSak,
                søkerHarMidlertidigOmsorg,
                kunFarMedmorHarRett,
                familiehendelsesdato,
                erAdopsjon,
                relevantStartDatoForUttak
            );
        }
    }

    return [];
};

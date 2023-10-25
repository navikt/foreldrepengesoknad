import { UttaksplanSkjemadata } from 'app/types/UttaksplanSkjemaData';
import { deltUttak } from './deltUttak';
import { ikkeDeltUttak } from './ikkeDeltUttak';
import { ISOStringToDate, Periode, Situasjon, TilgjengeligStønadskonto } from '@navikt/fp-common';
import { finnOgSettInnHull } from '@navikt/uttaksplan/src/builder/uttaksplanbuilderUtils';

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
    harAktivitetskravIPeriodeUtenUttak: boolean;
    termindato: Date | undefined;
    førsteUttaksdagNesteBarnsSak: Date | undefined;
    annenForelderHarRettPåForeldrepengerIEØS?: boolean;
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
        bareFarMedmorHarRett,
        termindato,
        harAktivitetskravIPeriodeUtenUttak,
        annenForelderHarRettPåForeldrepengerIEØS,
        førsteUttaksdagNesteBarnsSak,
    } = params;

    if (uttaksplanSkjema.ønskerIkkeFlerePerioder || erEndringssøknad) {
        return [];
    }
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
            const forslag = deltUttak({
                situasjon,
                famDato: familiehendelsesdato,
                erFarEllerMedmor: søkerErFarEllerMedmor,
                tilgjengeligeStønadskontoer,
                startdatoPermisjon: ISOStringToDate(startdatoPermisjon),
                fellesperiodeukerMor,
                harAnnenForelderSøktFP,
                antallDagerFellesperiodeFarMedmor,
                antallUkerFellesperiodeFarMedmor,
                morSinSisteUttaksdag: morSinSisteUttaksdagDate,
                farSinFørsteUttaksdag: ISOStringToDate(farSinFørsteUttaksdag),
                begrunnelseForUtsettelse,
                annenForelderHarRettPåForeldrepengerIEØS,
                termindato,
                førsteUttaksdagNesteBarnsSak,
            });

            return finnOgSettInnHull(
                forslag,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon,
                false,
                søkerErFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            );
        } else {
            const forslag = ikkeDeltUttak(
                situasjon,
                familiehendelsesdato,
                søkerErFarEllerMedmor,
                tilgjengeligeStønadskontoer,
                ISOStringToDate(startdatoPermisjon),
                annenForelderErUfør,
                bareFarMedmorHarRett,
                termindato,
                førsteUttaksdagNesteBarnsSak,
            );

            return finnOgSettInnHull(
                forslag,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon,
                søkerErFarEllerMedmor,
                søkerErFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            );
        }
    }

    return [];
};

import { finnOgSettInnHull } from '@navikt/uttaksplan/src/builder/uttaksplanbuilderUtils';

import { ISOStringToDate, Periode, Situasjon, TilgjengeligStønadskonto } from '@navikt/fp-common';

import { UttaksplanSkjemadata } from 'app/types/UttaksplanSkjemaData';

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
    erEnkelEndringssøknad: boolean; //Denne kan fjernes. Samme som erEndringssøknad
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

    const erAdopsjon = situasjon === 'adopsjon';

    const {
        harAnnenForelderSøktFP,
        startdatoPermisjon,
        fellesperiodeukerMor,
        antallUkerFellesperiodeFarMedmor,
        morSinSisteUttaksdag,
        farSinFørsteUttaksdag,
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
                fellesperiodeUkerMor: fellesperiodeukerMor,
                harAnnenForelderSøktFP,
                antallUkerFellesperiodeFarMedmor,
                morSinSisteUttaksdag: morSinSisteUttaksdagDate,
                farSinFørsteUttaksdag: ISOStringToDate(farSinFørsteUttaksdag),
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

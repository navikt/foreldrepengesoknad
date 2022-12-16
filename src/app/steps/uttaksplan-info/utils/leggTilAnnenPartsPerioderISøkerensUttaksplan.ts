import { finnOgSettInnHull, settInnAnnenPartsUttak } from 'uttaksplan/builder/uttaksplanbuilderUtils';
import { isUttakAnnenPart, isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { Periodene } from './Periodene';

export const leggTilAnnenPartsPerioderISøkerenesUttaksplan = (
    annenPartsPerioder: Periode[],
    uttaksplan: Periode[],
    familiehendelsedato: Date,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    førsteUttaksdagNesteBarnsSak: Date | undefined
): Periode[] => {
    uttaksplan.forEach((p) => {
        if (isUttaksperiode(p)) {
            const overlappendePerioderAnnenPart = Periodene(annenPartsPerioder).finnOverlappendePerioder(p);

            if (
                overlappendePerioderAnnenPart.length !== 0 &&
                overlappendePerioderAnnenPart.find(
                    (periode) => isUttakAnnenPart(periode) && periode.ønskerSamtidigUttak === true
                )
            ) {
                if (!p.ønskerSamtidigUttak) {
                    p.ønskerSamtidigUttak = true;
                    p.samtidigUttakProsent = '100';
                }
            }
        }
    });

    if (annenPartsPerioder.length > 0) {
        return finnOgSettInnHull(
            settInnAnnenPartsUttak(uttaksplan, annenPartsPerioder, familiehendelsedato, førsteUttaksdagNesteBarnsSak),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsedato,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor
        );
    }

    return uttaksplan;
};

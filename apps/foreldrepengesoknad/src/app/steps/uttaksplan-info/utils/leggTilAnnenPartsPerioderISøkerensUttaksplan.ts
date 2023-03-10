import {
    finnOgSettInnHull,
    normaliserPerioder,
    settInnAnnenPartsUttak,
} from 'uttaksplan/builder/uttaksplanbuilderUtils';
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
    const { normaliserteEgnePerioder, normaliserteAnnenPartsPerioder } = normaliserPerioder(
        uttaksplan,
        annenPartsPerioder
    );

    if (normaliserteAnnenPartsPerioder.length > 0) {
        normaliserteEgnePerioder.forEach((p) => {
            if (isUttaksperiode(p)) {
                const overlappendePerioderAnnenPart =
                    Periodene(normaliserteAnnenPartsPerioder).finnOverlappendePerioder(p);
                const overlappendePeriodeAnnenPart =
                    overlappendePerioderAnnenPart.length > 0 ? overlappendePerioderAnnenPart[0] : undefined;

                if (overlappendePeriodeAnnenPart !== undefined && isUttakAnnenPart(overlappendePeriodeAnnenPart)) {
                    if (!p.ønskerSamtidigUttak) {
                        p.ønskerSamtidigUttak = true;
                        p.samtidigUttakProsent = '100';
                    }
                    if (!overlappendePeriodeAnnenPart.ønskerSamtidigUttak) {
                        overlappendePeriodeAnnenPart.ønskerSamtidigUttak = true;
                        overlappendePeriodeAnnenPart.samtidigUttakProsent = '100';
                    }
                }
            }
        });
        return finnOgSettInnHull(
            settInnAnnenPartsUttak(
                normaliserteEgnePerioder,
                normaliserteAnnenPartsPerioder,
                familiehendelsedato,
                førsteUttaksdagNesteBarnsSak
            ),
            harAktivitetskravIPeriodeUtenUttak,
            familiehendelsedato,
            erAdopsjon,
            bareFarHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak
        );
    }

    return uttaksplan;
};

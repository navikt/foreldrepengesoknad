import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { Periode, isInfoPeriode, isUtsettelsePgaArbeid, isUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import lenker from 'app/util/routing/lenker';

const primitivGraderingTest = (kunSøkersPerioder: Periode[]): boolean => {
    const firstArbeidsperiodeIndex = kunSøkersPerioder.findIndex((p) => isUtsettelsePgaArbeid(p));

    if (firstArbeidsperiodeIndex > -1) {
        const antallPerioderEtterFørsteUtsettelseGrunnetArbeid =
            kunSøkersPerioder.length - 1 - firstArbeidsperiodeIndex;

        if (antallPerioderEtterFørsteUtsettelseGrunnetArbeid >= 5) {
            // Hvis vi har en serie perioder av formatet:
            // Arbeid -> Uttak -> Arbeid -> Uttak -> Arbeid -> Uttak => foreslå gradering
            if (
                isUtsettelsePgaArbeid(kunSøkersPerioder[firstArbeidsperiodeIndex]) &&
                isUttaksperiode(kunSøkersPerioder[firstArbeidsperiodeIndex + 1]) &&
                isUtsettelsePgaArbeid(kunSøkersPerioder[firstArbeidsperiodeIndex + 2]) &&
                isUttaksperiode(kunSøkersPerioder[firstArbeidsperiodeIndex + 3]) &&
                isUtsettelsePgaArbeid(kunSøkersPerioder[firstArbeidsperiodeIndex + 4]) &&
                isUttaksperiode(kunSøkersPerioder[firstArbeidsperiodeIndex + 5])
            ) {
                return false;
            }
        }
        if (antallPerioderEtterFørsteUtsettelseGrunnetArbeid === 4 && firstArbeidsperiodeIndex > 0) {
            // Hvis vi har en serie perioder av formatet:
            // Uttak -> Arbeid -> Uttak -> Arbeid -> Uttak -> Arbeid => foreslå gradering
            if (
                firstArbeidsperiodeIndex > 0 &&
                isUttaksperiode(kunSøkersPerioder[firstArbeidsperiodeIndex - 1]) &&
                isUtsettelsePgaArbeid(kunSøkersPerioder[firstArbeidsperiodeIndex]) &&
                isUttaksperiode(kunSøkersPerioder[firstArbeidsperiodeIndex + 1]) &&
                isUtsettelsePgaArbeid(kunSøkersPerioder[firstArbeidsperiodeIndex + 2]) &&
                isUttaksperiode(kunSøkersPerioder[firstArbeidsperiodeIndex + 3]) &&
                isUtsettelsePgaArbeid(kunSøkersPerioder[firstArbeidsperiodeIndex + 4])
            ) {
                return false;
            }
        }
    }

    return true;
};

export const burdeKanskjeSøkeGraderingTest: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const kunSøkersPerioder = perioder.filter((p: Periode) => !isInfoPeriode(p));

    if (kunSøkersPerioder.length >= 6) {
        return {
            passerer: primitivGraderingTest(kunSøkersPerioder),
            info: {
                intlKey: 'uttaksplan.validering.info.burdeKanskjeSøkeGradering',
                renderAsHtml: true,
                values: {
                    link: lenker.graderingInfo
                }
            }
        };
    }

    return {
        passerer: true
    };
};

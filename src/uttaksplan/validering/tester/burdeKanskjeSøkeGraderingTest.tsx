import React from 'react';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { IntlShape } from 'react-intl';
import {
    isInfoPeriode,
    isPeriodeUtenUttak,
    isUtsettelsePgaArbeid,
    isUttaksperiode,
    Periode,
} from 'uttaksplan/types/Periode';
import links from 'app/links/links';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

const vekslendeArbeidOgUttakTest = (kunSøkersPerioder: Periode[]): boolean => {
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

const vekslendePeriodeUtenUttakOgUttakTest = (kunSøkersPerioder: Periode[]): boolean => {
    const firstPeriodeUtenUttakIndex = kunSøkersPerioder.findIndex((p) => isPeriodeUtenUttak(p));

    if (firstPeriodeUtenUttakIndex > -1) {
        const antallPerioderEtterFørstePeriodeUtenUttak = kunSøkersPerioder.length - 1 - firstPeriodeUtenUttakIndex;

        if (antallPerioderEtterFørstePeriodeUtenUttak >= 5) {
            // Hvis vi har en serie perioder av formatet:
            // Uten Uttak -> Uttak ->  Uten Uttak -> Uttak ->  Uten Uttak -> Uttak => foreslå gradering
            if (
                isPeriodeUtenUttak(kunSøkersPerioder[firstPeriodeUtenUttakIndex]) &&
                isUttaksperiode(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 1]) &&
                isPeriodeUtenUttak(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 2]) &&
                isUttaksperiode(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 3]) &&
                isPeriodeUtenUttak(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 4]) &&
                isUttaksperiode(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 5])
            ) {
                return false;
            }
        }
        if (antallPerioderEtterFørstePeriodeUtenUttak === 4 && firstPeriodeUtenUttakIndex > 0) {
            // Hvis vi har en serie perioder av formatet:
            // Uttak ->  Uten Uttak -> Uttak ->  Uten Uttak -> Uttak ->  Uten Uttak => foreslå gradering
            if (
                firstPeriodeUtenUttakIndex > 0 &&
                isUttaksperiode(kunSøkersPerioder[firstPeriodeUtenUttakIndex - 1]) &&
                isPeriodeUtenUttak(kunSøkersPerioder[firstPeriodeUtenUttakIndex]) &&
                isUttaksperiode(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 1]) &&
                isPeriodeUtenUttak(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 2]) &&
                isUttaksperiode(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 3]) &&
                isPeriodeUtenUttak(kunSøkersPerioder[firstPeriodeUtenUttakIndex + 4])
            ) {
                return false;
            }
        }
    }

    return true;
};

export const burdeKanskjeSøkeGraderingTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { perioder } = grunnlag;
    const kunSøkersPerioder = perioder.filter((p: Periode) => !isInfoPeriode(p));

    if (kunSøkersPerioder.length >= 6) {
        const vekslerArbeidOgUttakTest = vekslendeArbeidOgUttakTest(kunSøkersPerioder);
        const veklserPerioderUtenUttakOgUttaktest = vekslendePeriodeUtenUttakOgUttakTest(kunSøkersPerioder);
        const passerer = vekslerArbeidOgUttakTest && veklserPerioderUtenUttakOgUttaktest;
        let infoTekstKey = undefined;
        if (!vekslerArbeidOgUttakTest) {
            infoTekstKey =
                'uttaksplan.validering.info.burdeKanskjeSøkeGraderingPgaVekslendeUtsettelserPgaArbeidOgUttak';
        }

        if (!veklserPerioderUtenUttakOgUttaktest) {
            infoTekstKey = 'uttaksplan.validering.info.burdeKanskjeSøkeGraderingPgaVekslendePerioderUtenUttakOgUttak';
        }

        return {
            passerer: passerer,
            info: {
                intlKey: infoTekstKey,
                renderAsHtml: true,
                values: {
                    a: (_intl: IntlShape) => (msg: any) =>
                        (
                            <a href={links.graderingInfo} className="lenke" rel="noreferrer" target="_blank">
                                {msg}
                            </a>
                        ),
                },
            },
        };
    }

    return {
        passerer: true,
    };
};

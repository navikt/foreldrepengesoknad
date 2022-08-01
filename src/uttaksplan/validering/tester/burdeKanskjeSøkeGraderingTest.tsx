import React from 'react';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { IntlShape } from 'react-intl';
import { isInfoPeriode, isUtsettelsePgaArbeid, isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import links from 'app/links/links';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

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

export const burdeKanskjeSøkeGraderingTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { perioder } = grunnlag;
    const kunSøkersPerioder = perioder.filter((p: Periode) => !isInfoPeriode(p));

    if (kunSøkersPerioder.length >= 6) {
        return {
            passerer: primitivGraderingTest(kunSøkersPerioder),
            info: {
                intlKey: 'uttaksplan.validering.info.burdeKanskjeSøkeGradering',
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

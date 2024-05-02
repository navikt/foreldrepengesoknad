import { Forelder, Periode, Tidsperioden, isUttakAnnenPart, isUttaksperiode } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/fp-formik';

import Permisjonsperiode from '../types/Permisjonsperiode';

export const mapPerioderToPermisjonsperiode = (
    perioder: Periode[],
    søkerErFarEllerMedmor: boolean,
): Permisjonsperiode[] => {
    const permisjonsPerioder: Permisjonsperiode[] = [];

    if (perioder.length === 0) {
        return permisjonsPerioder;
    }

    const forelderTypeSøker = søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    const forelderTypeAnnenPart = søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;

    let nyPermisjonsperiode: Permisjonsperiode | undefined = undefined;
    let forelderForrigePeriode: Forelder | undefined = undefined;

    perioder.forEach((periode, index) => {
        const nestePeriodeIndex = index + 1;
        let nestePeriode = undefined;
        let erSamtidigUttak = false;

        if (nestePeriodeIndex < perioder.length - 1) {
            nestePeriode = perioder[nestePeriodeIndex];
        }

        if (nestePeriode !== undefined) {
            erSamtidigUttak = Tidsperioden(periode.tidsperiode).erLik(nestePeriode.tidsperiode);
            console.log(erSamtidigUttak);
        }

        if (erSamtidigUttak) {
        }

        if (isUttakAnnenPart(periode)) {
            if (!nyPermisjonsperiode) {
                nyPermisjonsperiode = {
                    forelder: forelderTypeAnnenPart,
                    perioder: [{ ...periode }],
                    tidsperiode: {
                        fom: dateToISOString(periode.tidsperiode.fom),
                        tom: dateToISOString(periode.tidsperiode.tom),
                    },
                };

                permisjonsPerioder.push(nyPermisjonsperiode);
            } else {
                if (forelderForrigePeriode === periode.forelder) {
                    nyPermisjonsperiode.perioder = [...nyPermisjonsperiode.perioder, { ...periode }];
                    nyPermisjonsperiode.tidsperiode.tom = dateToISOString(periode.tidsperiode.tom);
                } else {
                    permisjonsPerioder.push(nyPermisjonsperiode);

                    nyPermisjonsperiode = {
                        forelder: forelderTypeAnnenPart,
                        perioder: [{ ...periode }],
                        tidsperiode: {
                            fom: dateToISOString(periode.tidsperiode.fom),
                            tom: dateToISOString(periode.tidsperiode.tom),
                        },
                    };
                }
            }

            forelderForrigePeriode = periode.forelder;
        }

        if (isUttaksperiode(periode)) {
            if (!nyPermisjonsperiode) {
                nyPermisjonsperiode = {
                    forelder: forelderTypeSøker,
                    perioder: [{ ...periode }],
                    tidsperiode: {
                        fom: dateToISOString(periode.tidsperiode.fom),
                        tom: dateToISOString(periode.tidsperiode.tom),
                    },
                };

                permisjonsPerioder.push(nyPermisjonsperiode);
            } else {
                if (forelderForrigePeriode === periode.forelder) {
                    nyPermisjonsperiode.perioder = [...nyPermisjonsperiode.perioder, { ...periode }];
                    nyPermisjonsperiode.tidsperiode.tom = dateToISOString(periode.tidsperiode.tom);
                } else {
                    permisjonsPerioder.push(nyPermisjonsperiode);

                    nyPermisjonsperiode = {
                        forelder: forelderTypeSøker,
                        perioder: [{ ...periode }],
                        tidsperiode: {
                            fom: dateToISOString(periode.tidsperiode.fom),
                            tom: dateToISOString(periode.tidsperiode.tom),
                        },
                    };
                }
            }

            forelderForrigePeriode = periode.forelder;
        }
    });

    return permisjonsPerioder;
};

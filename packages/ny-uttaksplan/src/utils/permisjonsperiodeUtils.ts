import {
    Forelder,
    Periode,
    Tidsperioden,
    isPeriodeUtenUttak,
    isUttakAnnenPart,
    isUttaksperiode,
} from '@navikt/fp-common';
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
    let erSamtidigUttak = false;

    perioder.forEach((periode, index) => {
        const nestePeriodeIndex = index + 1;
        let nestePeriode = undefined;

        if (erSamtidigUttak) {
            // Forrige periode var samtidig uttak. Skip
            erSamtidigUttak = false;
            return;
        }

        if (nestePeriodeIndex < perioder.length) {
            nestePeriode = perioder[nestePeriodeIndex];
        } else {
            nestePeriode = undefined;
        }

        if (nestePeriode !== undefined) {
            erSamtidigUttak = Tidsperioden(periode.tidsperiode).erLik(nestePeriode.tidsperiode);
        }

        if (erSamtidigUttak && nestePeriode !== undefined) {
            nyPermisjonsperiode = {
                perioder: [{ ...periode }, { ...nestePeriode }],
                tidsperiode: {
                    fom: dateToISOString(periode.tidsperiode.fom),
                    tom: dateToISOString(periode.tidsperiode.tom),
                },
                samtidigUttak: true,
            };

            permisjonsPerioder.push(nyPermisjonsperiode);
            nyPermisjonsperiode = undefined;
            forelderForrigePeriode = undefined;
            erSamtidigUttak = true;
            return;
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
            return;
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
            return;
        }

        if (isPeriodeUtenUttak(periode)) {
            if (!nyPermisjonsperiode) {
                nyPermisjonsperiode = {
                    perioder: [{ ...periode }],
                    tidsperiode: {
                        fom: dateToISOString(periode.tidsperiode.fom),
                        tom: dateToISOString(periode.tidsperiode.tom),
                    },
                };

                permisjonsPerioder.push(nyPermisjonsperiode);
                forelderForrigePeriode = undefined;
                nyPermisjonsperiode = undefined;
            } else {
                nyPermisjonsperiode = {
                    perioder: [{ ...periode }],
                    tidsperiode: {
                        fom: dateToISOString(periode.tidsperiode.fom),
                        tom: dateToISOString(periode.tidsperiode.tom),
                    },
                };

                permisjonsPerioder.push(nyPermisjonsperiode);

                forelderForrigePeriode = undefined;
                nyPermisjonsperiode = undefined;
            }
        }
    });

    return permisjonsPerioder;
};

import dayjs from 'dayjs';

import {
    Forelder,
    Periode,
    Tidsperioden,
    isHull,
    isOverføringsperiode,
    isPeriodeUtenUttak,
    isUtsettelsesperiode,
    isUttakAnnenPart,
    isUttaksperiode,
} from '@navikt/fp-common';
import { dateToISOString } from '@navikt/fp-formik';

import Permisjonsperiode from '../types/Permisjonsperiode';

const beggePerioderFørFamiliehendelsedato = (
    permisjonsperiode: Permisjonsperiode | undefined,
    periode: Periode | undefined,
    famdato: string,
) => {
    if (!periode || !permisjonsperiode) {
        return false;
    }

    if (
        dayjs(permisjonsperiode.tidsperiode.tom).isBefore(famdato) &&
        dayjs(periode.tidsperiode.tom).isBefore(famdato)
    ) {
        return true;
    }

    return false;
};

const beggePerioderEtterFamiliehendelsedato = (
    permisjonsperiode: Permisjonsperiode | undefined,
    periode: Periode | undefined,
    famdato: string,
) => {
    if (!periode || !permisjonsperiode) {
        return false;
    }

    if (
        dayjs(permisjonsperiode.tidsperiode.fom).isSameOrAfter(famdato) &&
        dayjs(periode.tidsperiode.fom).isSameOrAfter(famdato)
    ) {
        return true;
    }

    return false;
};

const beggePerioderFørEllerEtterFamiliehendelsedato = (
    permisjonsperiode: Permisjonsperiode | undefined,
    periode: Periode | undefined,
    famdato: string,
) => {
    return (
        beggePerioderEtterFamiliehendelsedato(permisjonsperiode, periode, famdato) ||
        beggePerioderFørFamiliehendelsedato(permisjonsperiode, periode, famdato)
    );
};

export const mapPerioderToPermisjonsperiode = (
    perioder: Periode[],
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: string,
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

        const beggePerioderErPåSammeSideAvFamdato = beggePerioderFørEllerEtterFamiliehendelsedato(
            nyPermisjonsperiode,
            periode,
            familiehendelsesdato,
        );

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

        if (isUttaksperiode(periode) || isUttakAnnenPart(periode) || isOverføringsperiode(periode)) {
            const forelderType = isUttakAnnenPart(periode) ? forelderTypeAnnenPart : forelderTypeSøker;

            if (!nyPermisjonsperiode) {
                nyPermisjonsperiode = {
                    forelder: forelderType,
                    perioder: [{ ...periode }],
                    tidsperiode: {
                        fom: dateToISOString(periode.tidsperiode.fom),
                        tom: dateToISOString(periode.tidsperiode.tom),
                    },
                };
            } else {
                if (forelderForrigePeriode === periode.forelder && beggePerioderErPåSammeSideAvFamdato) {
                    nyPermisjonsperiode.perioder = [...nyPermisjonsperiode.perioder, { ...periode }];
                    nyPermisjonsperiode.tidsperiode.tom = dateToISOString(periode.tidsperiode.tom);
                } else {
                    nyPermisjonsperiode = {
                        forelder: forelderType,
                        perioder: [{ ...periode }],
                        tidsperiode: {
                            fom: dateToISOString(periode.tidsperiode.fom),
                            tom: dateToISOString(periode.tidsperiode.tom),
                        },
                    };
                }
            }

            if (!permisjonsPerioder.includes(nyPermisjonsperiode)) {
                permisjonsPerioder.push(nyPermisjonsperiode);
            }

            forelderForrigePeriode = periode.forelder;
            return;
        }

        if (isPeriodeUtenUttak(periode)) {
            nyPermisjonsperiode = {
                perioder: [{ ...periode }],
                tidsperiode: {
                    fom: dateToISOString(periode.tidsperiode.fom),
                    tom: dateToISOString(periode.tidsperiode.tom),
                },
                erPeriodeUtenUttak: true,
            };

            permisjonsPerioder.push(nyPermisjonsperiode);

            forelderForrigePeriode = undefined;
            nyPermisjonsperiode = undefined;
        }

        if (isUtsettelsesperiode(periode)) {
            nyPermisjonsperiode = {
                perioder: [{ ...periode }],
                tidsperiode: {
                    fom: dateToISOString(periode.tidsperiode.fom),
                    tom: dateToISOString(periode.tidsperiode.tom),
                },
                erUtsettelse: true,
            };

            permisjonsPerioder.push(nyPermisjonsperiode);
            forelderForrigePeriode = undefined;
            nyPermisjonsperiode = undefined;
        }

        if (isHull(periode)) {
            nyPermisjonsperiode = {
                perioder: [{ ...periode }],
                tidsperiode: {
                    fom: dateToISOString(periode.tidsperiode.fom),
                    tom: dateToISOString(periode.tidsperiode.tom),
                },
                erHull: true,
            };

            permisjonsPerioder.push(nyPermisjonsperiode);
            forelderForrigePeriode = undefined;
            nyPermisjonsperiode = undefined;
        }
    });

    return permisjonsPerioder;
};

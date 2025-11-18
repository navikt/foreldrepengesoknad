import dayjs from 'dayjs';

import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';
import { TidsperiodenString, formatDateIso } from '@navikt/fp-utils';

import { Permisjonsperiode } from '../types/Permisjonsperiode';
import { Planperiode } from '../types/Planperiode';
import {
    isHull,
    isOppholdsperiode,
    isOverføringsperiode,
    isPeriodeUtenUttak,
    isPrematuruker,
    isUtsettelsesperiode,
    isUttaksperiode,
} from './periodeUtils';

const beggePerioderFørFamiliehendelsedato = (
    permisjonsperiode: Permisjonsperiode | undefined,
    periode: Planperiode | undefined,
    famdato: string,
) => {
    if (!periode || !permisjonsperiode) {
        return false;
    }

    if (dayjs(permisjonsperiode.tidsperiode.tom).isBefore(famdato) && dayjs(periode.tom).isBefore(famdato)) {
        return true;
    }

    return false;
};

const beggePerioderEtterFamiliehendelsedato = (
    permisjonsperiode: Permisjonsperiode | undefined,
    periode: Planperiode | undefined,
    famdato: string,
) => {
    if (!periode || !permisjonsperiode) {
        return false;
    }

    if (dayjs(permisjonsperiode.tidsperiode.fom).isSameOrAfter(famdato) && dayjs(periode.fom).isSameOrAfter(famdato)) {
        return true;
    }

    return false;
};

const beggePerioderFørEllerEtterFamiliehendelsedato = (
    permisjonsperiode: Permisjonsperiode | undefined,
    periode: Planperiode | undefined,
    famdato: string,
) => {
    return (
        beggePerioderEtterFamiliehendelsedato(permisjonsperiode, periode, famdato) ||
        beggePerioderFørFamiliehendelsedato(permisjonsperiode, periode, famdato)
    );
};

export const mapPerioderToPermisjonsperiode = (
    perioder: Planperiode[],
    familiehendelsesdato: string,
): Permisjonsperiode[] => {
    const permisjonsPerioder: Permisjonsperiode[] = [];

    if (perioder.length === 0) {
        return permisjonsPerioder;
    }

    let nyPermisjonsperiode: Permisjonsperiode | undefined = undefined;
    let forelderForrigePeriode: BrukerRolleSak_fpoversikt | undefined = undefined;
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
            erSamtidigUttak = TidsperiodenString({ fom: periode.fom, tom: periode.tom }).erLik({
                fom: nestePeriode.fom,
                tom: nestePeriode.tom,
            });
        }

        if (erSamtidigUttak && nestePeriode !== undefined) {
            nyPermisjonsperiode = {
                perioder: [{ ...periode }, { ...nestePeriode }],
                tidsperiode: {
                    fom: formatDateIso(periode.fom),
                    tom: formatDateIso(periode.tom),
                },
                samtidigUttak: true,
            };

            permisjonsPerioder.push(nyPermisjonsperiode);
            nyPermisjonsperiode = undefined;
            forelderForrigePeriode = undefined;
            erSamtidigUttak = true;
            return;
        }

        if (
            !periode.erAnnenPartEøs &&
            (isUttaksperiode(periode) || isOverføringsperiode(periode) || isOppholdsperiode(periode))
        ) {
            const forelderType = periode.forelder;

            if (nyPermisjonsperiode) {
                if (forelderForrigePeriode === periode.forelder && beggePerioderErPåSammeSideAvFamdato) {
                    nyPermisjonsperiode.perioder = [...nyPermisjonsperiode.perioder, { ...periode }];
                    nyPermisjonsperiode.tidsperiode.tom = formatDateIso(periode.tom);
                } else {
                    nyPermisjonsperiode = {
                        forelder: forelderType,
                        perioder: [{ ...periode }],
                        tidsperiode: {
                            fom: formatDateIso(periode.fom),
                            tom: formatDateIso(periode.tom),
                        },
                    };
                }
            } else {
                nyPermisjonsperiode = {
                    forelder: forelderType,
                    perioder: [{ ...periode }],
                    tidsperiode: {
                        fom: formatDateIso(periode.fom),
                        tom: formatDateIso(periode.tom),
                    },
                    samtidigUttak: !!periode.samtidigUttak,
                };
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
                    fom: formatDateIso(periode.fom),
                    tom: formatDateIso(periode.tom),
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
                    fom: formatDateIso(periode.fom),
                    tom: formatDateIso(periode.tom),
                },
                erUtsettelse: true,
            };

            permisjonsPerioder.push(nyPermisjonsperiode);
            forelderForrigePeriode = undefined;
            nyPermisjonsperiode = undefined;
        }

        if (!periode.erAnnenPartEøs && isPrematuruker(periode)) {
            const forelderType = periode.forelder;

            nyPermisjonsperiode = {
                forelder: forelderType,
                perioder: [{ ...periode }],
                tidsperiode: {
                    fom: formatDateIso(periode.fom),
                    tom: formatDateIso(periode.tom),
                },
                erUtsettelse: false,
            };

            permisjonsPerioder.push(nyPermisjonsperiode);
            forelderForrigePeriode = undefined;
            nyPermisjonsperiode = undefined;
        }

        if (isHull(periode)) {
            nyPermisjonsperiode = {
                perioder: [{ ...periode }],
                tidsperiode: {
                    fom: formatDateIso(periode.fom),
                    tom: formatDateIso(periode.tom),
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

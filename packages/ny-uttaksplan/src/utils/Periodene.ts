import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { TidsperiodenString, datoErInnenforTidsperiodeString, isValidTidsperiodeString } from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';
import { genererPeriodeId, getTidsperiodeFromPlanperiode, isForeldrepengerFørFødselPeriode } from './periodeUtils';

dayjs.extend(isSameOrBefore);

export const Periodene = (perioder: Planperiode[]) => ({
    getPerioderEtterFamiliehendelsesdato: (dato: Date | string) => getPerioderEtterFamiliehendelsesdato(perioder, dato),
    finnOverlappendePerioder: (periode: Planperiode) => finnOverlappendePerioder(perioder, periode),
});

export function sorterPerioder(p1: Planperiode, p2: Planperiode) {
    const tidsperiodeP1 = getTidsperiodeFromPlanperiode(p1);
    const tidsperiodeP2 = getTidsperiodeFromPlanperiode(p2);

    if (isValidTidsperiodeString(tidsperiodeP1) === false || isValidTidsperiodeString(tidsperiodeP2) === false) {
        if (isForeldrepengerFørFødselPeriode(p1) && p1.skalIkkeHaUttakFørTermin) {
            return -1;
        }
        return isValidTidsperiodeString(tidsperiodeP1) ? 1 : -1;
    }

    if (TidsperiodenString(tidsperiodeP2).erOmsluttetAv(tidsperiodeP1)) {
        return 1;
    }

    return dayjs(tidsperiodeP1.fom).isBefore(tidsperiodeP2.fom, 'day') ? -1 : 1;
}

function finnOverlappendePerioder(perioder: Planperiode[], periode: Planperiode): Planperiode[] {
    return perioder.filter((p) => {
        if (
            genererPeriodeId(p) === genererPeriodeId(periode) ||
            !isValidTidsperiodeString({ fom: periode.fom, tom: periode.tom })
        ) {
            return false;
        }
        const { fom, tom } = p;
        if (!fom || !tom) {
            return false;
        }
        const fomEllerTomErInnenforTidsperiode =
            datoErInnenforTidsperiodeString(fom, { fom: periode.fom, tom: periode.tom }) ||
            datoErInnenforTidsperiodeString(tom, { fom: periode.fom, tom: periode.tom });

        const fomTomOmkranserTidsperiode =
            dayjs(periode.fom).isSameOrAfter(fom, 'day') && dayjs(periode.tom).isSameOrBefore(tom, 'day');

        return fomEllerTomErInnenforTidsperiode || fomTomOmkranserTidsperiode;
    });
}

function getPerioderEtterFamiliehendelsesdato(perioder: Planperiode[], familiehendelsesdato: Date | string) {
    return perioder.filter(
        (periode) =>
            isValidTidsperiodeString({ fom: periode.fom, tom: periode.tom }) &&
            dayjs(periode.fom).isSameOrAfter(familiehendelsesdato, 'day') &&
            isForeldrepengerFørFødselPeriode(periode) === false,
    );
}

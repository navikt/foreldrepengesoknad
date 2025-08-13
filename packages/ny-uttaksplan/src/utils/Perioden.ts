import dayjs from 'dayjs';

import { TidsperiodenString, UttaksdagenString, getTidsperiodeString } from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';
import { formaterDatoKompakt } from './dateUtils';
import { isForeldrepengerFørFødselPeriode, isHull, isUtsettelsesperiode } from './periodeUtils';

export const Perioden = (periode: Planperiode) => ({
    setStartdato: (fom: string) => flyttPeriode(periode, fom),
    setUttaksdager: (uttaksdager: number) => {
        const tidsperiode = getTidsperiodeString(periode.fom, uttaksdager);
        periode.fom = tidsperiode.fom;
        periode.tom = tidsperiode.tom;
    },
    getAntallUttaksdager: () => TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
    erLik: (periode2: Planperiode, inkluderTidsperiode = false, inkluderUtsettelser = false) =>
        erPerioderLike(periode, periode2, inkluderTidsperiode, inkluderUtsettelser),
    erSammenhengende: (periode2: Planperiode) => erPerioderSammenhengende(periode, periode2),
    starterFør: (dato: Date) => dayjs(periode.fom).isBefore(dato, 'day'),
    slutterEtter: (dato: Date) => dayjs(periode.tom).isAfter(dato, 'day'),
    slutterSammeDagEllerEtter: (dato: Date) => dayjs(periode.tom).isSameOrAfter(dato, 'day'),
});

function erPerioderSammenhengende(p1: Planperiode, p2: Planperiode) {
    const p1NesteUttaksdato = UttaksdagenString(p1.tom).neste();
    const p2Startdato = p2.fom;
    return dayjs(p1NesteUttaksdato).isSame(p2Startdato, 'day');
}

function erPerioderLike(p1: Planperiode, p2: Planperiode, inkluderTidsperiode = false, inkluderUtsettelser = false) {
    if (inkluderUtsettelser === false && (isUtsettelsesperiode(p1) || isUtsettelsesperiode(p2))) {
        return false;
    }

    if (isHull(p1) && isHull(p2)) {
        return true;
    }

    if (isForeldrepengerFørFødselPeriode(p1) && isForeldrepengerFørFødselPeriode(p2)) {
        const fff1 = getPeriodeFootprint(
            { ...p1, skalIkkeHaUttakFørTermin: p1.skalIkkeHaUttakFørTermin || false },
            inkluderTidsperiode,
        );
        const fff2 = getPeriodeFootprint(
            { ...p2, skalIkkeHaUttakFørTermin: p2.skalIkkeHaUttakFørTermin || false },
            inkluderTidsperiode,
        );
        return fff1 === fff2;
    }
    const k1 = getPeriodeFootprint(p1, inkluderTidsperiode);
    const k2 = getPeriodeFootprint(p2, inkluderTidsperiode);

    return k1 === k2;
}

function getPeriodeFootprint(periode: Planperiode, inkluderTidsperiode = false) {
    const { fom, tom, id, ...rest } = periode;
    const sortedPeriode = {} as any;
    Object.keys(rest)
        .sort((a, b) => a.localeCompare(b))
        .filter((key) => (rest as any)[key] !== undefined)
        .forEach((key) => {
            sortedPeriode[key] = (rest as any)[key];
        });
    if (inkluderTidsperiode) {
        sortedPeriode.fom = fom ? formaterDatoKompakt(fom) : undefined;
        sortedPeriode.tom = tom ? formaterDatoKompakt(tom) : undefined;
    }
    return JSON.stringify({ ...sortedPeriode });
}

function flyttPeriode(periode: Planperiode, fom: string): Planperiode {
    const nyTidsperiode = TidsperiodenString({ fom: periode.fom, tom: periode.tom }).setStartdato(fom);

    return {
        ...periode,
        fom: nyTidsperiode.fom,
        tom: nyTidsperiode.tom,
    };
}

import dayjs from 'dayjs';

import { SaksperiodeNy } from '@navikt/fp-types';
import { TidsperiodenNy, dateToISOString, getTidsperiode, getTidsperiodeDate } from '@navikt/fp-utils';

import { ISOStringToDate } from './dateUtils';

export const Perioden = (periode: SaksperiodeNy) => ({
    setStartdato: (fom: Date) => flyttPeriode(periode, fom),
    setUttaksdager: (uttaksdager: number) => {
        const tidsperiode = getTidsperiode(ISOStringToDate(periode.fom)!, uttaksdager);
        periode.fom = dateToISOString(tidsperiode.fom);
        periode.tom = dateToISOString(tidsperiode.tom);
    },
    getAntallUttaksdager: () => TidsperiodenNy(getTidsperiodeDate(periode)).getAntallUttaksdager(),
    erLik: (periode2: SaksperiodeNy, inkluderTidsperiode = false, inkluderUtsettelser = false) =>
        erPerioderLike(periode, periode2, inkluderTidsperiode, inkluderUtsettelser),
    erSammenhengende: (periode2: SaksperiodeNy) => erPerioderSammenhengende(periode, periode2),
    starterFør: (dato: Date) => dayjs(periode.fom).isBefore(dato, 'day'),
    slutterEtter: (dato: Date) => dayjs(periode.tom).isAfter(dato, 'day'),
    slutterSammeDagEllerEtter: (dato: Date) => dayjs(periode.tom).isSameOrAfter(dato, 'day'),
});

function erPerioderSammenhengende(p1: SaksperiodeNy, p2: SaksperiodeNy) {
    const p1NesteUttaksdato = UttaksdagenNy(dayjs(p1.tom).toDate()).neste();
    const p2Startdato = p2.fom;
    return dayjs(p1NesteUttaksdato).isSame(p2Startdato, 'day');
}

function erPerioderLike(
    p1: SaksperiodeNy,
    p2: SaksperiodeNy,
    inkluderTidsperiode = false,
    inkluderUtsettelser = false,
) {
    if (inkluderUtsettelser === false && (isUtsettelsesperiode(p1) || isUtsettelsesperiode(p2))) {
        return false;
    }
    if (p1.type === Periodetype.Hull && p2.type === Periodetype.Hull) {
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

function getPeriodeFootprint(periode: SaksperiodeNy, inkluderTidsperiode = false) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fom, tom, ...rest } = periode;
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

function flyttPeriode(periode: SaksperiodeNy, fom: Date): SaksperiodeNy {
    const tidsperiode = getTidsperiodeDate(periode);
    const nyTidsperiode = TidsperiodenNy(tidsperiode).setStartdato(fom);

    return {
        ...periode,
        fom: dateToISOString(nyTidsperiode.fom),
        tom: dateToISOString(nyTidsperiode.tom),
    };
}

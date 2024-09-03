import dayjs from 'dayjs';

import { Tidsperioden, Uttaksdagen, getTidsperiode } from '@navikt/fp-utils';

import { Periode, Periodetype, isForeldrepengerFørFødselUttaksperiode } from '../types';
import { formaterDatoKompakt } from './dateUtils';

export const Perioden = (periode: Periode) => ({
    setStartdato: (fom: Date) => flyttPeriode(periode, fom),
    setUttaksdager: (uttaksdager: number) =>
        (periode.tidsperiode = getTidsperiode(periode.tidsperiode.fom, uttaksdager)),
    getAntallUttaksdager: () => Tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
    erLik: (periode2: Periode, inkluderTidsperiode = false, inkluderUtsettelser = false) =>
        erPerioderLike(periode, periode2, inkluderTidsperiode, inkluderUtsettelser),
    erSammenhengende: (periode2: Periode) => erPerioderSammenhengende(periode, periode2),
    starterFør: (dato: Date) => dayjs(periode.tidsperiode.fom).isBefore(dato, 'day'),
    slutterEtter: (dato: Date) => dayjs(periode.tidsperiode.tom).isAfter(dato, 'day'),
    slutterSammeDagEllerEtter: (dato: Date) => dayjs(periode.tidsperiode.tom).isSameOrAfter(dato, 'day'),
});

function erPerioderSammenhengende(p1: Periode, p2: Periode) {
    const p1NesteUttaksdato = Uttaksdagen(dayjs(p1.tidsperiode.tom).toDate()).neste();
    const p2Startdato = p2.tidsperiode.fom;
    return dayjs(p1NesteUttaksdato).isSame(p2Startdato, 'day');
}

function erPerioderLike(p1: Periode, p2: Periode, inkluderTidsperiode = false, inkluderUtsettelser = false) {
    if (p1.type !== p2.type) {
        return false;
    }
    if (inkluderUtsettelser === false && (p1.type === Periodetype.Utsettelse || p2.type === Periodetype.Utsettelse)) {
        return false;
    }
    if (p1.type === Periodetype.Hull && p2.type === Periodetype.Hull) {
        return true;
    }
    if (isForeldrepengerFørFødselUttaksperiode(p1) && isForeldrepengerFørFødselUttaksperiode(p2)) {
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

function getPeriodeFootprint(periode: Periode, inkluderTidsperiode = false) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tidsperiode, id, ...rest } = periode;
    const sortedPeriode: any = {};
    Object.keys(rest)
        .sort((a, b) => a.localeCompare(b))
        .filter((key) => (rest as any)[key] !== undefined)
        .forEach((key) => {
            sortedPeriode[key] = (rest as any)[key];
        });
    if (inkluderTidsperiode && tidsperiode) {
        sortedPeriode.tidsperiode = {
            fom: tidsperiode.fom ? formaterDatoKompakt(tidsperiode.fom) : undefined,
            tom: tidsperiode.tom ? formaterDatoKompakt(tidsperiode.tom) : undefined,
        };
    }
    return JSON.stringify({ ...sortedPeriode });
}

function flyttPeriode(periode: Periode, fom: Date): Periode {
    const { tidsperiode } = periode;

    return {
        ...periode,
        tidsperiode: Tidsperioden({
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        }).setStartdato(fom),
    };
}

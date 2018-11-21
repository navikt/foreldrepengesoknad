import moment from 'moment';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { getTidsperiode, Tidsperioden } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';
import { Tidsperiode } from 'common/types';

export const Perioden = (periode: Periode) => ({
    erUttak: () => erUttak(periode),
    erUtsettelse: () => erUtsettelse(periode),
    erOpphold: () => erOpphold(periode),
    setStartdato: (fom: Date) => flyttPeriode(periode, fom),
    setUttaksdager: (uttaksdager: number) =>
        (periode.tidsperiode = getTidsperiode(periode.tidsperiode.fom, uttaksdager)),
    getAntallUttaksdager: () => Tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
    erLik: (periode2: Periode) => erPerioderLike(periode, periode2),
    erSammenhengende: (periode2: Periode) => erPerioderSammenhengende(periode, periode2)
});

function erOpphold(periode: Periode): boolean {
    return periode.type === Periodetype.Opphold;
}

function erUtsettelse(periode: Periode): boolean {
    return periode.type === Periodetype.Utsettelse;
}

function erUttak(periode: Periode): boolean {
    return periode.type === Periodetype.Uttak;
}

function erPerioderSammenhengende(p1: Periode, p2: Periode) {
    const p1NesteUttaksdato = Uttaksdagen(p1.tidsperiode.tom).neste();
    const p2Startdato = p2.tidsperiode.fom;
    return moment(p1NesteUttaksdato).isSame(p2Startdato, 'day');
}

function erPerioderLike(p1: Periode, p2: Periode) {
    if (p1.type !== p2.type || p1.type === Periodetype.Utsettelse || p2.type === Periodetype.Utsettelse) {
        return false;
    }
    if (p1.type === Periodetype.Hull && p2.type === Periodetype.Hull) {
        return true;
    }
    const k1 = getPeriodeFootprint(p1);
    const k2 = getPeriodeFootprint(p2);
    return k1 === k2;
}

function getPeriodeFootprint(periode: Periode) {
    const { tidsperiode, id, ...rest } = periode;
    const sortedPeriode = {};
    Object.keys(rest)
        .sort()
        .forEach((key) => {
            sortedPeriode[key] = rest[key];
        });
    return JSON.stringify({ ...sortedPeriode });
}

function flyttPeriode(periode: Periode, fom: Date): Periode {
    return {
        ...periode,
        tidsperiode: Tidsperioden(periode.tidsperiode).setStartdato(fom) as Tidsperiode
    };
}

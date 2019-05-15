import moment from 'moment';
import {
    Periode,
    Periodetype,
    isForeldrepengerFørFødselUttaksperiode,
    isVanligHull
} from '../../types/uttaksplan/periodetyper';
import { getTidsperiode, Tidsperioden } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';
import { Tidsperiode } from 'common/types';
import { formaterDatoKompakt } from 'common/util/datoUtils';

export const Perioden = (periode: Periode) => ({
    erUttak: () => erUttak(periode),
    erUtsettelse: () => erUtsettelse(periode),
    erOpphold: () => erOpphold(periode),
    setStartdato: (fom: Date) => flyttPeriode(periode, fom),
    setUttaksdager: (uttaksdager: number) =>
        (periode.tidsperiode = getTidsperiode(periode.tidsperiode.fom, uttaksdager)),
    getAntallUttaksdager: () => Tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
    erLik: (periode2: Periode, inkluderTidsperiode: boolean = false, inkluderUtsettelser: boolean = false) =>
        erPerioderLike(periode, periode2, inkluderTidsperiode, inkluderUtsettelser),
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

function erPerioderLike(
    p1: Periode,
    p2: Periode,
    inkluderTidsperiode: boolean = false,
    inkluderUtsettelser: boolean = false
) {
    if (p1.type !== p2.type) {
        return false;
    }
    if (inkluderUtsettelser === false && (p1.type === Periodetype.Utsettelse || p2.type === Periodetype.Utsettelse)) {
        return false;
    }
    if (isVanligHull(p1) && isVanligHull(p2)) {
        return true;
    }
    if (isForeldrepengerFørFødselUttaksperiode(p1) && isForeldrepengerFørFødselUttaksperiode(p2)) {
        const fff1 = getPeriodeFootprint(
            { ...p1, skalIkkeHaUttakFørTermin: p1.skalIkkeHaUttakFørTermin || false },
            inkluderTidsperiode
        );
        const fff2 = getPeriodeFootprint(
            { ...p2, skalIkkeHaUttakFørTermin: p2.skalIkkeHaUttakFørTermin || false },
            inkluderTidsperiode
        );
        return fff1 === fff2;
    }
    const k1 = getPeriodeFootprint(p1, inkluderTidsperiode);
    const k2 = getPeriodeFootprint(p2, inkluderTidsperiode);
    return k1 === k2;
}

function getPeriodeFootprint(periode: Periode, inkluderTidsperiode: boolean = false) {
    const { tidsperiode, id, ...rest } = periode;
    const sortedPeriode: any = {};
    Object.keys(rest)
        .sort()
        .filter((key) => rest[key] !== undefined)
        .forEach((key) => {
            sortedPeriode[key] = rest[key];
        });
    if (inkluderTidsperiode && tidsperiode) {
        sortedPeriode.tidsperiode = {
            fom: tidsperiode.fom ? formaterDatoKompakt(tidsperiode.fom) : undefined,
            tom: tidsperiode.tom ? formaterDatoKompakt(tidsperiode.tom) : undefined
        };
    }
    return JSON.stringify({ ...sortedPeriode });
}

function flyttPeriode(periode: Periode, fom: Date): Periode {
    return {
        ...periode,
        tidsperiode: Tidsperioden(periode.tidsperiode).setStartdato(fom) as Tidsperiode
    };
}

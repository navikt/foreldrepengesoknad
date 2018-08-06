import { isSameDay } from 'date-fns';
import { Periode, Periodetype } from '../types';
import { getTidsperiode, Tidsperioden } from 'uttaksplan/utils/Tidsperioden';
import { Uttaksdagen } from 'uttaksplan/utils/Uttaksdagen';

export const Perioden = (periode: Periode) => ({
    erUttak: () => erUttak(periode),
    erUtsettelse: () => erUtsettelse(periode),
    erOpphold: () => erOpphold(periode),
    erLik: (periode2: Periode) => erPerioderLike(periode, periode2),
    erSammenhengende: (periode2: Periode) =>
        erPerioderSammenhengende(periode, periode2),
    setStartdato: (fom: Date) => flyttPeriode(periode, fom),
    setUttaksdager: (uttaksdager: number) =>
        (periode.tidsperiode = getTidsperiode(
            periode.tidsperiode.fom,
            uttaksdager
        )),
    getAntallUttaksdager: () =>
        Tidsperioden(periode.tidsperiode).getAntallUttaksdager()
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

/**
 * Sjekker om to perioder er sammenhengende/dvs. det er ingen
 * uttaksdager mellom p1.sluttdato og p2.startdato
 * @param p1
 * @param p2
 */
function erPerioderSammenhengende(p1: Periode, p2: Periode) {
    const p1NesteUttaksdato = Uttaksdagen(p1.tidsperiode.tom).neste();
    const p2Startdato = p2.tidsperiode.fom;
    return isSameDay(p1NesteUttaksdato, p2Startdato);
}

/**
 * Sjekker om to perioder er kan slåes sammen til en periode.
 * Dvs. de er like signaturer (type, forelder, konto etc.) og har
 * tidsperioder som er sammenhengende
 * @param p1 periode 1
 * @param p2 periode 2
 */
function erPerioderLike(p1: Periode, p2: Periode) {
    if (
        p1.type !== p2.type ||
        p1.type === Periodetype.Utsettelse ||
        p2.type === Periodetype.Utsettelse
    ) {
        return false;
    }
    const k1 = getPeriodeFootprint(p1);
    const k2 = getPeriodeFootprint(p2);
    return k1 === k2;
}

/**
 * Lager et grunnlag for å sammenligne perioder med tanke
 * på å slå dem sammen til en periode
 * @param periode
 */
function getPeriodeFootprint(periode: Periode) {
    switch (periode.type) {
        case Periodetype.Opphold:
            return `${periode.type}`;
        case Periodetype.Utsettelse:
            return `${periode.type}${periode.forelder}${periode.årsak}`;
        case Periodetype.Uttak:
            return `${periode.type}${periode.forelder}${periode.konto}${
                periode.låstForelder
            }`;
    }
}

/**
 * Flytter periode til ny startdato, beholder samme antall uttaksdager
 * @param periode
 * @param fom
 */
function flyttPeriode(periode: Periode, fom: Date): Periode {
    return {
        ...periode,
        tidsperiode: Tidsperioden(periode.tidsperiode).setStartdato(fom)
    };
}

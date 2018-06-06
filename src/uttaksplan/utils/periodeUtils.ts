import { addDays, isWithinRange, isSameDay, isBefore } from 'date-fns';
import {
    Periode,
    Stønadsperiode,
    Utsettelsesperiode,
    Periodesplitt,
    Tidsperiode,
    Periodetype,
    Perioder,
    TaptPeriode
} from '../types';
import {
    getForsteUttaksdagPaEllerForDato,
    getForsteUttaksdagFørDato,
    getForsteUttaksdagPaEllerEtterDato,
    getForsteUttaksdagEtterDato,
    leggUttaksdagerTilDato,
    getAntallUttaksdagerITidsperiode,
    utsettDatoUttaksdager
} from './uttaksdagerUtils';
import { guid } from 'nav-frontend-js-utils';

/**
 * Sorterer perioder ut fra startdato - asc
 * @param p1
 * @param p2
 */
export function sorterPerioder(p1: Periode, p2: Periode) {
    return p1.tidsperiode.startdato >= p2.tidsperiode.startdato ? 1 : -1;
}

/**
 * Returnerer perioder som er stønadperioder
 * @param perioder
 */
export function getStonadsperioder(perioder: Periode[]): Stønadsperiode[] {
    return perioder.filter(
        (periode) => periode.type === Periodetype.Stonadsperiode
    ) as Stønadsperiode[];
}

/**
 * Finner periode som inneholder angitt dato
 * @param perioder
 * @param dato dato som periode skal inneholde
 */
export function finnPeriodeMedDato(
    perioder: Periode[],
    dato: Date
): Periode | undefined {
    return perioder.find((periode) => {
        return isWithinRange(
            dato,
            periode.tidsperiode.startdato,
            periode.tidsperiode.sluttdato
        );
    });
}

export function finnOgLeggTilTapteUttak(perioder: Perioder): Perioder {
    const taptePerioder: TaptPeriode[] = [];
    const filtrertePerioder = perioder.filter(
        (p) => p.type !== Periodetype.TaptPeriode
    );
    const len = filtrertePerioder.length;
    filtrertePerioder.forEach((periode, idx) => {
        if (idx === len - 1) {
            return;
        }
        const nestePeriode = filtrertePerioder[idx + 1];

        const tidsperiodeMellomPerioder = {
            startdato: getForsteUttaksdagEtterDato(
                periode.tidsperiode.sluttdato
            ),
            sluttdato: getForsteUttaksdagFørDato(
                nestePeriode.tidsperiode.startdato
            )
        };
        if (
            isBefore(
                tidsperiodeMellomPerioder.sluttdato,
                tidsperiodeMellomPerioder.startdato
            )
        ) {
            return;
        }

        const uttaksdagerITidsperiode = getAntallUttaksdagerITidsperiode(
            tidsperiodeMellomPerioder
        );
        if (uttaksdagerITidsperiode > 0) {
            taptePerioder.push({
                id: guid(),
                type: Periodetype.TaptPeriode,
                tidsperiode: tidsperiodeMellomPerioder,
                forelder: 'forelder1'
            });
        }
    });
    return filtrertePerioder.concat(taptePerioder).sort(sorterPerioder);
}

/**
 * Henter tidsperioden hvor en forelder har sammenhengende permisjon, uavhengig av utsettelser,
 * med start i en periode som er i periodelisten
 */
export function getSammenhengendePerioder(
    periode: Periode,
    perioder: Periode[]
): Periode[] {
    const stonadsperioder = getStonadsperioder(perioder);
    const periodeIndex = stonadsperioder.findIndex((p) => p === periode);
    let forstePeriodeIndex = periodeIndex; // Finn startperioden med samme forelder før periode
    if (periodeIndex > 0) {
        let sammeForelder = true;
        while (forstePeriodeIndex > 0 && sammeForelder) {
            sammeForelder =
                stonadsperioder[forstePeriodeIndex - 1].forelder ===
                periode.forelder;
            if (sammeForelder) {
                forstePeriodeIndex--;
            }
        }
    }
    const idx = stonadsperioder // Finn sluttperioden med samme forelder etter periode
        .slice(periodeIndex)
        .findIndex((p) => p.forelder !== periode.forelder);

    const sistePeriodeIndex =
        idx === -1 ? stonadsperioder.length : periodeIndex + idx;

    return stonadsperioder.slice(forstePeriodeIndex, sistePeriodeIndex); // Returnerer de sammenhengende periodene
}

/**
 * Finner gyldig sluttdato for en periode ut fra startdato og varighet i antall uker
 * @param startdato
 * @param uker
 */
export function getPeriodeSluttdato(startdato: Date, uker: number): Date {
    const sluttdato = leggUttaksdagerTilDato(startdato, uker * 5 - 1);
    return getForsteUttaksdagPaEllerForDato(sluttdato);
}

/**
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 * @param stonadsperioder
 * @param utsettelser
 */
export function leggUtsettelserTilStønadsperioder(
    stonadsperioder: Stønadsperiode[],
    utsettelser: Utsettelsesperiode[]
): Periode[] {
    if (utsettelser.length === 0) {
        return stonadsperioder;
    }
    let perioder: Periode[] = stonadsperioder.map((p) => p);
    utsettelser.forEach((utsettelse) => {
        perioder = leggTilUtsettelse(perioder, utsettelse);
    });
    return perioder;
}

/**
 * Finner periode som er berørt av utsettelse, splitter den i to og
 * legger inn utsettelse i mellom. Forskyver påfølgende perioder
 * @param perioder
 * @param utsettelse
 */
export function leggTilUtsettelse(
    perioder: Periode[],
    utsettelse: Utsettelsesperiode
): Periode[] {
    const periode = finnPeriodeMedDato(
        perioder,
        utsettelse.tidsperiode.startdato
    );
    if (!periode) {
        throw new Error('Ingen periode funnet som passer til utsettelse');
    }
    if (
        isSameDay(
            periode.tidsperiode.startdato,
            utsettelse.tidsperiode.startdato
        )
    ) {
        return leggTilUtsettelseEtterPeriode(perioder, periode, utsettelse);
    } else {
        return leggTilUtsettelseIPeriode(perioder, periode, utsettelse);
    }
}

/**
 * Legger inn en utsettelse etter en periode, og forskyver påfølgende perioder
 * @param perioder
 * @param periode
 * @param utsettelse
 */
const leggTilUtsettelseEtterPeriode = (
    perioder: Periode[],
    periode: Periode,
    utsettelse: Utsettelsesperiode
): Periode[] => {
    const { perioderFor, perioderEtter } = hentPerioderFørOgEtterPeriode(
        perioder,
        periode
    );
    return [
        ...perioderFor,
        ...[utsettelse],
        ...forskyvPerioder(
            [periode, ...perioderEtter],
            getForsteUttaksdagPaEllerEtterDato(utsettelse.tidsperiode.sluttdato)
        )
    ];
};

/**
 * Legger en utsettelse inn i en periode og forskyver påfølgende perioder
 * @param perioder
 * @param periode
 * @param utsettelse
 */
const leggTilUtsettelseIPeriode = (
    perioder: Periode[],
    periode: Periode,
    utsettelse: Utsettelsesperiode
): Periode[] => {
    const { perioderFor, perioderEtter } = hentPerioderFørOgEtterPeriode(
        perioder,
        periode
    );
    const periodeSplittetMedUtsettelse = leggUtsettelseInnIPeriode(
        periode,
        utsettelse
    );
    const sisteSplittetPeriode = periodeSplittetMedUtsettelse[2];
    return [
        ...perioderFor,
        ...periodeSplittetMedUtsettelse,
        ...forskyvPerioder(
            perioderEtter,
            getForsteUttaksdagPaEllerEtterDato(
                sisteSplittetPeriode.tidsperiode.sluttdato
            )
        )
    ];
};

/**
 * Legger en utsettelse inn i en periode og forskyver sluttdatoen for perioden
 * tilsvarende utsettelsens varighet
 * @param periode
 * @param utsettelse
 */
const leggUtsettelseInnIPeriode = (
    periode: Periode,
    utsettelse: Utsettelsesperiode
): Periode[] => {
    const dagerIPeriode = getAntallUttaksdagerITidsperiode(periode.tidsperiode);
    const dagerForsteDel = getAntallUttaksdagerITidsperiode({
        startdato: periode.tidsperiode.startdato,
        sluttdato: addDays(utsettelse.tidsperiode.startdato, -1)
    });
    const dagerSisteDel = dagerIPeriode - dagerForsteDel;
    const forste: Stønadsperiode = {
        ...(periode as Stønadsperiode),
        tidsperiode: {
            startdato: periode.tidsperiode.startdato,
            sluttdato: getForsteUttaksdagFørDato(
                utsettelse.tidsperiode.startdato
            )
        }
    };
    const midt: Utsettelsesperiode = {
        ...utsettelse,
        tidsperiode: {
            startdato: getForsteUttaksdagPaEllerEtterDato(
                utsettelse.tidsperiode.startdato
            ),
            sluttdato: getForsteUttaksdagPaEllerForDato(
                utsettelse.tidsperiode.sluttdato
            )
        }
    };
    const startSisteDel: Date = getForsteUttaksdagEtterDato(
        midt.tidsperiode.sluttdato
    );
    const siste: Stønadsperiode = {
        ...(periode as Stønadsperiode),
        tidsperiode: {
            startdato: startSisteDel,
            sluttdato: utsettDatoUttaksdager(startSisteDel, dagerSisteDel)
        }
    };
    return [forste, midt, siste];
};

/**
 * Flytter en tidsperiode til ny startdato
 * @param tidsperiode
 * @param startdato
 */
export function flyttTidsperiode(
    tidsperiode: Tidsperiode,
    startdato: Date
): Tidsperiode {
    const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
    return {
        startdato,
        sluttdato: leggUttaksdagerTilDato(startdato, uttaksdager - 1)
    };
}

/**
 * Forskyver alle perioder ut fra ny startdato
 * @param perioder
 * @param startdato
 */
const forskyvPerioder = (perioder: Periode[], startdato: Date): Periode[] => {
    let forrigeDato = startdato;
    return perioder.map((periode) => {
        if (periode.type === Periodetype.Utsettelse) {
            return periode;
        }
        const tidsperiode = flyttTidsperiode(
            periode.tidsperiode,
            getForsteUttaksdagPaEllerEtterDato(addDays(forrigeDato, 1))
        );
        forrigeDato = tidsperiode.sluttdato;
        return {
            ...periode,
            tidsperiode
        };
    });
};

/**
 * Returnerer perioder før og etter en gitt periode
 * @param perioder
 * @param periode
 */
const hentPerioderFørOgEtterPeriode = (
    perioder: Periode[],
    periode: Periode
): Periodesplitt => {
    const arr: Periode[] = [...perioder];
    const index = arr.findIndex((p) => p === periode);
    const perioderEtter = arr.splice(index + 1);
    const perioderFor: Periode[] = [...arr.slice(0, index)];
    return {
        perioderFor,
        perioderEtter
    };
};

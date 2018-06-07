import { addDays, isWithinRange, isSameDay, isBefore } from 'date-fns';
// import groupBy from 'lodash.groupby';
import {
    Periode,
    Stønadsperiode,
    Utsettelsesperiode,
    Periodesplitt,
    Tidsperiode,
    Periodetype,
    Perioder,
    Oppholdsperiode,
    OppholdÅrsakType
} from '../types';
import {
    getForsteUttaksdagPaEllerForDato,
    getForsteUttaksdagFørDato,
    getForsteUttaksdagPaEllerEtterDato,
    getForsteUttaksdagEtterDato,
    getAntallUttaksdagerITidsperiode,
    getSisteUttaksdagIPeriode,
    leggUttaksdagerTilDato
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
export function getStønadsperioder(perioder: Perioder): Stønadsperiode[] {
    return perioder.filter(
        (periode) => periode.type === Periodetype.Stønadsperiode
    ) as Stønadsperiode[];
}

/**
 * Returnerer perioder som er stønadperioder
 * @param perioder
 */
export function getUtsettelser(perioder: Perioder): Utsettelsesperiode[] {
    return perioder.filter(
        (periode) => periode.type === Periodetype.Utsettelse
    ) as Utsettelsesperiode[];
}

/**
 * Finner periode som inneholder angitt dato
 * @param perioder
 * @param dato dato som periode skal inneholde
 */
export function finnPeriodeMedDato(
    perioder: Perioder,
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

/** Bygger uttaksplan opp på nytt gitt perioder som er registrert */
export function refordelPerioder(perioder: Periode[]): Periode[] {
    let stønadperioder = getStønadsperioder(perioder).sort(sorterPerioder);
    const utsettelser = getUtsettelser(perioder).sort(sorterPerioder);
    stønadperioder = resetStønadsperiodeTidsperioder(stønadperioder);
    const perioderMedUtsettelser = leggTilUtsettelser(
        stønadperioder,
        utsettelser
    ).sort(sorterPerioder);
    const perioderMedOpphold = finnOgLeggTilOpphold(perioderMedUtsettelser);
    return slåSammenLikePerioder(perioderMedOpphold);
}

/**
 * Resetter tidspunkt til stønadsperioder
 */
export function resetStønadsperiodeTidsperioder(
    perioder: Stønadsperiode[]
): Stønadsperiode[] {
    let forrigePeriode: Stønadsperiode;
    const sammenslåttePerioder = slåSammenLikePerioder(
        perioder
    ) as Stønadsperiode[];
    const resattePerioder = sammenslåttePerioder.map((periode) => {
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return periode;
        }
        const uttaksdager = getAntallUttaksdagerITidsperiode(
            periode.tidsperiode
        );
        const startdato = getForsteUttaksdagEtterDato(
            forrigePeriode.tidsperiode.sluttdato
        );
        const tidsperiode: Tidsperiode = {
            startdato,
            sluttdato: getPeriodeSluttdato(startdato, uttaksdager)
        };

        forrigePeriode = {
            ...periode,
            tidsperiode,
            uttaksdager: getAntallUttaksdagerITidsperiode(tidsperiode)
        };
        return {
            ...periode,
            tidsperiode: { ...forrigePeriode.tidsperiode }
        };
    });

    return resattePerioder;
}

export function finnOgLeggTilOpphold(perioder: Perioder): Perioder {
    const opphold: Oppholdsperiode[] = [];
    const filtrertePerioder = perioder.filter(
        (p) => p.type !== Periodetype.Opphold
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
            opphold.push({
                id: guid(),
                type: Periodetype.Opphold,
                tidsperiode: tidsperiodeMellomPerioder,
                årsak: OppholdÅrsakType.ManglendeSøktPeriode,
                forelder: 'forelder1' // TODO ikke hardkodet
            });
        }
    });
    return filtrertePerioder.concat(opphold).sort(sorterPerioder);
}

/**
 * Finner gyldig sluttdato for en periode ut fra startdato og varighet i antall uker
 * @param startdato
 * @param uker
 */
export function getPeriodeSluttdatoMedUker(
    startdato: Date,
    uker: number
): Date {
    const sluttdato = getSisteUttaksdagIPeriode(startdato, uker * 5);
    return getForsteUttaksdagPaEllerForDato(sluttdato);
}

/**
 * Finner gyldig sluttdato for en periode ut fra startdato og varighet i antall uker
 * @param startdato
 * @param uker
 */
export function getPeriodeSluttdato(startdato: Date, dager: number): Date {
    return getSisteUttaksdagIPeriode(startdato, dager);
}

/**
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 * @param stønadsperioder
 * @param utsettelser
 */
export function leggTilUtsettelser(
    stønadsperioder: Stønadsperiode[],
    utsettelser: Utsettelsesperiode[]
): Periode[] {
    if (utsettelser.length === 0) {
        return stønadsperioder;
    }
    let perioder: Periode[] = [...stønadsperioder];
    utsettelser.sort(sorterPerioder).forEach((utsettelse) => {
        perioder = leggTilUtsettelse(perioder, utsettelse);
    });
    return perioder;
}

/**
 * Sjekker om to perioder er kan slåes sammen til en periode
 * @param p1 periode 1
 * @param p2 periode 2
 */
const kanPerioderSlåesSammen = (p1: Periode, p2: Periode) => {
    if (
        p1.type !== Periodetype.Stønadsperiode ||
        p2.type !== Periodetype.Stønadsperiode
    ) {
        return false;
    }
    const getPeriodeFootprint = (periode: Stønadsperiode) =>
        `${periode.type}${periode.forelder}${periode.konto}${
            periode.låstPeriode
        }${periode.låstForelder}`;
    const k1 = getPeriodeFootprint(p1);
    const k2 = getPeriodeFootprint(p2);
    const p1NesteUttaksdato = getForsteUttaksdagEtterDato(
        p1.tidsperiode.sluttdato
    );
    const p2Startdato = p2.tidsperiode.startdato;
    const sammenhengendePerioder = isSameDay(p1NesteUttaksdato, p2Startdato);
    return k1 === k2 && sammenhengendePerioder;
};

/**
 * Går gjennom periodene og finner perioder som er sammenhengende og
 * har samme nøkkeldata, og slår disse sammen til en periode dersom
 * dette er tilfelle
 * @param perioder Alle perioder som sjekkes
 */
export function slåSammenLikePerioder(perioder: Periode[]): Periode[] {
    if (perioder.length <= 1) {
        return perioder;
    }
    const nyePerioder: Periode[] = [];
    let forrigePeriode: Periode | undefined = { ...perioder[0] };
    perioder.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }
        if (kanPerioderSlåesSammen(forrigePeriode, periode)) {
            forrigePeriode.tidsperiode.sluttdato =
                periode.tidsperiode.sluttdato;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
            forrigePeriode = undefined;
        }
        forrigePeriode = periode;
    });
    nyePerioder.push(forrigePeriode);

    return nyePerioder;
}

/**
 * Finner perioder som berører tidsperiode
 * @param perioder Alle perioder
 * @param tidsperiode
 */
export function finnPerioderITidsrom(
    perioder: Periode[],
    tidsperiode: Tidsperiode
): Periode[] {
    return perioder.filter((periode) => {
        return (
            isWithinRange(
                periode.tidsperiode.startdato,
                tidsperiode.startdato,
                tidsperiode.sluttdato
            ) ||
            isWithinRange(
                periode.tidsperiode.sluttdato,
                tidsperiode.startdato,
                tidsperiode.sluttdato
            )
        );
    });
}

export function finnPerioderFørDato(
    perioder: Periode[],
    dato: Date
): Periode[] {
    return perioder.filter((periode) =>
        isBefore(periode.tidsperiode.sluttdato, dato)
    );
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
    const berørtePerioder = finnPerioderITidsrom(
        perioder,
        utsettelse.tidsperiode
    );
    const periode = finnPeriodeMedDato(
        perioder,
        utsettelse.tidsperiode.startdato
    );
    if (berørtePerioder.length === 0 && !periode) {
        return [...perioder, utsettelse];
    }

    if (!periode) {
        const foregåendePeriode = finnPerioderFørDato(
            perioder,
            utsettelse.tidsperiode.startdato
        ).pop();
        if (!foregåendePeriode) {
            throw new Error(
                'Ugyldig plassering av utsettelse. Ingen perioder funnet før utsettelse.'
            );
        }
        return leggTilUtsettelseEtterPeriode(
            perioder,
            foregåendePeriode,
            utsettelse
        );
    }
    if (periode.type === Periodetype.Utsettelse) {
        throw new Error('Ny utsettelse overlapper eksisterende utsettelse');
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
    const uttaksdagerIUtsettelse = getAntallUttaksdagerITidsperiode(
        utsettelse.tidsperiode
    );
    return [
        ...perioderFor,
        ...[utsettelse],
        ...forskyvPerioder([periode, ...perioderEtter], uttaksdagerIUtsettelse)
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
    const uttaksdager = getAntallUttaksdagerITidsperiode(
        utsettelse.tidsperiode
    );
    return [
        ...perioderFor,
        ...periodeSplittetMedUtsettelse,
        ...forskyvPerioder(perioderEtter, uttaksdager)
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
            sluttdato: getPeriodeSluttdato(startSisteDel, dagerSisteDel)
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
    dager: number
): Tidsperiode {
    const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
    const startdato = leggUttaksdagerTilDato(tidsperiode.startdato, dager);
    return {
        startdato,
        sluttdato: getPeriodeSluttdato(startdato, uttaksdager)
    };
}

/**
 * Forskyver alle perioder ut fra ny startdato
 * @param perioder
 * @param startdato
 */
const forskyvPerioder = (
    perioder: Periode[],
    uttaksdager: number
): Periode[] => {
    return perioder.map((periode) => {
        if (periode.type === Periodetype.Utsettelse) {
            return periode;
        }
        const tidsperiode = flyttTidsperiode(periode.tidsperiode, uttaksdager);
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

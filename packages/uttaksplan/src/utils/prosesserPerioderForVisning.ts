import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { sorterUttakPerioder } from './periodeUtils';

dayjs.extend(isSameOrBefore);

/**
 * Prosesserer søkers og annen parts perioder slik at de kan visast korrekt saman.
 *
 * - Splittar periodar ved kvarandre sine grenser
 * - Fjernar utsettelsesoverlapp
 * - Justerer samtidig uttak (sett 100 % dersom berre ein av partane har det)
 * - Fjernar overlapp utan samtidig uttak frå annen part
 * - Slår saman tilstøytande like segment att
 *
 * TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar i backend
 */
export const prosesserPerioderForVisning = (
    søkersPerioder: UttakPeriode_fpoversikt[],
    annenPartsPerioder: UttakPeriode_fpoversikt[],
    perioderAnnenpartEøs?: UttakPeriodeAnnenpartEøs_fpoversikt[],
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const splitSøker = splitPerioder(søkersPerioder, annenPartsPerioder);
    const splitAnnenPart = splitPerioder(annenPartsPerioder, søkersPerioder);

    const trimmedSøker = fjernUtsettelseOverlapp(splitSøker, splitAnnenPart);
    const trimmedAnnenPart = fjernUtsettelseOverlapp(splitAnnenPart, splitSøker);

    const justeringSøkerPerioder = midlertidigJusteringAvSamtidigUttak(trimmedSøker, trimmedAnnenPart);

    const mergedSøker = slåSammenTilstøtande(fjernFrieUtsettelser(justeringSøkerPerioder));
    const processedAnnenPart = slåSammenTilstøtande(
        fjernOverlappUtenSamtidigUttak(midlertidigJusteringAvSamtidigUttak(trimmedAnnenPart, trimmedSøker), trimmedSøker),
    );

    return [...mergedSøker, ...(perioderAnnenpartEøs ?? []), ...processedAnnenPart].sort(sorterUttakPerioder);
};

// Deler opp periodar ved grensene til motparten slik at kvart segment
// anten heilt overlappar eller ikkje overlappar med motparten sine periodar.
const splitPerioder = (
    perioderToSplit: UttakPeriode_fpoversikt[],
    splittBasertPå: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    const splitDatoar = [...new Set(splittBasertPå.flatMap((p) => [p.fom, Uttaksdagen.neste(p.tom).getDato()]))].sort(
        (a, b) => a.localeCompare(b),
    );

    return perioderToSplit.flatMap((periode) => {
        const relevante = splitDatoar.filter(
            (dato) => dayjs(dato).isAfter(periode.fom, 'day') && dayjs(dato).isSameOrBefore(periode.tom, 'day'),
        );

        if (relevante.length === 0) {
            return [periode];
        }

        const resultat: UttakPeriode_fpoversikt[] = [];
        let gjeldandeFom = periode.fom;

        for (const dato of relevante) {
            resultat.push({ ...periode, fom: gjeldandeFom, tom: Uttaksdagen.forrige(dato).getDato() });
            gjeldandeFom = dato;
        }

        resultat.push({ ...periode, fom: gjeldandeFom });
        return resultat;
    });
};

// Slår saman tilstøytande periodar med identiske eigenskapar.
const slåSammenTilstøtande = (perioder: UttakPeriode_fpoversikt[]): UttakPeriode_fpoversikt[] => {
    return perioder.reduce<UttakPeriode_fpoversikt[]>((acc, periode) => {
        if (acc.length === 0) {
            return [periode];
        }
        const forrige = acc.at(-1)!;
        const erTilstøtande = Uttaksdagen.neste(forrige.tom).getDato() === periode.fom;
        if (erTilstøtande && erLikeUtenDatoar(forrige, periode)) {
            return [...acc.slice(0, -1), { ...forrige, tom: periode.tom }];
        }
        return [...acc, periode];
    }, []);
};

const erLikeUtenDatoar = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt): boolean =>
    a.forelder === b.forelder &&
    a.kontoType === b.kontoType &&
    a.flerbarnsdager === b.flerbarnsdager &&
    a.gradering?.arbeidstidprosent === b.gradering?.arbeidstidprosent &&
    a.gradering?.aktivitet === b.gradering?.aktivitet &&
    a.morsAktivitet === b.morsAktivitet &&
    a.oppholdÅrsak === b.oppholdÅrsak &&
    a.utsettelseÅrsak === b.utsettelseÅrsak &&
    a.overføringÅrsak === b.overføringÅrsak &&
    a.resultat?.innvilget === b.resultat?.innvilget &&
    a.resultat?.trekkerDager === b.resultat?.trekkerDager &&
    a.resultat?.trekkerMinsterett === b.resultat?.trekkerMinsterett &&
    a.resultat?.årsak === b.resultat?.årsak &&
    a.samtidigUttak === b.samtidigUttak;

const fjernFrieUtsettelser = (perioder: UttakPeriode_fpoversikt[]): UttakPeriode_fpoversikt[] => {
    return perioder.filter(
        (periode) =>
            (periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet !== undefined) ||
            periode.utsettelseÅrsak !== 'FRI',
    );
};

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Om annen part har søkt først og har lagt til ein periode som overlappar med søkar sin samtidig uttaksperiode,
// så må en endra annen part sin periode til samtidig uttak for å få rett visning i kalender.
const midlertidigJusteringAvSamtidigUttak = (
    perioderSøker1: UttakPeriode_fpoversikt[],
    perioderSøker2: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioderSøker1.map((p) => {
        const overlappande = perioderSøker2.find((s) => harOverlapp(p, s));
        if (!overlappande) {
            return p;
        }
        return overlappande.samtidigUttak !== undefined && p.samtidigUttak === undefined
            ? { ...p, samtidigUttak: 100 }
            : p;
    });
};

const harOverlapp = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt) =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Periodar med utsettelseÅrsak skal ikkje overlappe med den andre søkaren sine periodar.
const fjernUtsettelseOverlapp = (
    perioder: UttakPeriode_fpoversikt[],
    motpartPerioder: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioder.filter(
        (periode) => periode.utsettelseÅrsak === undefined || !motpartPerioder.some((m) => harOverlapp(periode, m)),
    );
};

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Om søkar har ein periode som overlappar med annen part sin periode, og ingen av dei har samtidigattak,
// er dette eit duplikat. Den overlappande delen av annen part sin periode skal fjernast.
const fjernOverlappUtenSamtidigUttak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[],
    perioderSøker: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioderAnnenPart.filter(
        (periodeAnnenPart) =>
            periodeAnnenPart.samtidigUttak !== undefined ||
            !perioderSøker.some(
                (søker) =>
                    søker.samtidigUttak === undefined &&
                    søker.utsettelseÅrsak === undefined &&
                    harOverlapp(periodeAnnenPart, søker),
            ),
    );
};

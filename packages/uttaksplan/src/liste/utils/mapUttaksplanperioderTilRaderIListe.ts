import dayjs from 'dayjs';

import { Uttaksplanperiode, erPeriodeDto, erUttaksplanHull } from '../../types/UttaksplanPeriode';
import { erAvslåttPeriode, erPrematuruker, erUtsettelsesperiode } from '../../utils/periodeUtils';

// Ein periode der både søker og annenPart har uttak (samtidig uttak) representerer allereie
// éi sammanslått rad i den nye modellen – han skal difor stå åleine, akkurat som
// hull/prematuruker/utsettelse, og ikkje forsøkast slått saman med naboradene.
const erSamtidigUttak = (periode: Uttaksplanperiode): boolean =>
    erPeriodeDto(periode) && !!periode.søker && !!periode.annenPart;

export const mapUttaksplanperioderTilRaderIListe = (
    saksperioderInkludertHull: Uttaksplanperiode[],
    familiehendelsesdato: string,
): Uttaksplanperiode[][] => {
    const rader: Uttaksplanperiode[][] = [];
    let aktivRad: Uttaksplanperiode[] | undefined;

    const avsluttAktivRad = () => {
        if (!aktivRad) {
            return;
        }

        rader.push(aktivRad);
        aktivRad = undefined;
    };

    let index = 0;

    while (index < saksperioderInkludertHull.length) {
        const periode = saksperioderInkludertHull[index]!;

        // Hull / Prematuruker / Utsettelse / samtidig uttak -> alltid egen rad
        if (
            erUttaksplanHull(periode) ||
            erPrematuruker(periode) ||
            erUtsettelsesperiode(periode) ||
            erSamtidigUttak(periode)
        ) {
            avsluttAktivRad();
            rader.push([periode]);
            index += 1;
            continue;
        }

        // Start ny rad
        if (!aktivRad) {
            aktivRad = [periode];
            index += 1;
            continue;
        }

        // Skal ligge på samme rad som forrige
        const forrige = aktivRad.at(-1)!;
        if (kanGrupperesPåSammeRad(forrige, periode, familiehendelsesdato)) {
            aktivRad.push(periode);
            index += 1;
            continue;
        }

        // Avslutt aktiv rad og start ny
        avsluttAktivRad();
        aktivRad = [periode];
        index += 1;
    }

    avsluttAktivRad();

    return rader;
};

/**
 * Representant-forelder for grupperingsformål – den sida som finst på perioden. Sidan
 * samtidig uttak-radar allereie er filtrert bort før dette kallast (sjå erSamtidigUttak over),
 * er det aldri tvitydig kva side som gjeld her.
 */
const finnRepresentantForelder = (periode: Uttaksplanperiode) => {
    if (!erPeriodeDto(periode)) {
        return undefined;
    }
    return (periode.søker ?? periode.annenPart)?.forelder;
};

const harSammeForelder = (a: Uttaksplanperiode, b: Uttaksplanperiode): boolean =>
    finnRepresentantForelder(a) === finnRepresentantForelder(b);

const kanGrupperesPåSammeRad = (
    forrige: Uttaksplanperiode,
    nestePeriode: Uttaksplanperiode,
    familiehendelsesdato: string,
): boolean =>
    !erUttaksplanHull(forrige) &&
    !erUttaksplanHull(nestePeriode) &&
    harSammeForelder(forrige, nestePeriode) &&
    harSammeAvslåttStatus(forrige, nestePeriode) &&
    beggePerioderFørEllerEtterFamiliehendelsedato(forrige, nestePeriode, familiehendelsesdato);

const harSammeAvslåttStatus = (a: Uttaksplanperiode, b: Uttaksplanperiode): boolean =>
    erAvslåttPeriode(a) === erAvslåttPeriode(b);

const beggePerioderFørEllerEtterFamiliehendelsedato = (
    uttaksplanperiode: Uttaksplanperiode | undefined,
    periode: Uttaksplanperiode | undefined,
    famdato: string,
) => {
    return (
        beggePerioderEtterFamiliehendelsedato(uttaksplanperiode, periode, famdato) ||
        beggePerioderFørFamiliehendelsedato(uttaksplanperiode, periode, famdato)
    );
};

const beggePerioderFørFamiliehendelsedato = (
    uttaksplanperiode: Uttaksplanperiode | undefined,
    periode: Uttaksplanperiode | undefined,
    famdato: string,
) => {
    if (!periode || !uttaksplanperiode) {
        return false;
    }

    if (dayjs(uttaksplanperiode.tom).isBefore(famdato) && dayjs(periode.tom).isBefore(famdato)) {
        return true;
    }

    return false;
};

const beggePerioderEtterFamiliehendelsedato = (
    uttaksplanperiode: Uttaksplanperiode | undefined,
    periode: Uttaksplanperiode | undefined,
    famdato: string,
) => {
    if (!periode || !uttaksplanperiode) {
        return false;
    }

    if (dayjs(uttaksplanperiode.fom).isSameOrAfter(famdato) && dayjs(periode.fom).isSameOrAfter(famdato)) {
        return true;
    }

    return false;
};

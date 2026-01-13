import dayjs from 'dayjs';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { Uttaksplanperiode, erUttaksplanHull, erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import { isPrematuruker } from './periodeUtils';

export const mapUttaksplanperioderTilRaderIListe = (
    saksperioderInkludertHull: Uttaksplanperiode[],
    familiehendelsesdato: string,
): Uttaksplanperiode[][] => {
    const radIListeMap = new Map<string, Uttaksplanperiode[]>();
    let aktivRad: Uttaksplanperiode[] | undefined;

    const avsluttAktivRad = () => {
        if (!aktivRad) {
            return;
        }

        const fom = aktivRad[0]!.fom;
        const tom = aktivRad.at(-1)!.tom;
        radIListeMap.set(periodeKey(fom, tom), aktivRad);
        aktivRad = undefined;
    };

    let index = 0;

    while (index < saksperioderInkludertHull.length) {
        const periode = saksperioderInkludertHull[index]!;

        // Hull / Prematuruker / Utsettelse -> alltid egen rad
        if (erUttaksplanHull(periode) || isPrematuruker(periode) || erUtsettelse(periode)) {
            avsluttAktivRad();
            radIListeMap.set(periodeKey(periode.fom, periode.tom), [periode]);
            index += 1;
            continue;
        }

        const nestePeriode = saksperioderInkludertHull[index + 1];

        // Samtidig uttak -> En rad for to perioder
        if (nestePeriode && erSamtidigUttak(periode, nestePeriode)) {
            avsluttAktivRad();
            radIListeMap.set(periodeKey(periode.fom, periode.tom), [periode, nestePeriode]);
            index += 2; // Hopper over neste periode
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

    return Array.from(radIListeMap.values());
};

export const filtrerBortAnnenPartsIdentiskePerioder = (
    uttaksplanperiode: Uttaksplanperiode[],
    erFarEllerMedmor: boolean,
) =>
    uttaksplanperiode.reduce<Uttaksplanperiode[]>((alle, periode) => {
        const erSøkersPeriode = erPeriodeForSøker(periode, erFarEllerMedmor);
        const filtrerte = uttaksplanperiode.filter((p) => p.fom === periode.fom && p.tom === periode.tom);
        return filtrerte.length > 1 && !erSøkersPeriode ? alle : alle.concat(periode);
    }, []);

const erPeriodeForSøker = (periode: Uttaksplanperiode, erFarEllerMedmor: boolean) =>
    erVanligUttakPeriode(periode) &&
    ((periode.forelder === 'MOR' && !erFarEllerMedmor) || (periode.forelder === 'FAR_MEDMOR' && erFarEllerMedmor));

const periodeKey = (fom: string, tom: string) => `${fom}–${tom}`;

const erSamtidigUttak = (a: Uttaksplanperiode, b: Uttaksplanperiode): boolean =>
    !erUttaksplanHull(a) && !erUttaksplanHull(b) && a.fom === b.fom && a.tom === b.tom;

const harSammeForelder = (a: Uttaksplanperiode, b: Uttaksplanperiode): boolean =>
    'forelder' in a && 'forelder' in b && a.forelder === b.forelder;

const kanGrupperesPåSammeRad = (
    forrige: Uttaksplanperiode,
    nestePeriode: Uttaksplanperiode,
    familiehendelsesdato: string,
): boolean =>
    !erUttaksplanHull(forrige) &&
    !erUttaksplanHull(nestePeriode) &&
    harSammeForelder(forrige, nestePeriode) &&
    beggePerioderFørEllerEtterFamiliehendelsedato(forrige, nestePeriode, familiehendelsesdato);

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
const erUtsettelse = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erVanligUttakPeriode(periode) && !!periode.utsettelseÅrsak;
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

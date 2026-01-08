import dayjs from 'dayjs';

import { TidsperiodenString } from '@navikt/fp-utils';

import { UttaksplanHull, Uttaksplanperiode, erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import { isPrematuruker } from './periodeUtils';

const periodeKey = (fom: string, tom: string) => `${fom}–${tom}`;

const beggePerioderFørFamiliehendelsedato = (
    permisjonsperiode: Uttaksplanperiode | undefined,
    periode: Uttaksplanperiode | undefined,
    famdato: string,
) => {
    if (!periode || !permisjonsperiode) {
        return false;
    }

    if (dayjs(permisjonsperiode.tom).isBefore(famdato) && dayjs(periode.tom).isBefore(famdato)) {
        return true;
    }

    return false;
};

const beggePerioderEtterFamiliehendelsedato = (
    permisjonsperiode: Uttaksplanperiode | undefined,
    periode: Uttaksplanperiode | undefined,
    famdato: string,
) => {
    if (!periode || !permisjonsperiode) {
        return false;
    }

    if (dayjs(permisjonsperiode.fom).isSameOrAfter(famdato) && dayjs(periode.fom).isSameOrAfter(famdato)) {
        return true;
    }

    return false;
};

const beggePerioderFørEllerEtterFamiliehendelsedato = (
    permisjonsperiode: Uttaksplanperiode | undefined,
    periode: Uttaksplanperiode | undefined,
    famdato: string,
) => {
    return (
        beggePerioderEtterFamiliehendelsedato(permisjonsperiode, periode, famdato) ||
        beggePerioderFørFamiliehendelsedato(permisjonsperiode, periode, famdato)
    );
};

export const mapUttaksplanperioderTilPeriodemap = (
    perioder: Uttaksplanperiode[],
    familiehendelsesdato: string,
): Map<string, Uttaksplanperiode[]> => {
    const grupper = new Map<string, Uttaksplanperiode[]>();

    let aktivGruppe: Uttaksplanperiode[] | undefined;
    let aktivFom: string | undefined;

    const avsluttAktivGruppe = () => {
        if (!aktivGruppe || !aktivFom) {
            return;
        }

        const tom = aktivGruppe.at(-1)!.tom;
        grupper.set(periodeKey(aktivFom, tom), aktivGruppe);

        aktivGruppe = undefined;
        aktivFom = undefined;
    };

    for (let i = 0; i < perioder.length; i++) {
        const periode = perioder[i]!;
        const neste = perioder[i + 1];

        /**
         * Hull → alltid egen gruppe
         */
        if (erHull(periode)) {
            avsluttAktivGruppe();
            grupper.set(periodeKey(periode.fom, periode.tom), [periode]);
            continue;
        }

        /**
         * Prematuruker → alltid egen gruppe
         */
        if (erVanligUttakPeriode(periode) && isPrematuruker(periode)) {
            avsluttAktivGruppe();
            grupper.set(periodeKey(periode.fom, periode.tom), [periode]);
            continue;
        }

        /**
         * Utsettelse - Alltid egen rad
         */
        if (erVanligUttakPeriode(periode) && !!periode.utsettelseÅrsak) {
            avsluttAktivGruppe();
            grupper.set(periodeKey(periode.fom, periode.tom), [periode]);
            continue;
        }

        /**
         * Samtidig uttak → to og to perioder
         */
        if (neste && erSamtidig(periode, neste)) {
            avsluttAktivGruppe();
            grupper.set(periodeKey(periode.fom, periode.tom), [periode, neste]);
            i++; // konsumer neste periode eksplisitt
            continue;
        }

        /**
         * Start ny gruppe
         */
        if (!aktivGruppe) {
            aktivGruppe = [periode];
            aktivFom = periode.fom;
            continue;
        }

        /**
         * Utvid aktiv gruppe
         */
        const forrige = aktivGruppe.at(-1)!;

        if (kanGrupperes(forrige, periode, familiehendelsesdato)) {
            aktivGruppe.push(periode);
            continue;
        }

        /**
         * Avslutt eksisterende gruppe og start ny
         */
        avsluttAktivGruppe();
        aktivGruppe = [periode];
        aktivFom = periode.fom;
    }

    avsluttAktivGruppe();

    return grupper;
};

const erHull = (p: Uttaksplanperiode): p is UttaksplanHull => 'hullType' in p;

const erSamtidig = (a: Uttaksplanperiode, b: Uttaksplanperiode): boolean =>
    !erHull(a) &&
    !erHull(b) &&
    TidsperiodenString({ fom: a.fom, tom: a.tom }).erLik({
        fom: b.fom,
        tom: b.tom,
    });

const harSammeForelder = (a: Uttaksplanperiode, b: Uttaksplanperiode): boolean =>
    'forelder' in a && 'forelder' in b && a.forelder === b.forelder;

const kanGrupperes = (forrige: Uttaksplanperiode, neste: Uttaksplanperiode, familiehendelsesdato: string): boolean =>
    !erHull(forrige) &&
    !erHull(neste) &&
    harSammeForelder(forrige, neste) &&
    beggePerioderFørEllerEtterFamiliehendelsedato(forrige, neste, familiehendelsesdato);

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

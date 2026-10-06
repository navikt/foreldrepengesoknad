import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    UttakDto_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriodeDto_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { Uttaksdagen } from './Uttaksdagen';

const KONTOTYPE_FOR_OPPHOLDSÅRSAK = {
    MØDREKVOTE_ANNEN_FORELDER: 'MØDREKVOTE',
    FEDREKVOTE_ANNEN_FORELDER: 'FEDREKVOTE',
    FELLESPERIODE_ANNEN_FORELDER: 'FELLESPERIODE',
    FORELDREPENGER_ANNEN_FORELDER: 'FORELDREPENGER',
} as const satisfies Record<UttakOppholdÅrsak_fpoversikt, UttakDto_fpoversikt['kontoType']>;

const erFlatPeriode = (periode: unknown): periode is UttakPeriode_fpoversikt =>
    typeof periode === 'object' && periode !== null && 'forelder' in periode;

const tilPart = (periode: UttakPeriode_fpoversikt): UttakDto_fpoversikt => {
    if (periode.oppholdÅrsak) {
        return {
            forelder: periode.forelder === 'MOR' ? 'FAR_MEDMOR' : 'MOR',
            kontoType: KONTOTYPE_FOR_OPPHOLDSÅRSAK[periode.oppholdÅrsak],
            flerbarnsdager: periode.flerbarnsdager,
        };
    }

    const utsettelseÅrsak = periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE' ? 'FERIE' : periode.utsettelseÅrsak;

    return {
        forelder: periode.forelder,
        flerbarnsdager: periode.flerbarnsdager,
        ...(periode.kontoType && { kontoType: periode.kontoType }),
        ...(periode.morsAktivitet && { morsAktivitet: periode.morsAktivitet }),
        ...(periode.gradering && { gradering: periode.gradering }),
        ...(periode.samtidigUttak !== undefined && { samtidigUttak: periode.samtidigUttak }),
        ...(periode.overføringÅrsak && { overføringÅrsak: periode.overføringÅrsak }),
        ...(utsettelseÅrsak && { utsettelseÅrsak }),
    };
};

const dagenEtter = (dato: string) => dayjs(dato).add(1, 'day').format(ISO_DATE_FORMAT);
const dagenFør = (dato: string) => dayjs(dato).subtract(1, 'day').format(ISO_DATE_FORMAT);

/**
 * Lenker frå planleggaren laga før overgangen til intervallmodellen inneheld flate periodar (éin per
 * forelder, der samtidig uttak er to overlappande periodar). Desse blir gjort om til
 * ikkje-overlappande intervall. Er det to foreldre i same intervall, hamnar mor på `søker`.
 */
export const konverterFlatePerioderTilIntervall = (perioder: unknown[]): UttakPeriodeDto_fpoversikt[] => {
    const flatePerioder = perioder.filter(erFlatPeriode);
    if (flatePerioder.length === 0) {
        return perioder as UttakPeriodeDto_fpoversikt[];
    }

    const andrePerioder = perioder.filter((periode) => !erFlatPeriode(periode)) as UttakPeriodeDto_fpoversikt[];

    const grenser = [...new Set(flatePerioder.flatMap((periode) => [periode.fom, dagenEtter(periode.tom)]))].sort(
        (a, b) => a.localeCompare(b),
    );

    const intervall = grenser.slice(0, -1).flatMap((grense, index): UttakPeriodeDto_fpoversikt[] => {
        const fom = Uttaksdagen.denneEllerNeste(grense).getDato();
        const tom = Uttaksdagen.denneEllerForrige(dagenFør(grenser[index + 1]!)).getDato();
        if (fom > tom) {
            return [];
        }

        const parter = flatePerioder
            .filter((periode) => periode.fom <= fom && periode.tom >= tom)
            .map(tilPart)
            .sort((a, b) => Number(a.forelder !== 'MOR') - Number(b.forelder !== 'MOR'));
        const [søker, annenPart] = parter;
        if (!søker) {
            return [];
        }

        return [
            {
                fom,
                tom,
                søker,
                ...(annenPart && annenPart.forelder !== søker.forelder && { annenPart }),
            },
        ];
    });

    return [...andrePerioder, ...intervall].sort((a, b) => a.fom.localeCompare(b.fom));
};

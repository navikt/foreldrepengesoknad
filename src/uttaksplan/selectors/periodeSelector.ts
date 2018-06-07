import { createSelector } from 'reselect';
import {
    Utsettelsesperiode,
    Periode,
    Uttaksperiode,
    Periodetype
} from '../types';
import { leggUtsettelserTilUttaksperioder } from '../utils/periodeUtils';
import { UttaksplanAppState } from 'uttaksplan/redux/types';

const utsettelseSelector = (state: UttaksplanAppState) => {
    return state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.Utsettelse
    );
};

export const getUttaksperioder = (state: UttaksplanAppState) =>
    state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.Uttaksperiode
    );

export const getTaptePerioder = (state: UttaksplanAppState) =>
    state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.TaptPeriode
    );

/**
 * Henter ut perioder og utsettelser fra state
 */
export const getUttaksperioderOgUtsettelser = createSelector(
    getUttaksperioder,
    utsettelseSelector,
    (
        uttaksperioder: Uttaksperiode[],
        utsettelser: Utsettelsesperiode[]
    ): Periode[] => {
        if (uttaksperioder.length > 0) {
            return leggUtsettelserTilUttaksperioder(
                uttaksperioder,
                utsettelser
            );
        }
        return [];
    }
);

export const getSisteRegistrertePermisjonsdag = createSelector(
    getUttaksperioderOgUtsettelser,
    (periode: Periode[]): Date | undefined => {
        return periode.length > 0
            ? periode[periode.length - 1].tidsperiode.sluttdato
            : undefined;
    }
);

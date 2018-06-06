import { createSelector } from 'reselect';
import {
    Utsettelsesperiode,
    Periode,
    Stønadsperiode,
    Periodetype
} from '../types';
import { leggUtsettelserTilStønadsperioder } from '../utils/periodeUtils';
import { UttaksplanAppState } from 'uttaksplan/redux/types';

const utsettelseSelector = (state: UttaksplanAppState) => {
    return state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.Utsettelse
    );
};

export const getStonadsperioder = (state: UttaksplanAppState) =>
    state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.Stonadsperiode
    );

export const getTaptePerioder = (state: UttaksplanAppState) =>
    state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.TaptPeriode
    );

/**
 * Henter ut perioder og utsettelser fra state
 */
export const getStonadsperioderOgUtsettelser = createSelector(
    getStonadsperioder,
    utsettelseSelector,
    (
        stonadsperioder: Stønadsperiode[],
        utsettelser: Utsettelsesperiode[]
    ): Periode[] => {
        if (stonadsperioder.length > 0) {
            return leggUtsettelserTilStønadsperioder(
                stonadsperioder,
                utsettelser
            );
        }
        return [];
    }
);

export const getSisteRegistrertePermisjonsdag = createSelector(
    getStonadsperioderOgUtsettelser,
    (periode: Periode[]): Date | undefined => {
        return periode.length > 0
            ? periode[periode.length - 1].tidsperiode.sluttdato
            : undefined;
    }
);

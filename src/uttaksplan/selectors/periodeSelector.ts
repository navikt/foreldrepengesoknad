import { createSelector } from 'reselect';
import { UttaksplanAppState } from '../redux/types';
import {
    Utsettelsesperiode,
    Periode,
    Stonadsperiode,
    Periodetype
} from '../types';
import { leggUtsettelserTilPerioder } from '../utils/periodeUtils';

const utsettelseSelector = (state: UttaksplanAppState) => {
    return state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.Utsettelse
    );
};

export const getStonadsperioder = (state: UttaksplanAppState) =>
    state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.Stonadsperiode
    );

/**
 * Henter ut perioder og utsettelser fra state
 */
export const getStonadsperioderOgUtsettelser = createSelector(
    getStonadsperioder,
    utsettelseSelector,
    (
        stonadsperioder: Stonadsperiode[],
        utsettelser: Utsettelsesperiode[]
    ): Periode[] => {
        return leggUtsettelserTilPerioder(stonadsperioder, utsettelser);
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

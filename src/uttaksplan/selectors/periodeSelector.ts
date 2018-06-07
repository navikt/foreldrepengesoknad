import { createSelector } from 'reselect';
import { Periode, Periodetype } from '../types';
import { UttaksplanAppState } from 'uttaksplan/redux/types';

export const getAllePerioder = (state: UttaksplanAppState) =>
    state.uttaksplan.periode.perioder;

export const getUttaksperioderOgUtsettelser = (state: UttaksplanAppState) =>
    state.uttaksplan.periode.perioder.filter(
        (p) =>
            p.type === Periodetype.Uttaksperiode ||
            p.type === Periodetype.Utsettelse
    );

export const getSisteRegistrertePermisjonsdag = createSelector(
    getUttaksperioderOgUtsettelser,
    (periode: Periode[]): Date | undefined => {
        return periode.length > 0
            ? periode[periode.length - 1].tidsperiode.sluttdato
            : undefined;
    }
);

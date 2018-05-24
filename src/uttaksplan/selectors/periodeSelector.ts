import { createSelector } from 'reselect';
import { UttaksplanFormState, UttaksplanAppState } from '../redux/types';
import {
    Utsettelsesperiode,
    Periode,
    Stonadsperiode,
    Periodetype
} from '../types';
import { leggUtsettelserTilPerioder } from '../utils/periodeUtils';
import { opprettStønadsperioder } from '../utils/permisjonUtils';

const formSelector = (state: UttaksplanAppState) => state.uttaksplan.form;
const utsettelseSelector = (state: UttaksplanAppState) => {
    return state.uttaksplan.periode.perioder.filter(
        (p) => p.type === Periodetype.Utsettelse
    );
};

/**
 * Henter ut sortert liste med alle stønadsperioder fra state
 */
export const getStonadsperioder = createSelector(
    formSelector,
    (uttaksplanForm: UttaksplanFormState): Stonadsperiode[] => {
        if (!uttaksplanForm.termindato || !uttaksplanForm.dekningsgrad) {
            return [];
        }
        return opprettStønadsperioder(
            uttaksplanForm.termindato,
            uttaksplanForm.dekningsgrad,
            uttaksplanForm.fellesperiodeukerForelder1 || 0,
            uttaksplanForm.fellesperiodeukerForelder2 || 0,
            uttaksplanForm.permisjonsregler
        );
    }
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

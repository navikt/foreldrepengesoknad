import {
    UttaksplanValideringActionTypes,
    UttaksplanValideringActionKeys
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';

export enum PeriodeValideringErrorKey {
    'PÅKREVD_VERDI_MANGLER' = 'påkrevd',
    'SKJEMA_IKKE_KOMPLETT' = 'skjemaIkkeKomplett',
    'UGYLDIG_TIDSPERIODE' = 'ugyldigTidsperiode',
    'DATO_IKKE_UTTAKSDAG' = 'datoErIkkeUttaksdag'
}

export interface Periodevalidering {
    [periodeId: string]: ValidertPeriode;
}

export interface UttaksplanValideringState {
    periodevalidering: Periodevalidering;
    inneholderPerioder: boolean;
    stønadskontoerMedForMyeUttak: Stønadskontouttak[];
    erGyldig: boolean;
}

export interface PeriodeValideringsfeil {
    feilKey: PeriodeValideringErrorKey;
}

export interface ValidertPeriode {
    periodeId: string;
    valideringsfeil: PeriodeValideringsfeil[];
    overlappendePerioder: Periode[];
}

const getDefaultState = (): UttaksplanValideringState => {
    return {
        periodevalidering: {},
        inneholderPerioder: false,
        stønadskontoerMedForMyeUttak: [],
        erGyldig: true
    };
};

const periodeneErGyldige = (periodevalidering: Periodevalidering) =>
    Object.keys(periodevalidering).find(
        (key) =>
            periodevalidering[key].overlappendePerioder.length > 0 || periodevalidering[key].valideringsfeil.length > 0
    ) === undefined;

const uttaksplanValideringReducer = (
    state = getDefaultState(),
    action: UttaksplanValideringActionTypes
): UttaksplanValideringState => {
    switch (action.type) {
        case UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING:
            return {
                ...state,
                periodevalidering: action.validertePerioder,
                inneholderPerioder: action.inneholderPerioder,
                stønadskontoerMedForMyeUttak: action.stønadskontoerMedForMyeUttak,
                erGyldig:
                    periodeneErGyldige(action.validertePerioder) &&
                    action.inneholderPerioder &&
                    action.stønadskontoerMedForMyeUttak.length === 0
            };
    }
    return state;
};

export default uttaksplanValideringReducer;

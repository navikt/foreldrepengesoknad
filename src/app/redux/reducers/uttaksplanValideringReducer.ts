import {
    UttaksplanValideringActionTypes,
    UttaksplanValideringActionKeys,
    ValidertPeriode
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';

export enum PeriodeValideringErrorKey {
    'PÅKREVD_VERDI_MANGLER' = 'påkrevd',
    'SKJEMA_IKKE_KOMPLETT' = 'skjemaIkkeKomplett',
    'UGYLDIG_TIDSPERIODE' = 'ugyldigTidsperiode',
    'DATO_IKKE_UTTAKSDAG' = 'datoErIkkeUttagsdag'
}

export interface Periodevalidering {
    [periodeId: string]: ValidertPeriode;
}

export interface UttaksplanValideringState {
    periodevalidering: Periodevalidering;
    erGyldig: boolean;
}

export interface PeriodeValideringsfeil {
    feilKey: PeriodeValideringErrorKey;
}

const getDefaultState = (): UttaksplanValideringState => {
    return {
        periodevalidering: {},
        erGyldig: true
    };
};

const erUttaksplanGyldig = (periodevalidering: Periodevalidering) =>
    Object.keys(periodevalidering).find(
        (key) =>
            periodevalidering[key].overlappendePerioder.length > 0 || periodevalidering[key].valideringsfeil.length > 0
    ) === undefined;

const uttaksplanValideringReducer = (
    state = getDefaultState(),
    action: UttaksplanValideringActionTypes
): UttaksplanValideringState => {
    switch (action.type) {
        case UttaksplanValideringActionKeys.SET_VALIDERT_PERIODE:
            const periodevalidering = {
                ...state.periodevalidering,
                [action.periodeId]: action.validertPeriode
            };
            return {
                ...state,
                periodevalidering,
                erGyldig: erUttaksplanGyldig(periodevalidering)
            };
        case UttaksplanValideringActionKeys.SET_VALIDERTE_PERIODER:
            return {
                ...state,
                periodevalidering: action.validertePerioder,
                erGyldig: erUttaksplanGyldig(action.validertePerioder)
            };
    }
    return state;
};

export default uttaksplanValideringReducer;

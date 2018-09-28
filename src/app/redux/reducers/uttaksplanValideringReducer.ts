import {
    UttaksplanValideringActionTypes,
    UttaksplanValideringActionKeys
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';
import { validerUtsettelsePeriode } from '../../util/validation/periode/utsettelse';

export interface UttaksplanValideringState {
    perioder: PeriodeValidering;
}

export interface PeriodeValidering {
    [key: string]: PeriodeValideringInfo | undefined;
}

interface PeriodeValideringInfo {
    feil?: Feil[];
}

const getDefaultState = (): UttaksplanValideringState => {
    return {
        perioder: {}
    };
};

const updatePeriodeValidering = (
    perioder: PeriodeValidering,
    periodeId: string,
    feil: Feil[] | undefined
): PeriodeValidering => {
    return {
        ...perioder,
        [periodeId]: {
            feil
        }
    };
};

const uttaksplanValideringReducer = (
    state = getDefaultState(),
    action: UttaksplanValideringActionTypes
): UttaksplanValideringState => {
    switch (action.type) {
        case UttaksplanValideringActionKeys.VALIDER_UTSETTELSE:
            const { periode } = action.payload;
            if (periode.id) {
                return {
                    ...state,
                    perioder: updatePeriodeValidering(
                        state.perioder,
                        periode.id,
                        validerUtsettelsePeriode(action.payload)
                    )
                };
            }
    }
    return state;
};

export default uttaksplanValideringReducer;

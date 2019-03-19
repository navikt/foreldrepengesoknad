import {
    UttaksplanValideringActionKeys,
    UttaksplanValideringActionTypes
} from './uttaksplanValideringActionDefinitions';
import { Periodevalidering } from '../../reducers/uttaksplanValideringReducer';
import { UttaksplanRegelTestresultat } from '../../../regler/uttaksplanValidering/types';

export function setUttaksplanValidering(
    validertePerioder: Periodevalidering,
    inneholderPerioder: boolean,
    uttakErBareOpphold: boolean,
    uttaksplanStarterMedOpphold: boolean,
    uttaksplanSlutterMedOpphold: boolean,
    uttaksplanGraderingStørreEnnSamtidigUttak: boolean,
    begrunnelseForSenEndringErGyldig: boolean,
    regelTestresultat?: UttaksplanRegelTestresultat | undefined
): UttaksplanValideringActionTypes {
    return {
        type: UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING,
        validertePerioder,
        inneholderPerioder,
        uttakErBareOpphold,
        uttaksplanStarterMedOpphold,
        uttaksplanSlutterMedOpphold,
        uttaksplanGraderingStørreEnnSamtidigUttak,
        begrunnelseForSenEndringErGyldig,
        regelTestresultat
    };
}

export function validerUttaksplanAction() {
    return {
        type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN
    };
}

export default {
    setUttaksplanValidering,
    validerUttaksplanAction
};

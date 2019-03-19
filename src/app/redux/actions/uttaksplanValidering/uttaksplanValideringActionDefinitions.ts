import { ValidertPeriode } from '../../reducers/uttaksplanValideringReducer';
import { UttaksplanRegelTestresultat } from '../../../regler/uttaksplanValidering/types';

export enum UttaksplanValideringActionKeys {
    'SET_UTTAKSPLAN_VALIDERING' = 'setUttaksplanValidering',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan'
}

export interface ValiderUttaksplanAction {
    type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN;
}
export interface SetUttaksplanValidering {
    type: UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING;
    regelTestresultat: UttaksplanRegelTestresultat | undefined;
    validertePerioder: { [periodeId: string]: ValidertPeriode };
    inneholderPerioder: boolean;
    morHarSøktUgyldigUtsettelseFørsteSeksUker: boolean;
    uttakErBareOpphold: boolean;
    uttaksplanStarterMedOpphold: boolean;
    uttaksplanSlutterMedOpphold: boolean;
    uttaksplanGraderingStørreEnnSamtidigUttak: boolean;
    begrunnelseForSenEndringErGyldig: boolean;
}

export type UttaksplanValideringActionTypes = SetUttaksplanValidering | ValiderUttaksplanAction;

import { ValidertPeriode } from '../../reducers/uttaksplanValideringReducer';
import { Stønadskontouttak } from '../../../components/uttaksoppsummering/Uttaksoppsummering';

export enum UttaksplanValideringActionKeys {
    'SET_UTTAKSPLAN_VALIDERING' = 'setUttaksplanValidering',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan'
}

export interface ValiderUttaksplanAction {
    type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN;
}
export interface SetUttaksplanValidering {
    type: UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING;
    validertePerioder: { [periodeId: string]: ValidertPeriode };
    inneholderPerioder: boolean;
    stønadskontoerMedForMyeUttak: Stønadskontouttak[];
    morHarSøktUgyldigUtsettelseFørsteSeksUker: boolean;
    farHarSøktUgyldigUtsettelseFørsteSeksUker: boolean;
    uttaksmengdeForFarMedmorForHøy: boolean;
    uttakErBareOpphold: boolean;
    uttaksplanStarterMedOpphold: boolean;
    uttaksplanSlutterMedOpphold: boolean;
    uttaksplanGraderingStørreEnnSamtidigUttak: boolean;
    uttaksplanStarterMerEnnTreUkerFremITid: boolean;
}

export type UttaksplanValideringActionTypes = SetUttaksplanValidering | ValiderUttaksplanAction;

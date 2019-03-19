import { ValidertPeriode } from '../../reducers/uttaksplanValideringReducer';
import { UttaksplanRegelTestresultat } from '../../../regler/uttaksplanValidering/types';
import { Stønadskontouttak } from '../../../types/uttaksplan/periodetyper';

export enum UttaksplanValideringActionKeys {
    'SET_UTTAKSPLAN_VALIDERING' = 'setUttaksplanValidering',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan'
}

export interface ValiderUttaksplanAction {
    type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN;
}
export interface SetUttaksplanValidering {
    type: UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING;
    regelTestResultat: UttaksplanRegelTestresultat | undefined;
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
    begrunnelseForSenEndringErGyldig: boolean;
    uttaksplanHarForMangeFlerbarnsdager: boolean;
}

export type UttaksplanValideringActionTypes = SetUttaksplanValidering | ValiderUttaksplanAction;

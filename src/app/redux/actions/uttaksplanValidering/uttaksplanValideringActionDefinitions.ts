import {
    Utsettelsesvariant,
    UtsettelseperiodeFormPeriodeType
} from '../../../components/utsettelse-form/UtsettelseForm';
import { Periode } from '../../../types/uttaksplan/periodetyper';

export enum UttaksplanValideringActionKeys {
    'VALIDER_UTSETTELSE' = 'validerUtsettelse',
    'VALIDER_UTSETTELSER' = 'validerUtsettelser',
    'VALIDER_UTTAKSPLAN' = 'validerUttaksplan'
}

export interface ValiderPeriodePayload {
    perioder: Periode[];
}

export interface ValiderUtsettelsePayload extends ValiderPeriodePayload {
    variant?: Utsettelsesvariant;
    periode: UtsettelseperiodeFormPeriodeType;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
}

export interface ValiderUtsettelse {
    type: UttaksplanValideringActionKeys.VALIDER_UTSETTELSE;
    payload: ValiderUtsettelsePayload;
}

export interface ValiderUtsettelser {
    type: UttaksplanValideringActionKeys.VALIDER_UTSETTELSER;
    payload: ValiderUtsettelsePayload[];
}

export interface ValiderUttaksplan {
    type: UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN;
}

export type UttaksplanValideringActionTypes = ValiderUtsettelse | ValiderUtsettelser | ValiderUttaksplan;

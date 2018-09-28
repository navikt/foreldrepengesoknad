import {
    Utsettelsesvariant,
    UtsettelseperiodeFormPeriodeType
} from '../../../components/utsettelse-form/UtsettelseForm';

export enum UttaksplanValideringActionKeys {
    'VALIDER_UTSETTELSE' = 'validerUtsettelse'
}

export interface ValiderUtsettelsePayload {
    variant?: Utsettelsesvariant;
    periode: UtsettelseperiodeFormPeriodeType;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
}

interface ValiderUtsettelse {
    type: UttaksplanValideringActionKeys.VALIDER_UTSETTELSE;
    payload: ValiderUtsettelsePayload;
}

export type UttaksplanValideringActionTypes = ValiderUtsettelse;

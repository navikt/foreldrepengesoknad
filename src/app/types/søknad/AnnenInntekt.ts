import { TidsperiodeMedValgfriSluttdato, TidsperiodeStringMedValgfriSluttdato } from '../../../common/types';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';

export enum AnnenInntektType {
    'SLUTTPAKKE' = 'ETTERLØNN_SLUTTPAKKE',
    'SLUTTPAKKE_V1' = 'ETTERLØNN_ARBEIDSGIVER',
    'MILITÆRTJENESTE' = 'MILITÆR_ELLER_SIVILTJENESTE',
    'VENTELØNN' = 'VENTELØNN_VARTPENGER',
    'VENTELØNN_V1' = 'VENTELØNN',
    'JOBB_I_UTLANDET' = 'JOBB_I_UTLANDET',
}

interface AnnenInntektBase {
    tidsperiode: TidsperiodeStringMedValgfriSluttdato;
    pågående: boolean;
    vedlegg: Attachment[];
}

export interface SluttpakkeInntekt extends AnnenInntektBase {
    type: AnnenInntektType.SLUTTPAKKE | AnnenInntektType.SLUTTPAKKE_V1;
}

export interface MilitærtjenesteInntekt extends AnnenInntektBase {
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export interface JobbIUtlandetInntekt extends AnnenInntektBase {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: string;
}

export interface VentelønnInntekt extends AnnenInntektBase {
    type: AnnenInntektType.VENTELØNN | AnnenInntektType.VENTELØNN_V1;
}

export type AnnenInntekt = SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt | VentelønnInntekt;

export interface AnnenInntektBaseInnsending extends Omit<AnnenInntektBase, 'tidsperiode'> {
    tidsperiode: TidsperiodeMedValgfriSluttdato;
}

export interface SluttpakkeInntektInnsending extends AnnenInntektBaseInnsending {
    type: AnnenInntektType.SLUTTPAKKE | AnnenInntektType.SLUTTPAKKE_V1;
}

export interface MilitærtjenesteInntektInnsending extends AnnenInntektBaseInnsending {
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export interface JobbIUtlandetInntektInnsending extends AnnenInntektBaseInnsending {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: string;
}

export interface VentelønnInntektInnsending extends AnnenInntektBaseInnsending {
    type: AnnenInntektType.VENTELØNN | AnnenInntektType.VENTELØNN_V1;
}

export type AnnenInntektInnsending =
    | SluttpakkeInntektInnsending
    | MilitærtjenesteInntektInnsending
    | JobbIUtlandetInntektInnsending
    | VentelønnInntektInnsending;

export interface AnnenInntektPartialInterface {
    type: AnnenInntektType;
    tidsperiode: Partial<TidsperiodeStringMedValgfriSluttdato>;
    vedlegg: Attachment[];
}

export type AnnenInntektPartial = Partial<AnnenInntektPartialInterface>;
export type JobbIUtlandetInntektPartial = Partial<JobbIUtlandetInntekt>;

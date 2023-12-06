import { TidsperiodeMedValgfriSluttdato, TidsperiodeMedValgfriSluttdatoDate } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';

export enum AnnenInntektType {
    SLUTTPAKKE = 'ETTERLØNN_SLUTTPAKKE',
    MILITÆRTJENESTE = 'MILITÆR_ELLER_SIVILTJENESTE',
    JOBB_I_UTLANDET = 'JOBB_I_UTLANDET',
}

interface AnnenInntektBase {
    type: AnnenInntektType;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
    vedlegg: Attachment[];
}

export interface SluttpakkeInntekt extends AnnenInntektBase {
    type: AnnenInntektType.SLUTTPAKKE;
}

export interface MilitærtjenesteInntekt extends AnnenInntektBase {
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export interface JobbIUtlandetInntekt extends AnnenInntektBase {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: string;
}

export type AnnenInntekt = SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt;

export interface AnnenInntektBaseInnsending extends Omit<AnnenInntektBase, 'tidsperiode'> {
    tidsperiode: TidsperiodeMedValgfriSluttdatoDate;
}

export interface SluttpakkeInntektInnsending extends AnnenInntektBaseInnsending {
    type: AnnenInntektType.SLUTTPAKKE;
}

export interface MilitærtjenesteInntektInnsending extends AnnenInntektBaseInnsending {
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export interface JobbIUtlandetInntektInnsending extends AnnenInntektBaseInnsending {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: string;
}

export type AnnenInntektInnsending =
    | SluttpakkeInntektInnsending
    | MilitærtjenesteInntektInnsending
    | JobbIUtlandetInntektInnsending;

export enum ArbeidIUtlandetType {
    JOBB_I_UTLANDET = 'JOBB_I_UTLANDET',
}

export interface ArbeidIUtlandetInput {
    type: ArbeidIUtlandetType.JOBB_I_UTLANDET;
    fom: string;
    tom: string | undefined;
    pågående: boolean;
    arbeidsgiverNavn: string;
    land: string;
}

export interface ArbeidIUtlandet {
    arbeidIUtlandet: ArbeidIUtlandetInput[];
}

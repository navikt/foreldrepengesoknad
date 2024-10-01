export interface ArbeidIUtlandetInput {
    type: string;
    fom: string;
    tom: string | undefined;
    pågående: boolean;
    arbeidsgiverNavn: string;
    land: string;
}

export interface ArbeidIUtlandet {
    arbeidIUtlandet: ArbeidIUtlandetInput[];
}

export interface ArbeidIUtlandetInput {
    fom: string;
    tom: string | undefined;
    pågående: boolean;
    arbeidsgiverNavn: string;
    land: string;
}

export interface ArbeidIUtlandet {
    arbeidIUtlandet: ArbeidIUtlandetInput[];
}

export interface ArbeidsIUtlandetDto extends ArbeidIUtlandetInput {
    type: string;
}

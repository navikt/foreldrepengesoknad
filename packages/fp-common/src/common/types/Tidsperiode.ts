export interface Tidsperiode {
    fom: string;
    tom: string;
}

export interface TidsperiodeMedValgfriSluttdato {
    fom: string;
    tom?: string;
    pågående?: boolean;
}

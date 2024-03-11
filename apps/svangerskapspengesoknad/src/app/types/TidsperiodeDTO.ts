export interface TidsperiodeDTOMedValgfriSluttdatoDate {
    fom: Date;
    tom?: Date;
    pågående?: boolean;
}

export interface TidsperiodeDTOMedValgfriSluttdato {
    fom: string;
    tom?: string;
    pågående?: boolean;
}

export interface TidsperiodeDTO {
    fom: Date;
    tom: Date;
}

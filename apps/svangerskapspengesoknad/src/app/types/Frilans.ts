export interface Frilans {
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
    sluttDato: string | undefined;
}

export interface FrilansDTO {
    jobberFremdelesSomFrilans: boolean;
    oppstart: Date;
    sluttDato: Date | undefined;
}

export const frilansId = 'frilans';

export type Frilans = {
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
};

export interface FrilansDTO {
    jobberFremdelesSomFrilans: boolean;
    oppstart: Date;
    // sluttDato: Date | undefined;
}

export interface SaksperiodeDTO {
    guid: string;
    angittAvAnnenPart?: boolean;
    arbeidsgiverInfo: {
        id: string;
        type: string;
        navn: string;
    };
    arbeidstidprosent: number;
    flerbarnsdager: boolean;
    gjelderAnnenPart: boolean;
    graderingInnvilget: boolean;
    periode: {
        fom: string;
        tom: string;
    };
    morsAktivitetIPerioden?: string;
    overfoeringAarsak?: string;
    periodeResultatType: string;
    samtidigUttak: boolean;
    samtidigUttaksprosent?: number;
    stønadskontotype: string;
    trekkDager: number;
    utbetalingsprosent: number;
    uttakArbeidType: string[];
    utsettelsePeriodeType?: string;
}

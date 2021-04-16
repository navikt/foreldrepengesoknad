export enum LeveranseStatus {
    PÅ_VENT = 'PÅ_VENT',
    AVSLÅTT = 'AVSLÅTT',
    PÅGÅR = 'PÅGÅR',
    INNVILGET = 'INNVILGET',
    SENDT_OG_FORSØKT_BEHANDLET_FPSAK = 'SENDT_OG_FORSØKT_BEHANDLET_FPSAK',
    FP_FORDEL_MESSED_UP = 'FP_FORDEL_MESSED_UP',
    GOSYS = 'GOSYS',
}

export interface Kvittering {
    referanseId: string;
    mottattDato: string;
    leveranseStatus: LeveranseStatus;
    journalId: string;
    saksNr: string;
    pdf: any;
    infoskrivPdf: any;
}

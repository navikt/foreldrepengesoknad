//TODO Fjern denne. Bruk heller den i types-pakka

export enum StønadskontoType {
    Mødrekvote = 'MØDREKVOTE',
    Fedrekvote = 'FEDREKVOTE',
    Fellesperiode = 'FELLESPERIODE',
    Foreldrepenger = 'FORELDREPENGER',
    ForeldrepengerFørFødsel = 'FORELDREPENGER_FØR_FØDSEL',
    Flerbarnsdager = 'FLERBARNSDAGER', // Ikke brukt som egen type i periodene
    AktivitetsfriKvote = 'AKTIVITETSFRI_KVOTE', // Foreldrepenger
}

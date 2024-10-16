export type InntektsmeldingDto = {
    erAktiv: boolean;
    inntektPrMnd: number;
    refusjonPrMnd?: number;
    arbeidsgiverNavn: string;
    journalpostId: string;
    kontaktpersonNavn: string;
    kontaktpersonNummer: string;
    motattDato: string;
    innsendingstidspunkt: string;
    startDatoPermisjon: string;
    bortfalteNaturalytelser: BortfaltNaturalytelse[];
    refusjonsperioder: Refusjonsperiode[];
};

type Refusjonsperiode = {
    refusjonsbeløp: number;
    fomDato: string;
};

export type BortfaltNaturalytelse = {
    fomDato: string;
    tomDato: string;
    beloepPerMnd: number;
    type: keyof typeof NaturalytelseType;
};

export const NaturalytelseType = {
    ELEKTRISK_KOMMUNIKASJON: 'Elektrisk kommunikasjon',
    AKSJER_GRUNNFONDSBEVIS_TIL_UNDERKURS: 'Aksjer grunnfondsbevis til underkurs',
    LOSJI: 'Losji',
    KOST_DØGN: 'Kostpenger døgnsats',
    BESØKSREISER_HJEMMET_ANNET: 'Besøksreiser hjemmet annet',
    KOSTBESPARELSE_I_HJEMMET: 'Kostbesparelser i hjemmet',
    RENTEFORDEL_LÅN: 'Rentefordel lån',
    BIL: 'Bil',
    KOST_DAGER: 'Kostpenger dager',
    BOLIG: 'Bolig',
    SKATTEPLIKTIG_DEL_FORSIKRINGER: 'Skattepliktig del forsikringer',
    FRI_TRANSPORT: 'Fri transport',
    OPSJONER: 'Opsjoner',
    TILSKUDD_BARNEHAGEPLASS: 'Tilskudd barnehageplass',
    ANNET: 'Annet',
    BEDRIFTSBARNEHAGEPLASS: 'Bedriftsbarnehageplass',
    YRKEBIL_TJENESTLIGBEHOV_KILOMETER: 'Yrkesbil tjenesteligbehov kilometer',
    YRKEBIL_TJENESTLIGBEHOV_LISTEPRIS: 'Yrkesbil tjenesteligbehov listepris',
    INNBETALING_TIL_UTENLANDSK_PENSJONSORDNING: 'Innbetaling utenlandsk pensjonsordning',
    UDEFINERT: 'Ikke definert',
};

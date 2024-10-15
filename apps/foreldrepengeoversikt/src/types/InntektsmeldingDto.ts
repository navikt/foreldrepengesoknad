export type InntektsmeldingDto = {
    inntektPrMnd: number;
    refusjonPrMnd: number;
    arbeidsgiverIdent: string;
    journalpostId: string;
    kontaktpersonNavn: string;
    kontaktpersonNummer: string;
    motattDato: string;
    innsendingstidspunkt: string;
    startDatoPermisjon: string;
    aktiveNaturalytelser: AktivNaturalYtelse[];
    refusjonsperioder: Refusjonsperiode[];
};

type Refusjonsperiode = {
    refusjonsbeløp: Beløp;
    indexKey: string;
    fom: string;
};

export type AktivNaturalYtelse = Readonly<{
    periode: { fomDato: string; tomDato: string };
    beloepPerMnd: Beløp;
    type: keyof typeof NaturalytelseType;
    indexKey: string;
}>;

type Beløp = {
    verdi: number;
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

export const IM_DUMMY = {
    innsendingstidspunkt: '2024-08-08T00:00:00',
    aktiveNaturalytelser: [
        {
            periode: { fomDato: '2024-01-09', tomDato: '2024-10-09' },
            type: 'ELEKTRISK_KOMMUNIKASJON',
            beloepPerMnd: { verdi: 999 },
            indexKey: '1',
        },
        {
            periode: { fomDato: '2024-01-11', tomDato: '2024-10-11' },
            type: 'LOSJI',
            beloepPerMnd: { verdi: 10 },
            indexKey: '2',
        },
    ],
    arbeidsgiverIdent: '1',
    eksternArbeidsforholdId: 'ARB001-001',
    inntektPrMnd: 120000,
    internArbeidsforholdId: '8ff2c608-6bab-4f83-9732-d26f8c89aa84',
    kontaktpersonNavn: 'Corpolarsen',
    kontaktpersonNummer: '41925090',
    motattDato: '2021-12-06',
    refusjonPrMnd: 20000,
    startDatoPermisjon: '2024-10-10',
    refusjonsperioder: [
        {
            refusjonsbeløp: { verdi: 5000 },
            indexKey: '1',
            fom: '2024-01-10',
        },
        {
            refusjonsbeløp: { verdi: 3000 },
            indexKey: '2',
            fom: '2024-01-09',
        },
    ],
} satisfies InntektsmeldingDto;

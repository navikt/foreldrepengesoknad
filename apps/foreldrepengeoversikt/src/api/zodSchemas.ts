import { z } from 'zod';

export const NaturalytelseTypeSchema = z.enum([
    'ELEKTRISK_KOMMUNIKASJON',
    'AKSJER_GRUNNFONDSBEVIS_TIL_UNDERKURS',
    'LOSJI',
    'KOST_DØGN',
    'BESØKSREISER_HJEMMET_ANNET',
    'KOSTBESPARELSE_I_HJEMMET',
    'RENTEFORDEL_LÅN',
    'BIL',
    'KOST_DAGER',
    'BOLIG',
    'SKATTEPLIKTIG_DEL_FORSIKRINGER',
    'FRI_TRANSPORT',
    'OPSJONER',
    'TILSKUDD_BARNEHAGEPLASS',
    'ANNET',
    'BEDRIFTSBARNEHAGEPLASS',
    'YRKEBIL_TJENESTLIGBEHOV_KILOMETER',
    'YRKEBIL_TJENESTLIGBEHOV_LISTEPRIS',
    'INNBETALING_TIL_UTENLANDSK_PENSJONSORDNING',
]);
export type Naturalytelsetype = z.infer<typeof NaturalytelseTypeSchema>;
export const InntektsmeldingDtoSchema = z.object({
    versjon: z.number(),
    erAktiv: z.boolean(),
    stillingsprosent: z.number(),
    inntektPrMnd: z.number(),
    refusjonPrMnd: z.number().optional(),
    arbeidsgiverNavn: z.string(),
    arbeidsgiverIdent: z.string(),
    journalpostId: z.string(),
    mottattTidspunkt: z.string(),
    startDatoPermisjon: z.string().optional(),
    refusjonsperioder: z.array(
        z.object({
            fomDato: z.string(),
            refusjonsbeløpMnd: z.number(),
        }),
    ),
    bortfalteNaturalytelser: z.array(
        z.object({
            fomDato: z.string(),
            tomDato: z.string(),
            beløpPerMnd: z.number(),
            type: NaturalytelseTypeSchema,
        }),
    ),
});
export type InntektsmeldingDto = z.infer<typeof InntektsmeldingDtoSchema>;

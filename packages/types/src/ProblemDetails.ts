type FellesFeilKode = 'GENERELL' | 'IKKE_TILGANG' | 'IKKE_FUNNET' | 'VALIDERING';

export type FpSoknadFeilKode =
    | FellesFeilKode
    | 'DUPLIKAT_FORSENDELSE'
    | 'DUPLIKAT_VEDLEGG'
    | 'MELLOMLAGRING'
    | 'MELLOMLAGRING_VEDLEGG'
    | 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
    | 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
    | 'KRYPTERING_MELLOMLAGRING';

export type FpOversiktFeilKode =
    | FellesFeilKode
    | 'IKKE_TILGANG_TIL_DOKUMENT'
    | 'IKKE_TILGANG_IKKE_EKSTERN'
    | 'IKKE_TILGANG_UMYNDIG'
    | 'IKKE_TILGANG_INAKTIV'
    | 'IKKE_TILGANG_MANGLER_DRIFT_ROLLE';

type ProblemDetailsBase = {
    feilmelding: string;
    callId?: string;
};

export type FpSoknadProblemDetails = ProblemDetailsBase & { feilkode: FpSoknadFeilKode };
export type FpOversiktProblemDetails = ProblemDetailsBase & { feilkode: FpOversiktFeilKode };
export type FpGrunndataProblemDetails = ProblemDetailsBase & { feilkode: FellesFeilKode };

export type ProblemDetails = FpSoknadProblemDetails | FpOversiktProblemDetails | FpGrunndataProblemDetails;

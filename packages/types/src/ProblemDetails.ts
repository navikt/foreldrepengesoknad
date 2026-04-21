export type FeilKode =
    | 'GENERELL'
    | 'IKKE_TILGANG'
    | 'IKKE_FUNNET'
    | 'VALIDERING'
    | 'DUPLIKAT_FORSENDELSE'
    | 'DUPLIKAT_VEDLEGG'
    | 'MELLOMLAGRING'
    | 'MELLOMLAGRING_VEDLEGG'
    | 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
    | 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
    | 'KRYPTERING_MELLOMLAGRING';

export type ProblemDetails = {
    feilkode: FeilKode;
    feilmelding: string;
    callId?: string;
};

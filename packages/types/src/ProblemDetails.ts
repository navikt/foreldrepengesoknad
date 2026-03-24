type FeilKode =
    | 'IKKE_TILGANG'
    | 'DUPLIKAT_FORSENDELSE'
    | 'DUPLIKAT_VEDLEGG'
    | 'MELLOMLAGRING'
    | 'MELLOMLAGRING_VEDLEGG'
    | 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
    | 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
    | 'KRYPTERING_MELLOMLAGRING'
    | 'VALIDERING';

export type ProblemDetails = {
    feilKode: FeilKode;
    status: number;
    message: string;
    callId?: string;
};

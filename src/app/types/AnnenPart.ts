export interface AnnenPart {
    aktørid: string;
    fnr: string;
    navn: {
        fornavn: string;
        etternavn: string;
        kjønn: 'K' | 'M';
    };
}

export interface Tilleggsopplysning {
    tekst: string;
    ekstraInformasjon?: string;
}

export interface Tilleggsopplysninger {
    begrunnelseForSenEndring?: Tilleggsopplysning;
}

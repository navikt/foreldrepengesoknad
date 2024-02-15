export interface Barn {
    erBarnetFødt: boolean;
    fødselsdato: string | undefined;
    termindato: string;
}

export interface BarnDTO {
    erBarnetFødt: boolean;
    termindato: string;
    fødselsdatoer?: string[];
}

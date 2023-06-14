interface Barn {
    erBarnetFødt: boolean;
    termindato: string;
    fødselsdatoer?: string[];
}

export interface UferdigBarn {
    termindato?: string;
    erBarnetFødt?: boolean;
    fødselsdato?: string;
}

export interface BarnDTO {
    erBarnetFødt: boolean;
    termindato: Date;
    fødselsdatoer?: Date[];
}

export default Barn;

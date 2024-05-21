export type BarnetErFødt = {
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
};

export type BarnetErIkkeFødt = {
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
};

export type BarnetErAdoptert = {
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
};

export type Fødsel = BarnetErFødt | BarnetErIkkeFødt;

export type OmBarnet = Fødsel | BarnetErAdoptert;

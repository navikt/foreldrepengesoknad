/** Planlegger-specific input type for "Om barnet" context data */

export type BarnetErFødtPlanlegger = {
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
};

export type BarnetErIkkeFødtPlanlegger = {
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
};

export type BarnetErAdoptertPlanlegger = {
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
};

export type OmBarnetPlanlegger = BarnetErFødtPlanlegger | BarnetErIkkeFødtPlanlegger | BarnetErAdoptertPlanlegger;

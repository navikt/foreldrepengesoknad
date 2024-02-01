import { Attachment } from '@navikt/fp-common';

export type OmBarnetFormValues = {
    erBarnetFødt: boolean;
    adopsjonAvEktefellesBarn: boolean;
    antallBarn: string;
    antallBarnSelect: string;
    adopsjonsdato: string;
    fødselsdatoer: Array<{ dato?: string }>;
    omsorgsovertakelse: Attachment[];
    termindato: string;
    terminbekreftelse: Attachment[];
    terminbekreftelsedato: string;
    adoptertIUtlandet: boolean;
    ankomstdato: string;
};

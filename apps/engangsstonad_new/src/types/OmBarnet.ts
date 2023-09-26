import { Attachment } from 'fpcommon/uploader/typer/Attachment';

export type Født = {
    erBarnetFødt?: boolean;
    antallBarn?: number;
    antallBarnDropDown?: number;
    fødselsdatoer?: string[];
    termindato?: string;
    terminbekreftelsedato?: string;
};

export type Adopsjon = {
    adopsjonAvEktefellesBarn?: boolean;
    adopsjonsdato?: string;
    antallBarn?: number;
    antallBarnDropDown?: number;
    søkerAdopsjonAlene?: boolean;
    fødselsdatoer?: {
        dato?: string;
    }[];
    vedlegg?: Attachment[];
};

export type OmBarnet = Født | Adopsjon;

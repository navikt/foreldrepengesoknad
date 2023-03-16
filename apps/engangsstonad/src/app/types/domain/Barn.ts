import { Attachment } from 'common/storage/attachment/types/Attachment';

interface Barn {
    antallBarn?: number | undefined;
    erBarnetFødt?: boolean;
}

export interface FodtBarn extends Barn {
    fødselsdatoer: Date[];
}

export interface UfodtBarn extends Barn {
    termindato: Date | undefined;
    terminbekreftelse?: Attachment[];
    terminbekreftelseDato: Date | undefined;
}

export const isUfødtBarn = (barn: Barn): barn is UfodtBarn => {
    return (barn as UfodtBarn).termindato !== undefined;
};

export const isFødtBarn = (barn: Barn): barn is FodtBarn => {
    return (barn as FodtBarn).fødselsdatoer !== undefined;
};

export default Barn;

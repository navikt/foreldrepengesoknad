import { Attachment } from 'common/storage/attachment/types/Attachment';

interface Adopsjon {
    adopsjonsdato: Date | undefined;
    antallBarn?: number;
    fødselsdatoer: Date[];
    adopsjonAvEktefellesBarn?: boolean;
    søkerAdopsjonAlene?: boolean;
    omsorgsovertakelse: Attachment[];
}

export default Adopsjon;

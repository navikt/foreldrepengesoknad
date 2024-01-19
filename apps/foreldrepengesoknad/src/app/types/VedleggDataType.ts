import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

export type VedleggDataType = {
    [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]?: Attachment[];
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]?: Attachment[];
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]?: Attachment[];
    [Skjemanummer.DOK_OVERFØRING_FOR_SYK]?: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE]?: Attachment[];
    [Skjemanummer.OMSORGSOVERTAKELSE]?: Attachment[];
    [Skjemanummer.DOK_AV_ALENEOMSORG]?: Attachment[];
    [Skjemanummer.TERMINBEKREFTELSE]?: Attachment[];
    [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]?: Attachment[];
    [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]?: Attachment[];
};

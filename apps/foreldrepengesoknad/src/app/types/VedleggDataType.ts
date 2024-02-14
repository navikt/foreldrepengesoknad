import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

export type VedleggDataType = {
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]?: Attachment[];
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]?: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_BARN]?: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_MOR]?: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_FAR]?: Attachment[];
    [Skjemanummer.OMSORGSOVERTAKELSE]?: Attachment[];
    [Skjemanummer.DOK_AV_ALENEOMSORG]?: Attachment[];
    [Skjemanummer.TERMINBEKREFTELSE]?: Attachment[];
    [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]?: Attachment[];
    [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]?: Attachment[];
    [Skjemanummer.DOK_SYKDOM_MOR]?: Attachment[];
    [Skjemanummer.DOK_SYKDOM_FAR]?: Attachment[];
};

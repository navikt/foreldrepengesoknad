import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

export interface ManglendeVedleggFormData {
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: Attachment[];
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: Attachment[];
    [Skjemanummer.DOK_SYKDOM_MOR]: Attachment[];
    [Skjemanummer.DOK_SYKDOM_FAR]: Attachment[];
    [Skjemanummer.DOK_ARBEID_MOR]: Attachment[];
    [Skjemanummer.DOK_UTDANNING_MOR]: Attachment[];
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: Attachment[];
    [Skjemanummer.DOK_AV_ALENEOMSORG]: Attachment[];
    [Skjemanummer.TERMINBEKREFTELSE]: Attachment[];
    [Skjemanummer.OMSORGSOVERTAKELSE]: Attachment[];
}

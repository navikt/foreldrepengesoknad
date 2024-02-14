import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

export interface ManglendeVedleggFormData {
    [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]: Attachment[];
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: Attachment[];
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: Attachment[];
    [Skjemanummer.DOK_SYKDOM_MOR]: Attachment[];
}

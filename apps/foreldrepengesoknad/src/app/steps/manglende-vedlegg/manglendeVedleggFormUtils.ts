import { Attachment } from '@navikt/fp-types';
import { Skjemanummer } from '@navikt/fp-constants';
import {
    isArbeidUtdanningEllerSykdomVedlegg,
    isMorInnleggelseVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
} from './util';

export interface ManglendeVedleggFormData {
    [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]: Attachment[];
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: Attachment[];
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: Attachment[];
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: Attachment[];
    [Skjemanummer.DOK_SYKDOM_MOR]: Attachment[];
    [Skjemanummer.DOK_SYKDOM_FAR]: Attachment[];
}

export const getInitValues = (vedlegg: Attachment[]): Readonly<ManglendeVedleggFormData> => ({
    [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]: vedlegg.filter(isArbeidUtdanningEllerSykdomVedlegg),
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: vedlegg.filter(isKvalifiseringsprogramVedlegg),
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: vedlegg.filter(isIntroduksjonsprogramVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: vedlegg.filter(isMorInnleggelseVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: vedlegg.filter(isMorInnleggelseVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: vedlegg.filter(isMorInnleggelseVedlegg),
    [Skjemanummer.DOK_SYKDOM_MOR]: vedlegg.filter(isMorInnleggelseVedlegg),
    [Skjemanummer.DOK_SYKDOM_FAR]: vedlegg.filter(isMorInnleggelseVedlegg),
});

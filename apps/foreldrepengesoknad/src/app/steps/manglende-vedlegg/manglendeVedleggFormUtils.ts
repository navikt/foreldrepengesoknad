import { Attachment } from '@navikt/fp-types';
import { Skjemanummer } from '@navikt/fp-constants';
import {
    isArbeidUtdanningEllerSykdomVedlegg,
    isMorInnleggelseVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
    isFarInnleggelseVedlegg,
    isMorForSykVedlegg,
    isFarForSykVedlegg,
    isBarnInnleggelseVedlegg,
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
    [Skjemanummer.DOK_ARBEID_MOR]: Attachment[];
    [Skjemanummer.DOK_UTDANNING_MOR]: Attachment[];
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: Attachment[];
}

export const getInitValues = (vedlegg: Attachment[]): Readonly<ManglendeVedleggFormData> => ({
    [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]: vedlegg.filter(isArbeidUtdanningEllerSykdomVedlegg),
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: vedlegg.filter(isKvalifiseringsprogramVedlegg),
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: vedlegg.filter(isIntroduksjonsprogramVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: vedlegg.filter(isMorInnleggelseVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: vedlegg.filter(isBarnInnleggelseVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: vedlegg.filter(isFarInnleggelseVedlegg),
    [Skjemanummer.DOK_SYKDOM_MOR]: vedlegg.filter(isMorForSykVedlegg),
    [Skjemanummer.DOK_SYKDOM_FAR]: vedlegg.filter(isFarForSykVedlegg),
    [Skjemanummer.DOK_ARBEID_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [],
});

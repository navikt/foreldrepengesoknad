import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import {
    isBarnInnleggelseVedlegg,
    isFarForSykVedlegg,
    isFarInnleggelseVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
    isMorForSykVedlegg,
    isMorInnleggelseVedlegg,
    isMorJobberOgStudererVedlegg,
    isMorJobberVedlegg,
    isMorStudererVedlegg,
} from './util';

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
}

export const getInitValues = (vedlegg: Attachment[]): Readonly<ManglendeVedleggFormData> => ({
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: vedlegg.filter(isKvalifiseringsprogramVedlegg),
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: vedlegg.filter(isIntroduksjonsprogramVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: vedlegg.filter(isMorInnleggelseVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: vedlegg.filter(isBarnInnleggelseVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: vedlegg.filter(isFarInnleggelseVedlegg),
    [Skjemanummer.DOK_SYKDOM_MOR]: vedlegg.filter(isMorForSykVedlegg),
    [Skjemanummer.DOK_SYKDOM_FAR]: vedlegg.filter(isFarForSykVedlegg),
    [Skjemanummer.DOK_ARBEID_MOR]: vedlegg.filter(isMorStudererVedlegg),
    [Skjemanummer.DOK_UTDANNING_MOR]: vedlegg.filter(isMorJobberVedlegg),
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: vedlegg.filter(isMorJobberOgStudererVedlegg),
});

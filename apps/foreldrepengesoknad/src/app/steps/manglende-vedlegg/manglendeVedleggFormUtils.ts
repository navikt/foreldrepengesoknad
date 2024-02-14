import { Attachment } from '@navikt/fp-types';
import { ManglendeVedleggFormData } from './manglendeVedleggFormConfig';
import { Skjemanummer } from '@navikt/fp-constants';
import {
    isArbeidUtdanningEllerSykdomVedlegg,
    isMorInnleggelseVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
} from './util';

export const getInitValues = (vedlegg: Attachment[]): Readonly<ManglendeVedleggFormData> => ({
    [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]: vedlegg.filter(isArbeidUtdanningEllerSykdomVedlegg),
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: vedlegg.filter(isKvalifiseringsprogramVedlegg),
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: vedlegg.filter(isIntroduksjonsprogramVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: vedlegg.filter(isMorInnleggelseVedlegg),
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: vedlegg.filter(isMorInnleggelseVedlegg),
    [Skjemanummer.DOK_SYKDOM_MOR]: vedlegg.filter(isMorInnleggelseVedlegg),
});

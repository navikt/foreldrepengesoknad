import { Skjemanummer } from '@navikt/fp-constants';

export type GyldigeSkjemanummer =
    | Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
    | Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
    | Skjemanummer.DOK_INNLEGGELSE_BARN
    | Skjemanummer.DOK_INNLEGGELSE_MOR
    | Skjemanummer.DOK_INNLEGGELSE_FAR
    | Skjemanummer.DOK_SYKDOM_MOR
    | Skjemanummer.DOK_SYKDOM_FAR
    | Skjemanummer.DOK_UTDANNING_MOR
    | Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
    | Skjemanummer.DOK_ARBEID_MOR
    | Skjemanummer.DOK_AV_ALENEOMSORG
    | Skjemanummer.TERMINBEKREFTELSE
    | Skjemanummer.OMSORGSOVERTAKELSE;

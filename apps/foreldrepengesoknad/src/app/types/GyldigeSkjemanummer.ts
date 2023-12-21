import { Skjemanummer } from '@navikt/fp-constants';

export type GyldigeSkjemanummer =
    | Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM
    | Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
    | Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
    | Skjemanummer.DOK_OVERFØRING_FOR_SYK
    | Skjemanummer.OMSORGSOVERTAKELSE
    | Skjemanummer.DOK_AV_ALENEOMSORG
    | Skjemanummer.TERMINBEKREFTELSE
    | Skjemanummer.DOK_INNLEGGELSE;

export type GyldigeSkjemanummerUttak =
    | Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM
    | Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
    | Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
    | Skjemanummer.DOK_OVERFØRING_FOR_SYK
    | Skjemanummer.DOK_INNLEGGELSE;

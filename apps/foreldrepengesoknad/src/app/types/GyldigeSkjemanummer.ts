import { Skjemanummer } from '@navikt/fp-constants';

export type GyldigeSkjemanummer =
    | Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
    | Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
    | Skjemanummer.OMSORGSOVERTAKELSE
    | Skjemanummer.DOK_AV_ALENEOMSORG
    | Skjemanummer.TERMINBEKREFTELSE
    | Skjemanummer.DOK_INNLEGGELSE_BARN
    | Skjemanummer.DOK_INNLEGGELSE_MOR
    | Skjemanummer.DOK_INNLEGGELSE_FAR
    | Skjemanummer.DOK_SYKDOM_MOR
    | Skjemanummer.DOK_SYKDOM_FAR;

export type GyldigeSkjemanummerUttak =
    | Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
    | Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
    | Skjemanummer.DOK_INNLEGGELSE_BARN
    | Skjemanummer.DOK_INNLEGGELSE_MOR
    | Skjemanummer.DOK_INNLEGGELSE_FAR
    | Skjemanummer.DOK_SYKDOM_MOR
    | Skjemanummer.DOK_SYKDOM_FAR;

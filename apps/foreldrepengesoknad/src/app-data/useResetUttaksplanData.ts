import { Skjemanummer } from '@navikt/fp-constants';

import { ContextDataType, useContextGetData, useContextSaveData } from './FpDataContext';

const NULLSTILTE_PERIODE_VEDLEGG = {
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: [],
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: [],
    [Skjemanummer.DOK_SYKDOM_MOR]: [],
    [Skjemanummer.DOK_SYKDOM_FAR]: [],
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: [],
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: [],
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: [],
    [Skjemanummer.DOK_ARBEID_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [],
} as const;

export const useResetUttaksplanData = () => {
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);
    const oppdaterHarJustertUttakVedFødsel = useContextSaveData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);
    const oppdaterVedlegg = useContextSaveData(ContextDataType.VEDLEGG);

    return () => {
        oppdaterHarJustertUttakVedFødsel(undefined);
        oppdaterUttaksplan(undefined);
        oppdaterVedlegg({ ...vedlegg, ...NULLSTILTE_PERIODE_VEDLEGG });
    };
};

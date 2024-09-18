import { VedleggDataType } from 'types/VedleggDataType';

import {
    Periode,
    isFellesperiodeMorForSyk,
    isFellesperiodeMorInnlagt,
    isForeldrepengerMedAktivitetskravMorForSyk,
    isForeldrepengerMedAktivitetskravMorInnlagt,
    isMorIntroprogram,
    isMorJobber,
    isMorJobberOgStuderer,
    isMorKvalprogram,
    isMorStuderer,
    isOverføringFarForSyk,
    isOverføringFarInnlagt,
    isOverføringMorForSyk,
    isOverføringMorInnlagt,
    isPeriodeUtenUttakMorForSyk,
    isPeriodeUtenUttakMorInnlagt,
    isPeriodeUtenUttakMorIntroprogram,
    isPeriodeUtenUttakMorJobber,
    isPeriodeUtenUttakMorJobberOgStuderer,
    isPeriodeUtenUttakMorKvalprogram,
    isPeriodeUtenUttakMorStuderer,
    isUtsettelseBarnInnlagt,
    isUtsettelseMorForSyk,
    isUtsettelseMorInnlagt,
    isUttakAvFedrekvoteMorForSyk,
} from '@navikt/fp-common';
import { InnsendingsType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

export const isKvalifiseringsprogramVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM;
};

export const isIntroduksjonsprogramVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET;
};

export const isPeriodeMedMorInnleggelse = (periode: Periode) => {
    return (
        isOverføringMorInnlagt(periode) ||
        isUttakAvFedrekvoteMorForSyk(periode) ||
        isFellesperiodeMorInnlagt(periode) ||
        isForeldrepengerMedAktivitetskravMorInnlagt(periode) ||
        isUtsettelseMorInnlagt(periode) ||
        isPeriodeUtenUttakMorInnlagt(periode)
    );
};

export const isPeriodeMedMorForSyk = (periode: Periode) => {
    return (
        isFellesperiodeMorForSyk(periode) ||
        isUtsettelseMorForSyk(periode) ||
        isOverføringMorForSyk(periode) ||
        isForeldrepengerMedAktivitetskravMorForSyk(periode) ||
        isPeriodeUtenUttakMorForSyk(periode)
    );
};

export const isPeriodeMedFarInnleggelse = (periode: Periode) => {
    return isOverføringFarInnlagt(periode);
};

export const isPeriodeMedFarForSyk = (periode: Periode) => {
    return isOverføringFarForSyk(periode);
};

export const isPeriodeMedBarnInnleggelse = (periode: Periode) => {
    return isUtsettelseBarnInnlagt(periode);
};

export const isPeriodeMedMorStuderer = (periode: Periode) => {
    return isMorStuderer(periode) || isPeriodeUtenUttakMorStuderer(periode);
};

export const isPeriodeMedMorJobber = (periode: Periode) => {
    return isMorJobber(periode) || isPeriodeUtenUttakMorJobber(periode);
};

export const isPeriodeMedMorJobberOgStuderer = (periode: Periode) => {
    return isMorJobberOgStuderer(periode) || isPeriodeUtenUttakMorJobberOgStuderer(periode);
};

export const isPeriodeMedMorIntroprogram = (periode: Periode) => {
    return isMorIntroprogram(periode) || isPeriodeUtenUttakMorIntroprogram(periode);
};

export const isPeriodeMedMorKvalprogram = (periode: Periode) => {
    return isMorKvalprogram(periode) || isPeriodeUtenUttakMorKvalprogram(periode);
};

export const isOmsorgsovertakelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.OMSORGSOVERTAKELSE;
};

export const getOmsorgsovertakelseVedlegg = (vedlegg: VedleggDataType) => {
    const omsorgsovertakelseVedlegg = vedlegg[Skjemanummer.OMSORGSOVERTAKELSE]
        ? vedlegg[Skjemanummer.OMSORGSOVERTAKELSE]
        : [];

    return omsorgsovertakelseVedlegg;
};

export const isAleneOmOmsorgVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_AV_ALENEOMSORG;
};

export const getAleneOmOmsorgVedlegg = (vedlegg: VedleggDataType) => {
    const aleneOmOmsorgVedlegg = vedlegg[Skjemanummer.DOK_AV_ALENEOMSORG]
        ? vedlegg[Skjemanummer.DOK_AV_ALENEOMSORG]
        : [];

    return aleneOmOmsorgVedlegg;
};

export const isTerminbekreftelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.TERMINBEKREFTELSE;
};

export const getTerminbekreftelseVedlegg = (vedlegg: VedleggDataType) => {
    const terminbekreftelseVedlegg = vedlegg[Skjemanummer.TERMINBEKREFTELSE]
        ? vedlegg[Skjemanummer.TERMINBEKREFTELSE]
        : [];

    return terminbekreftelseVedlegg;
};

export const getAndreInntekterVedlegg = (vedlegg: VedleggDataType) => {
    const andreInntekterVedlegg = [];

    const militær = vedlegg[Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE];
    const etterlønn = vedlegg[Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG];

    if (militær) {
        andreInntekterVedlegg.push(...militær);
    }

    if (etterlønn) {
        andreInntekterVedlegg.push(...etterlønn);
    }

    return andreInntekterVedlegg;
};

export const isMilitærVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE;
};

export const isEtterlønnVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG;
};

export const isMorInnleggelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_INNLEGGELSE_MOR;
};

export const isMorForSykVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_SYKDOM_MOR;
};

export const isFarInnleggelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_INNLEGGELSE_FAR;
};

export const isFarForSykVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_SYKDOM_FAR;
};

export const isBarnInnleggelseVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_INNLEGGELSE_BARN;
};

export const isMorStudererVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_UTDANNING_MOR;
};

export const isMorJobberVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_ARBEID_MOR;
};

export const isMorJobberOgStudererVedlegg = (attachment: Attachment) => {
    return attachment.skjemanummer === Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR;
};

export const getMorInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const morInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_MOR]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE_MOR]
        : [];

    return morInnlagtVedlegg;
};

export const getMorForSykVedlegg = (vedlegg: VedleggDataType) => {
    const morForSykVedlegg = vedlegg[Skjemanummer.DOK_SYKDOM_MOR] ? vedlegg[Skjemanummer.DOK_SYKDOM_MOR] : [];

    return morForSykVedlegg;
};

export const getFarInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const farInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_FAR]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE_FAR]
        : [];

    return farInnlagtVedlegg;
};

export const getFarForSykVedlegg = (vedlegg: VedleggDataType) => {
    const farForSykVedlegg = vedlegg[Skjemanummer.DOK_SYKDOM_FAR] ? vedlegg[Skjemanummer.DOK_SYKDOM_FAR] : [];

    return farForSykVedlegg;
};

export const getBarnInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const barnInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_BARN]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE_BARN]
        : [];

    return barnInnlagtVedlegg;
};

export const getMorStudererVedlegg = (vedlegg: VedleggDataType) => {
    const morStudererVedlegg = vedlegg[Skjemanummer.DOK_UTDANNING_MOR] ? vedlegg[Skjemanummer.DOK_UTDANNING_MOR] : [];

    return morStudererVedlegg;
};

export const getMorJobberVedlegg = (vedlegg: VedleggDataType) => {
    const morJobberVedlegg = vedlegg[Skjemanummer.DOK_ARBEID_MOR] ? vedlegg[Skjemanummer.DOK_ARBEID_MOR] : [];

    return morJobberVedlegg;
};

export const getMorJobberOgStudererVedlegg = (vedlegg: VedleggDataType) => {
    const morJobberVedlegg = vedlegg[Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]
        ? vedlegg[Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]
        : [];

    return morJobberVedlegg;
};

export const getMorIntroprogramVedlegg = (vedlegg: VedleggDataType) => {
    const morJobberVedlegg = vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]
        ? vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]
        : [];

    return morJobberVedlegg;
};

export const getMorKvalprogramVedlegg = (vedlegg: VedleggDataType) => {
    const morJobberVedlegg = vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]
        ? vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]
        : [];

    return morJobberVedlegg;
};

export const isSendSenereVedlegg = (attachment: Attachment) => {
    return attachment.innsendingsType === InnsendingsType.SEND_SENERE;
};

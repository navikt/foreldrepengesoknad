import { VedleggDataType } from 'types/VedleggDataType';

import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment, PeriodeDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan/validators';

export const isPeriodeMedMorInnleggelse = (periode: PeriodeDto_fpoversikt, familiehendelsedato: string) => {
    return (
        isOverføringMorInnlagt(periode) ||
        isUttakAvFedrekvoteMorForSyk(periode, familiehendelsedato) ||
        isFellesperiodeMorInnlagt(periode) ||
        isForeldrepengerMedAktivitetskravMorInnlagt(periode) ||
        isUtsettelseMorInnlagt(periode) ||
        isPeriodeUtenUttakMorInnlagt(periode)
    );
};

export const isUtsettelseBarnInnlagt = (periode: PeriodeDto_fpoversikt) => {
    return periode.søker?.utsettelseÅrsak === 'BARN_INNLAGT';
};

const isPeriodeUtenUttakMorInnlagt = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.utsettelseÅrsak === 'FRI' && søker.morsAktivitet === 'INNLAGT';
};

const isUtsettelseMorInnlagt = (periode: PeriodeDto_fpoversikt) => {
    return periode.søker?.utsettelseÅrsak === 'SØKER_INNLAGT';
};

const isForeldrepengerMedAktivitetskravMorInnlagt = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return (
        !!søker &&
        Uttaksperioden.erUttaksperiode(søker) &&
        søker.kontoType === 'FORELDREPENGER' &&
        søker.morsAktivitet === 'INNLAGT'
    );
};

export const isPeriodeMedFarInnleggelse = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' && søker.forelder === 'MOR';
};

const isOverføringMorInnlagt = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' && søker.forelder === 'FAR_MEDMOR';
};

const isFellesperiodeMorInnlagt = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return (
        !!søker &&
        Uttaksperioden.erUttaksperiode(søker) &&
        søker.kontoType === 'FELLESPERIODE' &&
        søker.morsAktivitet === 'INNLAGT'
    );
};

export const isOverføringFarForSyk = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.forelder === 'MOR' && søker.overføringÅrsak === 'SYKDOM_ANNEN_FORELDER';
};

const isUttakAvFedrekvoteMorForSyk = (periode: PeriodeDto_fpoversikt, familiehendelsedato: string): boolean => {
    const søker = periode.søker;
    return (
        !!søker &&
        Uttaksperioden.erUttaksperiode(søker) &&
        søker.kontoType === 'FEDREKVOTE' &&
        !søker.samtidigUttak &&
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode,
            familiehendelsedato,
            undefined,
        )
    );
};

export const isPeriodeMedMorForSyk = (periode: PeriodeDto_fpoversikt) => {
    return (
        isFellesperiodeMorForSyk(periode) ||
        isUtsettelseMorForSyk(periode) ||
        isOverføringMorForSyk(periode) ||
        isForeldrepengerMedAktivitetskravMorForSyk(periode) ||
        isPeriodeUtenUttakMorForSyk(periode)
    );
};

const isFellesperiodeMorForSyk = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return (
        !!søker &&
        Uttaksperioden.erUttaksperiode(søker) &&
        søker.kontoType === 'FELLESPERIODE' &&
        søker.morsAktivitet === 'TRENGER_HJELP'
    );
};

export const isPeriodeMedMorJobber = (periode: PeriodeDto_fpoversikt) => {
    return isMorJobber(periode) || isPeriodeUtenUttakMorJobber(periode);
};

const isMorJobber = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return !!søker && Uttaksperioden.erUttaksperiode(søker) && søker.morsAktivitet === 'ARBEID';
};

const isPeriodeUtenUttakMorJobber = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.utsettelseÅrsak === 'FRI' && søker.morsAktivitet === 'ARBEID';
};

const isForeldrepengerMedAktivitetskravMorForSyk = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return (
        !!søker &&
        Uttaksperioden.erUttaksperiode(søker) &&
        søker.kontoType === 'FORELDREPENGER' &&
        søker.morsAktivitet === 'TRENGER_HJELP'
    );
};

const isPeriodeUtenUttakMorForSyk = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.utsettelseÅrsak === 'FRI' && søker.morsAktivitet === 'TRENGER_HJELP';
};

const isOverføringMorForSyk = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.forelder === 'FAR_MEDMOR' && søker.overføringÅrsak === 'SYKDOM_ANNEN_FORELDER';
};

const isUtsettelseMorForSyk = (periode: PeriodeDto_fpoversikt) => {
    return periode.søker?.utsettelseÅrsak === 'SØKER_SYKDOM';
};

export const isPeriodeMedMorIntroprogram = (periode: PeriodeDto_fpoversikt) => {
    return isMorIntroprogram(periode) || isPeriodeUtenUttakMorIntroprogram(periode);
};

const isMorIntroprogram = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return !!søker && Uttaksperioden.erUttaksperiode(søker) && søker.morsAktivitet === 'INTROPROG';
};

const isPeriodeUtenUttakMorIntroprogram = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.utsettelseÅrsak === 'FRI' && søker.morsAktivitet === 'INTROPROG';
};

export const isPeriodeMedMorJobberOgStuderer = (periode: PeriodeDto_fpoversikt) => {
    return isMorJobberOgStuderer(periode) || isPeriodeUtenUttakMorJobberOgStuderer(periode);
};

const isPeriodeUtenUttakMorJobberOgStuderer = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.morsAktivitet === 'ARBEID_OG_UTDANNING' && søker.utsettelseÅrsak === 'FRI';
};

const isMorJobberOgStuderer = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return !!søker && Uttaksperioden.erUttaksperiode(søker) && søker.morsAktivitet === 'ARBEID_OG_UTDANNING';
};

export const isPeriodeMedMorKvalprogram = (periode: PeriodeDto_fpoversikt) => {
    return isMorKvalprogram(periode) || isPeriodeUtenUttakMorKvalprogram(periode);
};

const isMorKvalprogram = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return !!søker && Uttaksperioden.erUttaksperiode(søker) && søker.morsAktivitet === 'KVALPROG';
};

const isPeriodeUtenUttakMorKvalprogram = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.utsettelseÅrsak === 'FRI' && søker.morsAktivitet === 'KVALPROG';
};

export const isPeriodeMedMorStuderer = (periode: PeriodeDto_fpoversikt) => {
    return isMorStuderer(periode) || isPeriodeUtenUttakMorStuderer(periode);
};

const isPeriodeUtenUttakMorStuderer = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return søker?.utsettelseÅrsak === 'FRI' && søker.morsAktivitet === 'UTDANNING';
};

const isMorStuderer = (periode: PeriodeDto_fpoversikt) => {
    const søker = periode.søker;
    return !!søker && Uttaksperioden.erUttaksperiode(søker) && søker.morsAktivitet === 'UTDANNING';
};

export const getOmsorgsovertakelseVedlegg = (vedlegg: VedleggDataType) => {
    const omsorgsovertakelseVedlegg = vedlegg[Skjemanummer.OMSORGSOVERTAKELSE] ?? [];

    return fjernSendSenereVedlegg(omsorgsovertakelseVedlegg);
};

export const getAleneOmOmsorgVedlegg = (vedlegg: VedleggDataType) => {
    const aleneOmOmsorgVedlegg = vedlegg[Skjemanummer.DOK_AV_ALENEOMSORG] ?? [];

    return fjernSendSenereVedlegg(aleneOmOmsorgVedlegg);
};

export const getTerminbekreftelseVedlegg = (vedlegg: VedleggDataType) => {
    const terminbekreftelseVedlegg = vedlegg[Skjemanummer.TERMINBEKREFTELSE] ?? [];

    return fjernSendSenereVedlegg(terminbekreftelseVedlegg);
};

export const getMilitærEllerSiviltjenesteVedlegg = (vedlegg: VedleggDataType) => {
    const militærEllerSiviltjenesteVedlegg = vedlegg[Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE] ?? [];

    return fjernSendSenereVedlegg(militærEllerSiviltjenesteVedlegg);
};

export const getEtterlønnEllerSluttvederlagVedlegg = (vedlegg: VedleggDataType) => {
    const etterlønnEllerSluttvederlagVedlegg = vedlegg[Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG] ?? [];

    return fjernSendSenereVedlegg(etterlønnEllerSluttvederlagVedlegg);
};

export const getMorInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const morInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_MOR] ?? [];

    return fjernSendSenereVedlegg(morInnlagtVedlegg);
};

export const getMorForSykVedlegg = (vedlegg: VedleggDataType) => {
    const morForSykVedlegg = vedlegg[Skjemanummer.DOK_SYKDOM_MOR] ?? [];

    return fjernSendSenereVedlegg(morForSykVedlegg);
};

export const getFarInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const farInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_FAR] ?? [];

    return fjernSendSenereVedlegg(farInnlagtVedlegg);
};

export const getFarForSykVedlegg = (vedlegg: VedleggDataType) => {
    const farForSykVedlegg = vedlegg[Skjemanummer.DOK_SYKDOM_FAR] ?? [];

    return fjernSendSenereVedlegg(farForSykVedlegg);
};

export const getBarnInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const barnInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_BARN] ?? [];

    return fjernSendSenereVedlegg(barnInnlagtVedlegg);
};

export const getMorStudererVedlegg = (vedlegg: VedleggDataType) => {
    const morStudererVedlegg = vedlegg[Skjemanummer.DOK_UTDANNING_MOR] ?? [];

    return fjernSendSenereVedlegg(morStudererVedlegg);
};

export const getMorJobberVedlegg = (vedlegg: VedleggDataType) => {
    const morJobberVedlegg = vedlegg[Skjemanummer.DOK_ARBEID_MOR] ?? [];

    return fjernSendSenereVedlegg(morJobberVedlegg);
};

export const getMorJobberOgStudererVedlegg = (vedlegg: VedleggDataType) => {
    const morJobberOgStudererVedlegg = vedlegg[Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR] ?? [];

    return fjernSendSenereVedlegg(morJobberOgStudererVedlegg);
};

export const getMorIntroprogramVedlegg = (vedlegg: VedleggDataType) => {
    const morIntroprogramVedlegg = vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET] ?? [];

    return fjernSendSenereVedlegg(morIntroprogramVedlegg);
};

export const getMorKvalprogramVedlegg = (vedlegg: VedleggDataType) => {
    const morKvalprogramVedlegg = vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM] ?? [];

    return fjernSendSenereVedlegg(morKvalprogramVedlegg);
};

const isSendSenereVedlegg = (attachment: Attachment) => {
    return attachment.innsendingsType === 'SEND_SENERE';
};

const fjernSendSenereVedlegg = (attachments: Attachment[]) => {
    return attachments.filter((a) => !isSendSenereVedlegg(a));
};

import { VedleggDataType } from 'types/VedleggDataType';

import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan';

export const isPeriodeMedMorInnleggelse = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsedato: string,
) => {
    return (
        isOverføringMorInnlagt(periode) ||
        isUttakAvFedrekvoteMorForSyk(periode, familiehendelsedato) ||
        isFellesperiodeMorInnlagt(periode) ||
        isForeldrepengerMedAktivitetskravMorInnlagt(periode) ||
        isUtsettelseMorInnlagt(periode) ||
        isPeriodeUtenUttakMorInnlagt(periode)
    );
};

export const isUtsettelseBarnInnlagt = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return Uttaksperioden.erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'BARN_INNLAGT';
};

const isPeriodeUtenUttakMorInnlagt = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.utsettelseÅrsak === 'FRI' &&
        periode.morsAktivitet === 'INNLAGT'
    );
};

const isUtsettelseMorInnlagt = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return Uttaksperioden.erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'SØKER_INNLAGT';
};

const isForeldrepengerMedAktivitetskravMorInnlagt = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.kontoType === 'FORELDREPENGER' &&
        periode.morsAktivitet === 'INNLAGT'
    );
};

export const isPeriodeMedFarInnleggelse = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' &&
        periode.forelder === 'MOR'
    );
};

const isOverføringMorInnlagt = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.overføringÅrsak &&
        periode.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' &&
        periode.forelder === 'FAR_MEDMOR'
    );
};

const isFellesperiodeMorInnlagt = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.kontoType === 'FELLESPERIODE' &&
        periode.morsAktivitet === 'INNLAGT'
    );
};

export const isOverføringFarForSyk = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.forelder === 'MOR' &&
        periode.overføringÅrsak === 'SYKDOM_ANNEN_FORELDER'
    );
};

const isUttakAvFedrekvoteMorForSyk = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsedato: string,
): boolean => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.kontoType === 'FEDREKVOTE' &&
        !periode.samtidigUttak &&
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode,
            familiehendelsedato,
            undefined,
        )
    );
};

export const isPeriodeMedMorForSyk = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        isFellesperiodeMorForSyk(periode) ||
        isUtsettelseMorForSyk(periode) ||
        isOverføringMorForSyk(periode) ||
        isForeldrepengerMedAktivitetskravMorForSyk(periode) ||
        isPeriodeUtenUttakMorForSyk(periode)
    );
};

const isFellesperiodeMorForSyk = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.kontoType === 'FELLESPERIODE' &&
        periode.morsAktivitet === 'TRENGER_HJELP'
    );
};

export const isPeriodeMedMorJobber = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return isMorJobber(periode) || isPeriodeUtenUttakMorJobber(periode);
};

const isMorJobber = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.morsAktivitet === 'ARBEID'
    );
};

const isPeriodeUtenUttakMorJobber = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.utsettelseÅrsak === 'FRI' &&
        periode.morsAktivitet === 'ARBEID'
    );
};

const isForeldrepengerMedAktivitetskravMorForSyk = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.kontoType === 'FORELDREPENGER' &&
        periode.morsAktivitet === 'TRENGER_HJELP'
    );
};

const isPeriodeUtenUttakMorForSyk = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.utsettelseÅrsak === 'FRI' &&
        periode.morsAktivitet === 'TRENGER_HJELP'
    );
};

const isOverføringMorForSyk = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.forelder === 'FAR_MEDMOR' &&
        periode.overføringÅrsak === 'SYKDOM_ANNEN_FORELDER'
    );
};

const isUtsettelseMorForSyk = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return Uttaksperioden.erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'SØKER_SYKDOM';
};

export const isPeriodeMedMorIntroprogram = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return isMorIntroprogram(periode) || isPeriodeUtenUttakMorIntroprogram(periode);
};

const isMorIntroprogram = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.morsAktivitet === 'INTROPROG'
    );
};

const isPeriodeUtenUttakMorIntroprogram = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.utsettelseÅrsak === 'FRI' &&
        periode.morsAktivitet === 'INTROPROG'
    );
};

export const isPeriodeMedMorJobberOgStuderer = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return isMorJobberOgStuderer(periode) || isPeriodeUtenUttakMorJobberOgStuderer(periode);
};

const isPeriodeUtenUttakMorJobberOgStuderer = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.morsAktivitet === 'ARBEID_OG_UTDANNING' &&
        periode.utsettelseÅrsak === 'FRI'
    );
};

const isMorJobberOgStuderer = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.morsAktivitet === 'ARBEID_OG_UTDANNING'
    );
};

export const isPeriodeMedMorKvalprogram = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return isMorKvalprogram(periode) || isPeriodeUtenUttakMorKvalprogram(periode);
};

const isMorKvalprogram = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.morsAktivitet === 'KVALPROG'
    );
};

const isPeriodeUtenUttakMorKvalprogram = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.utsettelseÅrsak === 'FRI' &&
        periode.morsAktivitet === 'KVALPROG'
    );
};

export const isPeriodeMedMorStuderer = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return isMorStuderer(periode) || isPeriodeUtenUttakMorStuderer(periode);
};

const isPeriodeUtenUttakMorStuderer = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.utsettelseÅrsak === 'FRI' &&
        periode.morsAktivitet === 'UTDANNING'
    );
};

const isMorStuderer = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        Uttaksperioden.erUttaksperiode(periode) &&
        periode.morsAktivitet === 'UTDANNING'
    );
};

export const getOmsorgsovertakelseVedlegg = (vedlegg: VedleggDataType) => {
    const omsorgsovertakelseVedlegg = vedlegg[Skjemanummer.OMSORGSOVERTAKELSE]
        ? vedlegg[Skjemanummer.OMSORGSOVERTAKELSE]
        : [];

    return fjernSendSenereVedlegg(omsorgsovertakelseVedlegg);
};

export const getAleneOmOmsorgVedlegg = (vedlegg: VedleggDataType) => {
    const aleneOmOmsorgVedlegg = vedlegg[Skjemanummer.DOK_AV_ALENEOMSORG]
        ? vedlegg[Skjemanummer.DOK_AV_ALENEOMSORG]
        : [];

    return fjernSendSenereVedlegg(aleneOmOmsorgVedlegg);
};

export const getTerminbekreftelseVedlegg = (vedlegg: VedleggDataType) => {
    const terminbekreftelseVedlegg = vedlegg[Skjemanummer.TERMINBEKREFTELSE]
        ? vedlegg[Skjemanummer.TERMINBEKREFTELSE]
        : [];

    return fjernSendSenereVedlegg(terminbekreftelseVedlegg);
};

export const getMilitærEllerSiviltjenesteVedlegg = (vedlegg: VedleggDataType) => {
    const militærEllerSiviltjenesteVedlegg = vedlegg[Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]
        ? vedlegg[Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]
        : [];

    return fjernSendSenereVedlegg(militærEllerSiviltjenesteVedlegg);
};

export const getEtterlønnEllerSluttvederlagVedlegg = (vedlegg: VedleggDataType) => {
    const etterlønnEllerSluttvederlagVedlegg = vedlegg[Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]
        ? vedlegg[Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]
        : [];

    return fjernSendSenereVedlegg(etterlønnEllerSluttvederlagVedlegg);
};

export const getMorInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const morInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_MOR]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE_MOR]
        : [];

    return fjernSendSenereVedlegg(morInnlagtVedlegg);
};

export const getMorForSykVedlegg = (vedlegg: VedleggDataType) => {
    const morForSykVedlegg = vedlegg[Skjemanummer.DOK_SYKDOM_MOR] ? vedlegg[Skjemanummer.DOK_SYKDOM_MOR] : [];

    return fjernSendSenereVedlegg(morForSykVedlegg);
};

export const getFarInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const farInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_FAR]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE_FAR]
        : [];

    return fjernSendSenereVedlegg(farInnlagtVedlegg);
};

export const getFarForSykVedlegg = (vedlegg: VedleggDataType) => {
    const farForSykVedlegg = vedlegg[Skjemanummer.DOK_SYKDOM_FAR] ? vedlegg[Skjemanummer.DOK_SYKDOM_FAR] : [];

    return fjernSendSenereVedlegg(farForSykVedlegg);
};

export const getBarnInnlagtVedlegg = (vedlegg: VedleggDataType) => {
    const barnInnlagtVedlegg = vedlegg[Skjemanummer.DOK_INNLEGGELSE_BARN]
        ? vedlegg[Skjemanummer.DOK_INNLEGGELSE_BARN]
        : [];

    return fjernSendSenereVedlegg(barnInnlagtVedlegg);
};

export const getMorStudererVedlegg = (vedlegg: VedleggDataType) => {
    const morStudererVedlegg = vedlegg[Skjemanummer.DOK_UTDANNING_MOR] ? vedlegg[Skjemanummer.DOK_UTDANNING_MOR] : [];

    return fjernSendSenereVedlegg(morStudererVedlegg);
};

export const getMorJobberVedlegg = (vedlegg: VedleggDataType) => {
    const morJobberVedlegg = vedlegg[Skjemanummer.DOK_ARBEID_MOR] ? vedlegg[Skjemanummer.DOK_ARBEID_MOR] : [];

    return fjernSendSenereVedlegg(morJobberVedlegg);
};

export const getMorJobberOgStudererVedlegg = (vedlegg: VedleggDataType) => {
    const morJobberOgStudererVedlegg = vedlegg[Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]
        ? vedlegg[Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]
        : [];

    return fjernSendSenereVedlegg(morJobberOgStudererVedlegg);
};

export const getMorIntroprogramVedlegg = (vedlegg: VedleggDataType) => {
    const morIntroprogramVedlegg = vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]
        ? vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]
        : [];

    return fjernSendSenereVedlegg(morIntroprogramVedlegg);
};

export const getMorKvalprogramVedlegg = (vedlegg: VedleggDataType) => {
    const morKvalprogramVedlegg = vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]
        ? vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]
        : [];

    return fjernSendSenereVedlegg(morKvalprogramVedlegg);
};

const isSendSenereVedlegg = (attachment: Attachment) => {
    return attachment.innsendingsType === 'SEND_SENERE';
};

const fjernSendSenereVedlegg = (attachments: Attachment[]) => {
    return attachments.filter((a) => !isSendSenereVedlegg(a));
};

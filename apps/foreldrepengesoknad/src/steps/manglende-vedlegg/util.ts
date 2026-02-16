import { VedleggDataType } from 'types/VedleggDataType';
import { erIkkeEøsPeriode, erUttaksperiode } from 'utils/uttaksplanInfoUtils';

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
    isUtsettelseMorForSyk,
    isUtsettelseMorInnlagt,
    isUttakAvFedrekvoteMorForSyk,
} from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { erEøsUttakPeriode } from '@navikt/fp-uttaksplan-ny/src/types/UttaksplanPeriode';
import { erPeriodeIMellomToUkerFørFamdatoOgSeksUkerEtter } from '@navikt/fp-uttaksplan-ny/src/utils/periodeUtils';

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

export const isPeriodeMedMorInnleggelseNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsedato: string,
) => {
    return (
        isOverføringMorInnlagtNy(periode) ||
        isUttakAvFedrekvoteMorForSykNy(periode, familiehendelsedato) ||
        isFellesperiodeMorInnlagtNy(periode) ||
        isForeldrepengerMedAktivitetskravMorInnlagtNy(periode) ||
        isUtsettelseMorInnlagtNy(periode) ||
        isPeriodeUtenUttakMorInnlagtNy(periode)
    );
};

export const isUtsettelseBarnInnlagtNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'BARN_INNLAGT';
};

const isPeriodeUtenUttakMorInnlagtNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet === 'INNLAGT';
};

const isUtsettelseMorInnlagtNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'SØKER_INNLAGT';
};

const isForeldrepengerMedAktivitetskravMorInnlagtNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return (
        erIkkeEøsPeriode(periode) &&
        erUttaksperiode(periode) &&
        periode.kontoType === 'FORELDREPENGER' &&
        periode.morsAktivitet === 'INNLAGT'
    );
};

export const isPeriodeMedFarInnleggelseNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return (
        erIkkeEøsPeriode(periode) &&
        periode.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' &&
        periode.forelder === 'MOR'
    );
};

const isOverføringMorInnlagtNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        erIkkeEøsPeriode(periode) &&
        periode.overføringÅrsak &&
        periode.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' &&
        periode.forelder === 'FAR_MEDMOR'
    );
};

const isFellesperiodeMorInnlagtNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        erIkkeEøsPeriode(periode) &&
        erUttaksperiode(periode) &&
        periode.kontoType === 'FELLESPERIODE' &&
        periode.morsAktivitet === 'INNLAGT'
    );
};

export const isOverføringFarForSykNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        erIkkeEøsPeriode(periode) && periode.forelder === 'MOR' && periode.overføringÅrsak === 'SYKDOM_ANNEN_FORELDER'
    );
};

const isUttakAvFedrekvoteMorForSykNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsedato: string,
): boolean => {
    return (
        !erEøsUttakPeriode(periode) &&
        erUttaksperiode(periode) &&
        periode.kontoType === 'FEDREKVOTE' &&
        !periode.samtidigUttak &&
        erPeriodeIMellomToUkerFørFamdatoOgSeksUkerEtter(periode, familiehendelsedato)
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

export const isPeriodeMedMorForSykNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        isFellesperiodeMorForSykNy(periode) ||
        isUtsettelseMorForSykNy(periode) ||
        isOverføringMorForSykNy(periode) ||
        isForeldrepengerMedAktivitetskravMorForSykNy(periode) ||
        isPeriodeUtenUttakMorForSykNy(periode)
    );
};

const isFellesperiodeMorForSykNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        erIkkeEøsPeriode(periode) &&
        erUttaksperiode(periode) &&
        periode.kontoType === 'FELLESPERIODE' &&
        periode.morsAktivitet === 'TRENGER_HJELP'
    );
};

export const isPeriodeMedMorJobberNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return isMorJobberNy(periode) || isPeriodeUtenUttakMorJobberNy(periode);
};

const isMorJobberNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && erUttaksperiode(periode) && periode.morsAktivitet === 'ARBEID';
};

const isPeriodeUtenUttakMorJobberNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet === 'ARBEID';
};

const isForeldrepengerMedAktivitetskravMorForSykNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return (
        erIkkeEøsPeriode(periode) &&
        erUttaksperiode(periode) &&
        periode.kontoType === 'FORELDREPENGER' &&
        periode.morsAktivitet === 'TRENGER_HJELP'
    );
};

const isPeriodeUtenUttakMorForSykNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet === 'TRENGER_HJELP';
};

const isOverføringMorForSykNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return (
        erIkkeEøsPeriode(periode) &&
        periode.forelder === 'FAR_MEDMOR' &&
        periode.overføringÅrsak === 'SYKDOM_ANNEN_FORELDER'
    );
};

const isUtsettelseMorForSykNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'SØKER_SYKDOM';
};

export const isPeriodeMedMorIntroprogramNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return isMorIntroprogramNy(periode) || isPeriodeUtenUttakMorIntroprogramNy(periode);
};

const isMorIntroprogramNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && erUttaksperiode(periode) && periode.morsAktivitet === 'INTROPROG';
};

const isPeriodeUtenUttakMorIntroprogramNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet === 'INTROPROG';
};

export const isPeriodeMedMorJobberOgStudererNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return isMorJobberOgStudererNy(periode) || isPeriodeUtenUttakMorJobberOgStudererNy(periode);
};

const isPeriodeUtenUttakMorJobberOgStudererNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return (
        erIkkeEøsPeriode(periode) &&
        periode.morsAktivitet === 'ARBEID_OG_UTDANNING' &&
        periode.utsettelseÅrsak === 'FRI'
    );
};

const isMorJobberOgStudererNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && erUttaksperiode(periode) && periode.morsAktivitet === 'ARBEID_OG_UTDANNING';
};

export const isPeriodeMedMorKvalprogramNy = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    return isMorKvalprogramNy(periode) || isPeriodeUtenUttakMorKvalprogramNy(periode);
};

const isMorKvalprogramNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && erUttaksperiode(periode) && periode.morsAktivitet === 'KVALPROG';
};

const isPeriodeUtenUttakMorKvalprogramNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet === 'KVALPROG';
};

export const isPeriodeMedFarInnleggelse = (periode: Periode) => {
    return isOverføringFarInnlagt(periode);
};

export const isPeriodeMedFarForSyk = (periode: Periode) => {
    return isOverføringFarForSyk(periode);
};

export const isPeriodeMedMorStuderer = (periode: Periode) => {
    return isMorStuderer(periode) || isPeriodeUtenUttakMorStuderer(periode);
};

export const isPeriodeMedMorStudererNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return isMorStudererNy(periode) || isPeriodeUtenUttakMorStudererNy(periode);
};

const isPeriodeUtenUttakMorStudererNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet === 'UTDANNING';
};

const isMorStudererNy = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
    return erIkkeEøsPeriode(periode) && erUttaksperiode(periode) && periode.morsAktivitet === 'UTDANNING';
};

export const isPeriodeMedMorJobber = (periode: Periode) => {
    return isMorJobber(periode) || isPeriodeUtenUttakMorJobber(periode);
};

export const isPeriodeMedMorJobberOgStuderer = (periode: Periode) => {
    return isMorJobberOgStuderer(periode) || isPeriodeUtenUttakMorJobberOgStuderer(periode);
};

export const isPeriodeMedMorKvalprogram = (periode: Periode) => {
    return isMorKvalprogram(periode) || isPeriodeUtenUttakMorKvalprogram(periode);
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

export const isPeriodeMedMorIntroprogram = (periode: Periode) => {
    return isMorIntroprogram(periode) || isPeriodeUtenUttakMorIntroprogram(periode);
};

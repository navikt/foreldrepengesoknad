import {
    AnnenForelder,
    MissingAttachment,
    Overføringsperiode,
    Periode,
    PeriodeUtenUttakUtsettelse,
    Periodetype,
    Søknadsinfo,
    Utsettelsesperiode,
    Uttaksperiode,
    isOverføringsperiode,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import { aktivitetskravMorUtil, getMorsAktivitetSkjemanummer } from './morsAktivitetUtils';
import { erÅrsakSykdomEllerInstitusjonsopphold } from './periodeUtils';
import { aktivitetskravMorSkalBesvares } from './uttaksskjema/aktivitetskravMorSkalBesvares';

const createMissingAttachment = (
    index: number,
    skjemanummer: Skjemanummer,
    type: AttachmentType,
    periodeId?: string,
): MissingAttachment => {
    return {
        index,
        skjemanummer,
        type,
        periodeId,
    };
};

export const shouldPeriodeHaveAttachment = (
    periode: Periode,
    søkerErFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
): boolean => {
    switch (periode.type) {
        case Periodetype.Overføring:
            return dokumentasjonBehøvesForOverføringsperiode(søkerErFarEllerMedmor, periode);
        case Periodetype.Utsettelse:
            return dokumentasjonBehøvesForUtsettelsesperiode(
                periode,
                aktivitetskravMorUtil.skalBesvaresVedUtsettelse(søkerErFarEllerMedmor, annenForelder),
            );
        case Periodetype.Uttak:
            return dokumentasjonBehøvesForUttaksperiode(periode);
        default:
            return false;
    }
};

export const hasPeriodeMissingAttachment = (periode: Periode, søknadsinfo: Søknadsinfo): boolean => {
    const shouldHave = shouldPeriodeHaveAttachment(
        periode,
        søknadsinfo.søkerErFarEllerMedmor,
        søknadsinfo.annenForelder,
    );

    return shouldHave;
};

export const findMissingAttachmentsForPerioder = (søknadsinfo: Søknadsinfo): MissingAttachment[] => {
    const perioder = søknadsinfo.perioderSomSkalSendesInn;
    if (!perioder) {
        return [];
    }
    const missingAttachments: MissingAttachment[] = [];
    for (const periode of perioder) {
        if (hasPeriodeMissingAttachment(periode, søknadsinfo)) {
            const index = perioder.indexOf(periode);
            if (
                (isUtsettelsesperiode(periode) || isUttaksperiode(periode)) &&
                missingAttachmentForAktivitetskrav(periode, søknadsinfo)
            ) {
                missingAttachments.push(
                    createMissingAttachment(
                        index,
                        getMorsAktivitetSkjemanummer(periode.morsAktivitetIPerioden),
                        AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                        periode.id,
                    ),
                );
            } else {
                if (isUtsettelsesperiode(periode)) {
                    if (periode.årsak === 'HV_OVELSE') {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.HV_ØVELSE,
                                AttachmentType.HV_ØVELSE,
                                periode.id,
                            ),
                        );
                    }

                    if (
                        periode.årsak === 'FRI' &&
                        søknadsinfo.søkerErFarEllerMedmor &&
                        !søknadsinfo.morErUfør &&
                        !søknadsinfo.morHarRett
                    ) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_ARBEID_MOR,
                                AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                                periode.id,
                            ),
                        );
                    }

                    if (periode.årsak === 'NAV_TILTAK') {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.NAV_TILTAK,
                                AttachmentType.NAV_TILTAK,
                                periode.id,
                            ),
                        );
                    }

                    if (periode.årsak === 'INSTITUSJONSOPPHOLD_BARNET') {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_INNLEGGELSE_BARN,
                                AttachmentType.UTSETTELSE_SYKDOM,
                                periode.id,
                            ),
                        );
                    }

                    if (periode.årsak === 'INSTITUSJONSOPPHOLD_SØKER') {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_INNLEGGELSE_MOR,
                                AttachmentType.UTSETTELSE_SYKDOM,
                                periode.id,
                            ),
                        );
                    }

                    if (periode.årsak === 'SYKDOM') {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_OVERFØRING_FOR_SYK,
                                AttachmentType.UTSETTELSE_SYKDOM,
                                periode.id,
                            ),
                        );
                    }
                }

                if (isOverføringsperiode(periode)) {
                    if (
                        periode.årsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' ||
                        periode.årsak === 'SYKDOM_ANNEN_FORELDER'
                    ) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_OVERFØRING_FOR_SYK,
                                AttachmentType.OVERFØRING_KVOTE,
                                periode.id,
                            ),
                        );
                    }
                }

                if (isUttaksperiode(periode)) {
                    if (periode.konto === 'FEDREKVOTE' && periode.erMorForSyk === true) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_ARBEID_MOR,
                                AttachmentType.UTSETTELSE_SYKDOM,
                                periode.id,
                            ),
                        );
                    }
                }
            }
        }
    }
    return missingAttachments;
};

const dokumentasjonBehøvesForUttaksperiode = (periode: Uttaksperiode): boolean => {
    if (periode.harIkkeAktivitetskrav) {
        return false;
    }

    return (
        (periode.morsAktivitetIPerioden !== undefined && periode.morsAktivitetIPerioden !== 'UFØRE') ||
        (periode.konto === 'FEDREKVOTE' && periode.erMorForSyk === true)
    );
};

const dokumentasjonBehøvesForUtsettelsesperiode = (
    { årsak }: Utsettelsesperiode | PeriodeUtenUttakUtsettelse,
    harMorAktivitetskrav: boolean,
): boolean => {
    return (
        harMorAktivitetskrav ||
        erÅrsakSykdomEllerInstitusjonsopphold(årsak) ||
        årsak === 'HV_OVELSE' ||
        årsak === 'NAV_TILTAK'
    );
};

export const dokumentasjonBehøvesForOverføringsperiode = (
    erFarEllerMedmor: boolean,
    periode: Overføringsperiode,
): boolean => (erFarEllerMedmor || periode.årsak !== 'ALENEOMSORG') && periode.årsak !== 'IKKE_RETT_ANNEN_FORELDER';

const missingAttachmentForAktivitetskrav = (
    periode: Utsettelsesperiode | Uttaksperiode,
    søknadsinfo: Søknadsinfo,
): boolean => {
    const søkerErMor = !søknadsinfo.søkerErFarEllerMedmor;
    const ønskerFlerBarnsdager = isUttaksperiode(periode) ? periode.ønskerFlerbarnsdager : undefined;
    const erSamtidigUttak = isUttaksperiode(periode) ? periode.ønskerSamtidigUttak : undefined;
    const morErForSyk = isUttaksperiode(periode) ? periode.erMorForSyk : undefined;
    const konto = isUttaksperiode(periode) ? periode.konto : undefined;
    return aktivitetskravMorSkalBesvares(
        ønskerFlerBarnsdager,
        erSamtidigUttak,
        morErForSyk,
        periode.type,
        konto,
        søkerErMor,
        søknadsinfo.søkerErAleneOmOmsorg,
        søknadsinfo.annenForelder.kanIkkeOppgis,
        søknadsinfo.søkerHarMidlertidigOmsorg,
        periode.tidsperiode,
        søknadsinfo.familiehendelsesdato,
        søknadsinfo.termindato,
        søknadsinfo.søkersituasjon.situasjon,
        søknadsinfo.stønadskontoer.kontoer,
        !søknadsinfo.morHarRett,
    );
};

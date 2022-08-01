import AnnenForelder from 'app/context/types/AnnenForelder';
import { Attachment, InnsendingsType } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { MissingAttachment } from 'app/types/MissingAttachment';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import {
    isOverføringsperiode,
    isUtsettelsesperiode,
    isUttaksperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    PeriodeUtenUttakUtsettelse,
    Utsettelsesperiode,
    Uttaksperiode,
} from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { erÅrsakSykdomEllerInstitusjonsopphold } from 'uttaksplan/utils/periodeUtils';
import { aktivitetskravMorSkalBesvares } from 'uttaksplan/utils/uttaksskjema/aktivitetskravMorSkalBesvares';
import { Søknadsinfo } from 'uttaksplan/validering/utils/types/Søknadsinfo';
import { aktivitetskravMorUtil, getMorsAktivitetSkjemanummer } from './morsAktivitetUtils';

const createMissingAttachment = (
    index: number,
    skjemanummer: Skjemanummer,
    type: AttachmentType,
    periodeId?: string
): MissingAttachment => {
    return {
        index,
        skjemanummer,
        type,
        periodeId,
    };
};

const isAttachmentMissing = (attachments?: Attachment[], type?: AttachmentType): boolean =>
    attachments === undefined ||
    attachments.length === 0 ||
    (type !== undefined && attachments.find((a) => a.type === type) === undefined);

export const shouldPeriodeHaveAttachment = (
    periode: Periode,
    søkerErFarEllerMedmor: boolean,
    annenForelder: AnnenForelder
): boolean => {
    switch (periode.type) {
        case Periodetype.Overføring:
            return dokumentasjonBehøvesForOverføringsperiode(søkerErFarEllerMedmor, periode);
        case Periodetype.Utsettelse:
            return dokumentasjonBehøvesForUtsettelsesperiode(
                periode,
                aktivitetskravMorUtil.skalBesvaresVedUtsettelse(søkerErFarEllerMedmor, annenForelder)
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
        søknadsinfo.annenForelder
    );

    return (
        shouldHave &&
        isAttachmentMissing(periode.vedlegg?.filter((p) => p.innsendingsType !== InnsendingsType.SEND_SENERE))
    );
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
                        periode.id
                    )
                );
            } else {
                if (isUtsettelsesperiode(periode)) {
                    if (periode.årsak === UtsettelseÅrsakType.HvØvelse) {
                        missingAttachments.push(
                            createMissingAttachment(index, Skjemanummer.HV_ØVELSE, AttachmentType.HV_ØVELSE, periode.id)
                        );
                    }

                    if (
                        periode.årsak === UtsettelseÅrsakType.Fri &&
                        søknadsinfo.søkerErFarEllerMedmor &&
                        !søknadsinfo.morErUfør &&
                        !søknadsinfo.morHarRett
                    ) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM,
                                AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                                periode.id
                            )
                        );
                    }

                    if (periode.årsak === UtsettelseÅrsakType.NavTiltak) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.NAV_TILTAK,
                                AttachmentType.NAV_TILTAK,
                                periode.id
                            )
                        );
                    }

                    if (
                        periode.årsak === UtsettelseÅrsakType.InstitusjonSøker ||
                        periode.årsak === UtsettelseÅrsakType.InstitusjonBarnet
                    ) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_INNLEGGELSE,
                                AttachmentType.UTSETTELSE_SYKDOM,
                                periode.id
                            )
                        );
                    }

                    if (periode.årsak === UtsettelseÅrsakType.Sykdom) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_OVERFØRING_FOR_SYK,
                                AttachmentType.UTSETTELSE_SYKDOM,
                                periode.id
                            )
                        );
                    }
                }

                if (isOverføringsperiode(periode)) {
                    if (
                        periode.årsak === OverføringÅrsakType.institusjonsoppholdAnnenForelder ||
                        periode.årsak === OverføringÅrsakType.sykdomAnnenForelder
                    ) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_OVERFØRING_FOR_SYK,
                                AttachmentType.OVERFØRING_KVOTE,
                                periode.id
                            )
                        );
                    }
                }

                if (isUttaksperiode(periode)) {
                    if (periode.konto === StønadskontoType.Fedrekvote && periode.erMorForSyk === true) {
                        missingAttachments.push(
                            createMissingAttachment(
                                index,
                                Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM,
                                AttachmentType.UTSETTELSE_SYKDOM,
                                periode.id
                            )
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
        (periode.morsAktivitetIPerioden !== undefined && periode.morsAktivitetIPerioden !== MorsAktivitet.Uføre) ||
        (periode.konto === StønadskontoType.Fedrekvote && periode.erMorForSyk === true)
    );
};

const dokumentasjonBehøvesForUtsettelsesperiode = (
    { årsak }: Utsettelsesperiode | PeriodeUtenUttakUtsettelse,
    harMorAktivitetskrav: boolean
): boolean => {
    return (
        harMorAktivitetskrav ||
        erÅrsakSykdomEllerInstitusjonsopphold(årsak) ||
        årsak === UtsettelseÅrsakType.HvØvelse ||
        årsak === UtsettelseÅrsakType.NavTiltak
    );
};

export const dokumentasjonBehøvesForOverføringsperiode = (
    erFarEllerMedmor: boolean,
    periode: Overføringsperiode
): boolean =>
    (erFarEllerMedmor || periode.årsak !== OverføringÅrsakType.aleneomsorg) &&
    periode.årsak !== OverføringÅrsakType.ikkeRettAnnenForelder;

const missingAttachmentForAktivitetskrav = (
    periode: Utsettelsesperiode | Uttaksperiode,
    søknadsinfo: Søknadsinfo
): boolean => {
    const søkerErMor = !søknadsinfo.søkerErFarEllerMedmor;
    const ønskerFlerBarnsdager = isUttaksperiode(periode) ? periode.ønskerFlerbarnsdager : undefined;
    const erSamtidigUttak = isUttaksperiode(periode) ? periode.ønskerSamtidigUttak : undefined;
    const morErForSyk = isUttaksperiode(periode) ? periode.erMorForSyk : undefined;
    const konto = isUttaksperiode(periode) ? periode.konto : undefined;
    return (
        aktivitetskravMorSkalBesvares(
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
            søknadsinfo.erFlerbarnssøknad,
            søknadsinfo.termindato,
            søknadsinfo.søkersituasjon.situasjon,
            søknadsinfo.stønadskontoer,
            !søknadsinfo.morHarRett
        ) &&
        isAttachmentMissing(
            periode.vedlegg?.filter((p) => p.innsendingsType !== InnsendingsType.SEND_SENERE),
            AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
        )
    );
};

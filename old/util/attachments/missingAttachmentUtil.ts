import Søknad, { Skjemanummer } from '../../types/søknad/Søknad';
import { ApiState } from '../../redux/reducers/apiReducer';
import {
    AnnenForelderSpørsmålKeys,
    getAnnenForelderStegVisibility,
} from '../../steg/annenForelder/visibility/annenForelderStegVisibility';

import annenInntektVisibility from '../../steg/andreInntekter/annenInntektModal/visibility';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Attachment, InnsendingsType } from 'app/components/storage/attachment/types/Attachment';
import {
    Periode,
    Periodetype,
    isUtsettelsesperiode,
    UtsettelseÅrsakType,
    isUttaksperiode,
    StønadskontoType,
    isOverføringsperiode,
    OverføringÅrsakType,
    // isOverføringsperiode,
    // MorsAktivitet,
} from '../../types/uttaksplan/periodetyper';
import { spørsmålOmVedleggVisible } from '../../steg/barn/relasjonTilBarnAdopsjonSteg/visibility';
import {
    getSkjemanummerForAndreInntekter,
    isAttachmentForAnnenInntekt,
    isAttachmentForBarn,
    isAttachmentForPeriode,
    mapFileToAttachment,
} from 'app/components/storage/attachment/components/util';
import {
    dokumentasjonBehøvesForOverføringsperiode,
    dokumentasjonBehøvesForUtsettelsesperiode,
    dokumentasjonBehøvesForUttaksperiode,
    // erÅrsakSykdomEllerInstitusjonsopphold,
} from '../uttaksplan/utsettelsesperiode';
import { MissingAttachment } from '../../types/MissingAttachment';
import { Søknadsinfo } from 'app/selectors/types';
import { isAdopsjonsbarn } from '../../types/søknad/Barn';
import { getMorsAktivitetSkjemanummer } from '../skjemanummer/morsAktivitetSkjemanummer';
import { aktivitetskravMorSkalBesvares } from 'app/regler/uttak/uttaksskjema/aktivitetskravMorSkalBesvares';
import { skalSøkerLasteOppTerminbekreftelse } from '../validation/steg/barn';
import { Søkerinfo } from 'app/types/søkerinfo';
import aktivitetskravMorUtil from '../domain/aktivitetskravMor';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

const isAttachmentMissing = (attachments?: Attachment[], type?: AttachmentType): boolean =>
    attachments === undefined ||
    attachments.length === 0 ||
    (type !== undefined && attachments.find((a) => a.type === type) === undefined);

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

export const shouldPeriodeHaveAttachment = (periode: Periode, søknadsinfo: Søknadsinfo): boolean => {
    switch (periode.type) {
        case Periodetype.Overføring:
            return dokumentasjonBehøvesForOverføringsperiode(søknadsinfo.søker.erFarEllerMedmor, periode);
        case Periodetype.Utsettelse:
            return dokumentasjonBehøvesForUtsettelsesperiode(
                periode,
                aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
                    søknadsinfo.søker.erFarEllerMedmor,
                    søknadsinfo.annenForelder
                )
            );
        case Periodetype.Uttak:
            return dokumentasjonBehøvesForUttaksperiode(periode);
        default:
            return false;
    }
};

const isTerminbekreftelseMissing = (søknad: Søknad, arbeidsforhold: Arbeidsforhold[]): boolean =>
    skalSøkerLasteOppTerminbekreftelse(søknad, arbeidsforhold) && isAttachmentMissing(søknad.barn.terminbekreftelse);

const isOmsorgsovertakelseMissing = (søknad: Søknad) =>
    spørsmålOmVedleggVisible(søknad.barn, søknad.erEndringssøknad) &&
    isAdopsjonsbarn(søknad.barn, søknad.situasjon) &&
    isAttachmentMissing(søknad.barn.omsorgsovertakelse);

const isDokumentasjonAvAleneomsorgMissing = (søknad: Søknad, søkerinfo: Søkerinfo) => {
    const annenForelderStegVisibility = getAnnenForelderStegVisibility(søknad, søkerinfo);
    const shouldUploadDokumentasjonAvAleneomsorg =
        annenForelderStegVisibility &&
        annenForelderStegVisibility.isVisible(AnnenForelderSpørsmålKeys.datoForAleneomsorg) &&
        søknad.barn.datoForAleneomsorg !== undefined;
    return shouldUploadDokumentasjonAvAleneomsorg && isAttachmentMissing(søknad.barn.dokumentasjonAvAleneomsorg);
};

export const findMissingAttachmentsForBarn = (søknad: Søknad, søkerinfo: Søkerinfo): MissingAttachment[] => {
    const missingAttachments = [];
    if (isTerminbekreftelseMissing(søknad, søkerinfo.arbeidsforhold)) {
        missingAttachments.push({
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
            type: AttachmentType.TERMINBEKREFTELSE,
        });
    }

    if (isOmsorgsovertakelseMissing(søknad)) {
        missingAttachments.push({
            skjemanummer: Skjemanummer.OMSORGSOVERTAKELSESDATO,
            type: AttachmentType.OMSORGSOVERTAKELSE,
        });
    }

    if (isDokumentasjonAvAleneomsorgMissing(søknad, søkerinfo)) {
        missingAttachments.push({
            skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
            type: AttachmentType.ALENEOMSORG,
        });
    }
    return missingAttachments;
};

const missingAttachmentForAktivitetskrav = (periode: Periode, søknadsinfo: Søknadsinfo): boolean => {
    const { søker } = søknadsinfo;

    return (
        aktivitetskravMorSkalBesvares(
            periode,
            søknadsinfo.søker.erMor,
            søknadsinfo.søker.erAleneOmOmsorg,
            søknadsinfo.annenForelder.kanIkkeOppgis,
            søker.harMidlertidigOmsorg
        ) && isAttachmentMissing(periode.vedlegg, AttachmentType.MORS_AKTIVITET_DOKUMENTASJON)
    );
};

// const missingAttachmentForSykdomEllerInstitusjonsopphold = (periode: Periode): boolean => {
//     if (isUtsettelsesperiode(periode)) {
//         return (
//             erÅrsakSykdomEllerInstitusjonsopphold(periode.årsak) &&
//             isAttachmentMissing(periode.vedlegg, AttachmentType.UTSETTELSE_SYKDOM)
//         );
//     }

//     if (isOverføringsperiode(periode)) {
//         return (
//             erÅrsakSykdomEllerInstitusjonsopphold(periode.årsak) &&
//             isAttachmentMissing(periode.vedlegg, AttachmentType.OVERFØRING_KVOTE)
//         );
//     }

//     if (isUttaksperiode(periode)) {
//         if (
//             periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp ||
//             periode.morsAktivitetIPerioden === MorsAktivitet.Innlagt
//         ) {
//             return isAttachmentMissing(periode.vedlegg);
//         }

//         if (periode.erMorForSyk) {
//             return isAttachmentMissing(periode.vedlegg);
//         }
//     }

//     return false;
// };

export const hasPeriodeMissingAttachment = (periode: Periode, søknadsinfo: Søknadsinfo): boolean => {
    const shouldHave = shouldPeriodeHaveAttachment(periode, søknadsinfo);

    return shouldHave && isAttachmentMissing(periode.vedlegg);
};

export const findMissingAttachmentsForPerioder = (
    perioder: Periode[],
    søknadsinfo: Søknadsinfo
): MissingAttachment[] => {
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

export const findMissingAttachmentsForAndreInntekter = (søknad: Søknad): MissingAttachment[] => {
    if (!søknad.søker.andreInntekterSiste10Mnd) {
        return [];
    }

    const missingAttachments = [];
    for (const andreInntekterSiste10MndItem of søknad.søker.andreInntekterSiste10Mnd) {
        const annenInntektVedlegg = annenInntektVisibility.vedlegg(andreInntekterSiste10MndItem);
        if (annenInntektVedlegg && isAttachmentMissing(andreInntekterSiste10MndItem.vedlegg)) {
            missingAttachments.push({
                index: søknad.søker.andreInntekterSiste10Mnd.indexOf(andreInntekterSiste10MndItem),
                skjemanummer: getSkjemanummerForAndreInntekter(andreInntekterSiste10MndItem.type),
                type: AttachmentType.ANNEN_INNTEKT,
            });
        }
    }
    return missingAttachments;
};

export const findMissingAttachments = (
    søknad: Søknad,
    api: ApiState,
    søknadsinfo: Søknadsinfo
): MissingAttachment[] => {
    if (!søknadsinfo || !api.søkerinfo) {
        return [];
    }

    const missingAttachments = [];
    if (!søknadsinfo.søknaden.erEndringssøknad) {
        missingAttachments.push(...findMissingAttachmentsForBarn(søknad, api.søkerinfo));
        missingAttachments.push(...findMissingAttachmentsForAndreInntekter(søknad));
    }
    missingAttachments.push(...findMissingAttachmentsForPerioder(søknad.uttaksplan, søknadsinfo));
    return missingAttachments;
};

export const mapMissingAttachmentsOnSøknad = (missingAttachments: MissingAttachment[], søknad: Søknad): Søknad => {
    missingAttachments.forEach((missingAttachment: MissingAttachment) => {
        const attachment = mapFileToAttachment(
            { name: '', size: '' } as any,
            missingAttachment.type,
            missingAttachment.skjemanummer,
            InnsendingsType.SEND_SENERE
        );

        if (isAttachmentForBarn(attachment.type)) {
            søknad.barn[attachment.type] = [attachment];
        } else if (isAttachmentForAnnenInntekt(attachment.type)) {
            søknad.søker.andreInntekterSiste10Mnd![missingAttachment.index!].vedlegg = [attachment];
        } else if (isAttachmentForPeriode(attachment.type)) {
            søknad.uttaksplan[missingAttachment.index!].vedlegg! =
                Array.isArray(søknad.uttaksplan[missingAttachment.index!].vedlegg) &&
                søknad.uttaksplan[missingAttachment.index!].vedlegg!.length > 0
                    ? søknad.uttaksplan[missingAttachment.index!].vedlegg!.concat(attachment)
                    : [attachment];
        }
    });

    return søknad;
};

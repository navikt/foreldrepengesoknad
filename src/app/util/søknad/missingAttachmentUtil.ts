import { getRelasjonTilBarnFødselVisibility } from '../../connected-components/steg/relasjon-til-barn-fødsel/visibility/relasjonTilBarnFødselVisibility';
import Søknad, { Skjemanummer, SøkerRolle } from '../../types/søknad/Søknad';
import { ApiState } from '../../redux/reducers/apiReducer';
import {
    AnnenForelderSpørsmålKeys,
    getAnnenForelderStegVisibility
} from '../../connected-components/steg/annen-forelder/visibility/annenForelderStegVisibility';

import { module as annenInntektVisibility } from '../../components/selvstendig-næringsdrivende-modal/visibility';
import visibility from '../../components/annen-inntekt-modal/visibility';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment, InnsendingsType } from 'common/storage/attachment/types/Attachment';
import {
    Overføringsperiode,
    Periode,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { getErSøkerFarEllerMedmor } from '../domain/personUtil';
import { spørsmålOmVedleggVisible } from '../../connected-components/steg/relasjon-til-barn-adopsjon/visibility';
import {
    getAttachmentTypeForPeriode,
    getSkjemanummerForAndreInntekter,
    getSkjemanummerForPeriode,
    isAttachmentForAnnenInntekt,
    isAttachmentForBarn,
    isAttachmentForPeriode,
    isAttachmentForSelvstendigNæringsdrivende,
    mapFileToAttachment
} from 'common/storage/attachment/components/util';
import {
    dokumentasjonBehøvesForOverføringsperiode,
    dokumentasjonBehøvesForUtsettelsesperiode,
    dokumentasjonBehøvesForUttaksperiode
} from '../uttaksplan/utsettelsesperiode';

const isAttachmentMissing = (attachments?: Attachment[]) => attachments === undefined || attachments.length === 0;

export interface MissingAttachment {
    index?: number;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
}

export function shouldPeriodeHaveAttachment(periode: Periode, søkerErFarEllerMedmor: boolean): boolean {
    if (periode.type === Periodetype.Overføring) {
        return dokumentasjonBehøvesForOverføringsperiode(søkerErFarEllerMedmor, periode as Overføringsperiode);
    } else if (periode.type === Periodetype.Utsettelse) {
        return dokumentasjonBehøvesForUtsettelsesperiode(periode as Utsettelsesperiode);
    } else if (periode.type === Periodetype.Uttak) {
        return dokumentasjonBehøvesForUttaksperiode(periode as Uttaksperiode);
    } else {
        return (periode as any).årsak === UtsettelseÅrsakType.Sykdom;
    }
}

export const findMissingAttachmentsForBarn = (søknad: Søknad, api: ApiState): MissingAttachment[] => {
    const missingAttachments = [];

    const shouldUploadTerminbekreftelse = getRelasjonTilBarnFødselVisibility(søknad, api).ufødt.terminbekreftelse;
    if (shouldUploadTerminbekreftelse && isAttachmentMissing((søknad.barn as any).terminbekreftelse)) {
        missingAttachments.push({
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
            type: AttachmentType.TERMINBEKREFTELSE
        });
    }

    if (spørsmålOmVedleggVisible(søknad.barn) && isAttachmentMissing((søknad.barn as any).omsorgsovertakelse)) {
        missingAttachments.push({
            skjemanummer: Skjemanummer.OMSORGSOVERTAKELSESDATO,
            type: AttachmentType.OMSORGSOVERTAKELSE
        });
    }

    const annenForelderStegVisibility = getAnnenForelderStegVisibility(søknad, api.søkerinfo!);
    const shouldUploadDokumentasjonAvAleneomsorg =
        annenForelderStegVisibility &&
        annenForelderStegVisibility.isVisible(AnnenForelderSpørsmålKeys.datoForAleneomsorg) &&
        søknad.barn.datoForAleneomsorg !== undefined;
    if (shouldUploadDokumentasjonAvAleneomsorg && isAttachmentMissing(søknad.barn.dokumentasjonAvAleneomsorg)) {
        missingAttachments.push({
            skjemanummer: Skjemanummer.ANNET,
            type: AttachmentType.ALENEOMSORG
        });
    }

    return missingAttachments;
};

export const findMissingAttachmentsForPerioder = (perioder: Periode[], søkerRolle: SøkerRolle): MissingAttachment[] => {
    if (!perioder) {
        return [];
    }

    const missingAttachments = [];
    for (const periode of perioder) {
        if (
            shouldPeriodeHaveAttachment(periode, getErSøkerFarEllerMedmor(søkerRolle)) &&
            isAttachmentMissing(periode.vedlegg)
        ) {
            missingAttachments.push({
                index: perioder.indexOf(periode),
                skjemanummer: getSkjemanummerForPeriode(periode),
                type: getAttachmentTypeForPeriode(periode)
            });
        }
    }
    return missingAttachments;
};

export const findMissingAttachmentsForSelvstendigNæringsdrivende = (søknad: Søknad): MissingAttachment[] => {
    if (!søknad.søker.selvstendigNæringsdrivendeInformasjon) {
        return [];
    }

    const missingAttachments = [];
    for (const selvstendigNæring of søknad.søker.selvstendigNæringsdrivendeInformasjon) {
        const selvstendingNæringsdrivendeVedlegg = annenInntektVisibility.næringRegistrertINorge(selvstendigNæring);
        if (selvstendingNæringsdrivendeVedlegg && isAttachmentMissing(selvstendigNæring.vedlegg)) {
            missingAttachments.push({
                index: søknad.søker.selvstendigNæringsdrivendeInformasjon.indexOf(selvstendigNæring),
                skjemanummer: Skjemanummer.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG,
                type: AttachmentType.SELVSTENDIGNÆRINGSDRIVENDE
            });
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
        const annenInntektVedlegg = visibility.vedlegg(andreInntekterSiste10MndItem);
        if (annenInntektVedlegg && isAttachmentMissing(andreInntekterSiste10MndItem.vedlegg)) {
            missingAttachments.push({
                index: søknad.søker.andreInntekterSiste10Mnd.indexOf(andreInntekterSiste10MndItem),
                skjemanummer: getSkjemanummerForAndreInntekter(andreInntekterSiste10MndItem.type),
                type: AttachmentType.ANNEN_INNTEKT
            });
        }
    }
    return missingAttachments;
};

export const findMissingAttachments = (søknad: Søknad, api: ApiState): MissingAttachment[] => {
    const missingAttachments = [];
    missingAttachments.push(...findMissingAttachmentsForBarn(søknad, api));
    missingAttachments.push(...findMissingAttachmentsForPerioder(søknad.uttaksplan, søknad.søker.rolle));
    missingAttachments.push(...findMissingAttachmentsForSelvstendigNæringsdrivende(søknad));
    missingAttachments.push(...findMissingAttachmentsForAndreInntekter(søknad));
    return missingAttachments;
};

export const mapMissingAttachmentsToSøknad = (missingAttachments: MissingAttachment[], søknad: Søknad): Søknad => {
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
        } else if (isAttachmentForSelvstendigNæringsdrivende(attachment.type)) {
            søknad.søker.selvstendigNæringsdrivendeInformasjon![missingAttachment.index!].vedlegg = [attachment];
        } else if (isAttachmentForPeriode(attachment.type)) {
            søknad.uttaksplan![missingAttachment.index!].vedlegg = [attachment];
        }
    });
    return søknad;
};

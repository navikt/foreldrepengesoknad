import { Søknad } from 'app/context/types/Søknad';
import { Attachment, InnsendingsType } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { MissingAttachment } from 'app/types/MissingAttachment';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Søkerinfo } from 'app/types/Søkerinfo';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Barn, {
    AdoptertAnnetBarn,
    AdoptertBarn,
    isAdoptertAnnetBarn,
    isAdoptertBarn,
    isAdoptertStebarn,
    isUfødtBarn,
} from 'app/context/types/Barn';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import dayjs from 'dayjs';
import { lagSendSenereDokument } from 'app/utils/vedleggUtils';

const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fraDato?: Date): Arbeidsforhold[] => {
    return arbeidsforhold.filter(
        (a) =>
            a.tom === undefined ||
            a.tom === null ||
            (fraDato !== undefined && dayjs(fraDato).isSameOrBefore(a.tom, 'days'))
    );
};

const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fraDato?: Date): boolean => {
    return getAktiveArbeidsforhold(arbeidsforhold, fraDato).length > 0;
};

const skalSøkerLasteOppTerminbekreftelse = (søknad: Søknad, arbeidsforhold: Arbeidsforhold[]): boolean => {
    const { barn } = søknad;
    return isUfødtBarn(barn) && !harAktivtArbeidsforhold(arbeidsforhold, ISOStringToDate(barn.termindato));
};

const spørsmålOmAntallBarnVisible = (barn: Partial<AdoptertBarn>): boolean => {
    return barn.adopsjonsdato !== undefined;
};

const isTerminbekreftelseMissing = (søknad: Søknad, arbeidsforhold: Arbeidsforhold[]): boolean =>
    //FIXME
    skalSøkerLasteOppTerminbekreftelse(
        søknad,
        arbeidsforhold
    ); /*&& isAttachmentMissing(søknad.barn.terminbekreftelse)*/

const spørsmålOmFodselsdatoerVisible = (barn: Partial<AdoptertBarn>): boolean => {
    return spørsmålOmAntallBarnVisible(barn) && barn.antallBarn !== undefined;
};

const spørsmålOmAdoptertIUtlandetVisible = (barn: Partial<AdoptertAnnetBarn>): boolean => {
    return spørsmålOmFodselsdatoerVisible(barn) && fødselsdatoerErFyltUt(barn.fødselsdatoer);
};

const utfyltAdoptertIUtlandet = (barn: Partial<AdoptertAnnetBarn>): boolean => {
    return (
        spørsmålOmAdoptertIUtlandetVisible(barn) &&
        ((barn.adoptertIUtlandet && barn.ankomstdato !== undefined) || barn.adoptertIUtlandet === false)
    );
};

const fødselsdatoerErFyltUt = (fødselsdatoer: string[] | undefined): boolean =>
    fødselsdatoer !== undefined && fødselsdatoer.length > 0;

const spørsmålOmVedleggVisible = (barn: Barn, erEndringssøknad: boolean): boolean => {
    if (erEndringssøknad) {
        return false;
    }
    if (isAdoptertAnnetBarn(barn)) {
        return utfyltAdoptertIUtlandet(barn);
    }
    if (isAdoptertStebarn(barn)) {
        return fødselsdatoerErFyltUt(barn.fødselsdatoer);
    }
    return false;
};

const isAttachmentMissing = (attachments?: Attachment[], type?: AttachmentType): boolean =>
    attachments === undefined ||
    attachments.length === 0 ||
    (type !== undefined && attachments.find((a) => a.type === type) === undefined);

const isOmsorgsovertakelseMissing = (søknad: Søknad) =>
    spørsmålOmVedleggVisible(søknad.barn, søknad.erEndringssøknad) &&
    isAdoptertBarn(søknad.barn) &&
    isAttachmentMissing(søknad.barn.omsorgsovertakelse);

const isDokumentasjonAvAleneomsorgMissing = (søknad: Søknad) => {
    // FIXME (TOR)
    //const annenForelderStegVisibility = getAnnenForelderStegVisibility(søknad, søkerinfo);
    const shouldUploadDokumentasjonAvAleneomsorg = true;
    /*annenForelderStegVisibility.isVisible(AnnenForelderSpørsmålKeys.datoForAleneomsorg) &&*/
    søknad.barn.datoForAleneomsorg !== undefined;
    return shouldUploadDokumentasjonAvAleneomsorg && isAttachmentMissing(søknad.barn.dokumentasjonAvAleneomsorg);
};

export const finnManglendeVedleggForBarn = (søknad: Søknad, søkerinfo: Søkerinfo): MissingAttachment[] => {
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

    if (isDokumentasjonAvAleneomsorgMissing(søknad)) {
        missingAttachments.push({
            skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
            type: AttachmentType.ALENEOMSORG,
        });
    }
    return missingAttachments;
};

const isArrayOfAttachments = (object: any) => {
    return (
        Array.isArray(object) &&
        object[0] !== null &&
        object.some(
            (element) => element && (element.filename || element.innsendingsType === InnsendingsType.SEND_SENERE)
        )
    );
};

const isAttachmentForBarn = (type: AttachmentType) =>
    type === AttachmentType.TERMINBEKREFTELSE ||
    type === AttachmentType.FØDSELSATTEST ||
    type === AttachmentType.OMSORGSOVERTAKELSE ||
    type === AttachmentType.ADOPSJONSVEDTAK ||
    type === AttachmentType.ALENEOMSORG;

export const isAttachmentForPeriode = (type: AttachmentType) =>
    type === AttachmentType.UTSETTELSE_SYKDOM ||
    type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON ||
    type === AttachmentType.HV_ØVELSE ||
    type === AttachmentType.NAV_TILTAK ||
    type === AttachmentType.OVERFØRING_KVOTE;

const isAttachmentForAnnenInntekt = (type: AttachmentType) => type === AttachmentType.ANNEN_INNTEKT;

export const mapManglendeVedleggTilSøknad = (missingAttachments: MissingAttachment[], søknad: Søknad): Søknad => {
    missingAttachments.forEach((missingAttachment: MissingAttachment) => {
        const attachment = lagSendSenereDokument(missingAttachment.type, missingAttachment.skjemanummer);

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

export const finnAlleVedlegg = (
    object: any,
    currentKey?: string,
    previousEntries?: Map<string, Attachment[]>
): Map<string, Attachment[]> => {
    if (object === null || object === undefined) {
        return new Map();
    }

    const path: string = currentKey || 'søknad';
    let foundAttachments = previousEntries || new Map();
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.set(path + '.' + key, Array.from(object[key]));
            } else {
                foundAttachments = finnAlleVedlegg(object[key], path + '.' + key, foundAttachments);
            }
        }
    });
    return foundAttachments;
};

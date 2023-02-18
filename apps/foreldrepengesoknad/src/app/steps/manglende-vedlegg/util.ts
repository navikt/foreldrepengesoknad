import { Attachment, InnsendingsType } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';

const isArrayOfAttachments = (object: any) => {
    return (
        Array.isArray(object) &&
        object[0] !== null &&
        object.some((element) => element && element.innsendingsType === InnsendingsType.SEND_SENERE)
    );
};

export const isAttachmentForPeriode = (type: AttachmentType) =>
    type === AttachmentType.UTSETTELSE_SYKDOM ||
    type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON ||
    type === AttachmentType.HV_ØVELSE ||
    type === AttachmentType.NAV_TILTAK ||
    type === AttachmentType.OVERFØRING_KVOTE;

export const finnSendSenereVedlegg = (
    object: any,
    currentKey?: string,
    previousEntries?: Map<string, Attachment[]>
): Map<string, Attachment> => {
    if (object === null || object === undefined) {
        return new Map();
    }

    const path: string = currentKey || 'søknad';
    let foundAttachments = previousEntries || new Map();
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.set(path + '.' + key, object[key][0]);
            } else {
                foundAttachments = finnSendSenereVedlegg(object[key], path + '.' + key, foundAttachments);
            }
        }
    });
    return foundAttachments;
};

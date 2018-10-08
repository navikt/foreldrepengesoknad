import Søknad from '../../types/søknad/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { isValidTidsperiode } from '../uttaksplan/Tidsperioden';

const isArrayOfAttachments = (object: object) => {
    return Array.isArray(object) && object.some((element) => element.filename);
};

const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
    attachments.filter((a: Attachment) => !isAttachmentWithError(a));

const cleanUpAttachments = (object: object): Attachment[] => {
    const foundAttachments = [] as Attachment[];
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.push(...removeAttachmentsWithUploadError(object[key]));
                object[key] = (object[key] as Attachment[]).map((attachment: Attachment) => attachment.id);
            } else {
                foundAttachments.push(...cleanUpAttachments(object[key]));
            }
        }
    });
    return foundAttachments;
};

export const cleanUpSøknad = (søknad: Søknad): Søknad => {
    søknad.vedlegg = cleanUpAttachments(søknad);
    søknad.uttaksplan = søknad.uttaksplan.filter((periode: Periode) => isValidTidsperiode(periode.tidsperiode));
    return søknad;
};

import Bytes from 'bytes';
import { Attachment, InnsendingsType } from './../types/Attachment';
import { AttachmentType } from './../types/AttachmentType';
import { Skjemanummer } from './../types/Skjemanummer';
import { guid } from './guid';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFilTilVedlegg = (
    file: File,
    type: AttachmentType,
    skjemanummer: Skjemanummer,
    innsendingsType?: InnsendingsType
): Attachment => ({
    id: generateAttachmentId(),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false,
    type,
    skjemanummer,
    innsendingsType,
});

export const bytesString = (bytes: number): string => {
    return Bytes(bytes, {
        unitSeparator: ' ',
        thousandsSeparator: ' ',
        decimalPlaces: 1,
        fixedDecimals: false,
    });
};

export const deleteAttachment = (attachments: Attachment[], deleted: Attachment): Attachment[] => {
    return attachments.filter((att) => att !== deleted);
};

export const isAttachmentWithError = ({ pending, uploaded, filesize }: Attachment) =>
    (pending === false && uploaded === false) || filesize === 0;

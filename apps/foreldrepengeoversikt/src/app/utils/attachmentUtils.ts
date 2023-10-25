import { guid } from '@navikt/fp-common';
import { Attachment, InnsendingsType } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import Bytes from 'bytes';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFilTilVedlegg = (
    file: File,
    type: AttachmentType,
    skjemanummer: Skjemanummer,
    innsendingsType?: InnsendingsType,
): Attachment => ({
    id: generateAttachmentId(),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false,
    isDuplicate: false,
    type,
    skjemanummer,
    innsendingsType,
    get byteHash() {
        if (this._byteHash) {
            return Promise.resolve(this._byteHash);
        }

        return computeHash(this.file).then((hash) => {
            this._byteHash = hash;
            return hash;
        });
    },
});

async function computeHash(file: File) {
    const buffer = await file.arrayBuffer();
    const hashArray = await crypto.subtle.digest('SHA-256', buffer);
    const hash = Array.from(new Uint8Array(hashArray))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return hash;
}

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

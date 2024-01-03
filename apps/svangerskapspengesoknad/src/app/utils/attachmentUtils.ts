import { guid } from '@navikt/fp-common';
import { Attachment, InnsendingsType } from '@navikt/fp-types';
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

export const deleteAttachment = (alleVedlegg: Attachment[], deleted: Attachment): Attachment[] => {
    alleVedlegg = alleVedlegg.filter((att) => att !== deleted);
    return alleVedlegg;
};

export const isAttachmentWithError = ({ pending, uploaded, filesize }: Attachment) =>
    (pending === false && uploaded === false) || filesize === 0;

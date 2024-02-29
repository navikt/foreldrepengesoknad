import Bytes from 'bytes';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString()
        .substring(1);

//TODO Denne ligg sikkert ein annan stad (evt flytt ut)
const guid = (): string => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

export const bytesString = (bytes: number): string => {
    return Bytes(bytes, {
        unitSeparator: ' ',
        thousandsSeparator: ' ',
        decimalPlaces: 1,
        fixedDecimals: false,
    });
};

export const getTotalFileSize = (files: File[]): number => {
    return files.reduce(
        (a, b) =>
            ({
                size: a.size + b.size,
            }) as any,
        { size: 0 },
    ).size;
};

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (file: File, type: AttachmentType, skjemanummer: Skjemanummer): Attachment => {
    return {
        id: generateAttachmentId(), // TODELETE
        file,
        filename: file.name,
        filesize: file.size,
        uploaded: false,
        pending: false,
        type,
        skjemanummer,
    };
};

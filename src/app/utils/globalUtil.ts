import Bytes from 'bytes';
import { Attachment } from 'app/types/Attachment';

export const assertUnreachable = (_x: never): never => {
    throw new Error('This should never happen');
};

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

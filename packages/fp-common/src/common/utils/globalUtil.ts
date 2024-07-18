import Bytes from 'bytes';

import { Attachment } from '@navikt/fp-types';

export const assertUnreachable = (_x: never, message?: string): never => {
    throw new Error(message ?? 'This should never happen.');
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

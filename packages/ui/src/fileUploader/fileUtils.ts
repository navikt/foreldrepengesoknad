import { FileObject } from '@navikt/ds-react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import { FileUploaderAttachment } from './typer/FileUploaderAttachment';

const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString()
        .substring(1);

//TODO Denne ligg sikkert ein annan stad (evt flytt ut)
const guid = (): string => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (
    fileObject: FileObject,
    type: AttachmentType,
    skjemanummer: Skjemanummer,
): FileUploaderAttachment => {
    const file = fileObject.file;
    return {
        attachmentData: {
            id: generateAttachmentId(), //TODO Kan denne slettast?
            file,
            filename: file.name,
            filesize: file.size,
            uploaded: false,
            pending: false,
            type,
            skjemanummer,
        },
        fileObject,
    };
};

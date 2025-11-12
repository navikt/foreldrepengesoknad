import { useIntl } from 'react-intl';

import { FileObject, FileUpload, Heading, VStack } from '@navikt/ds-react';

import { FileUploaderAttachment } from './FileUploaderAttachment';

interface Props {
    headingText: string;
    attachments: FileUploaderAttachment[];
    deleteAttachment: (fileToRemove: FileObject) => void;
    getErrorMessage?: (attachment: FileUploaderAttachment) => string;
}

export const AttachmentList = ({ headingText, attachments, deleteAttachment, getErrorMessage }: Props) => {
    const intl = useIntl();

    return (
        <VStack gap="space-16">
            <Heading level="3" size="xsmall">
                {headingText}
            </Heading>
            <VStack gap="space-12">
                {attachments.map((attachment) => (
                    <FileUpload.Item
                        key={attachment.attachmentData.id}
                        file={attachment.fileObject.file}
                        button={{
                            action: 'delete',
                            onClick: () => deleteAttachment(attachment.fileObject),
                        }}
                        status={attachment.attachmentData.pending ? 'uploading' : 'idle'}
                        translations={{
                            uploading: intl.formatMessage({ id: 'FileInput.Vedlegg.Uploading' }),
                            deleteButtonTitle: intl.formatMessage({
                                id: 'FileInput.Vedlegg.Slett',
                            }),
                        }}
                        error={getErrorMessage ? getErrorMessage(attachment) : undefined}
                    />
                ))}
            </VStack>
        </VStack>
    );
};

import { useIntl } from 'react-intl';

import { FileObject, Heading, UNSAFE_FileUpload, VStack } from '@navikt/ds-react';

import { FileUploaderAttachment } from './typer/FileUploaderAttachment';

export interface Props {
    headingText: string;
    attachments: FileUploaderAttachment[];
    deleteAttachment: (fileToRemove: FileObject) => void;
    getErrorMessage?: (attachment: FileUploaderAttachment) => string;
}

const AttachmentList: React.FunctionComponent<Props> = ({
    headingText,
    attachments,
    deleteAttachment,
    getErrorMessage,
}) => {
    const intl = useIntl();

    return (
        <VStack gap="4">
            <Heading level="3" size="xsmall">
                {headingText}
            </Heading>
            <VStack gap="3">
                {attachments.map((attachment) => (
                    <UNSAFE_FileUpload.Item
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

export default AttachmentList;

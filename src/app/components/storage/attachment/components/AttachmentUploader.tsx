import * as React from 'react';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import AttachmentOverview from 'app/components/storage/attachment/components/AttachmentOverview';
import { Skjemanummer } from '../../../../types/søknad/Søknad';
import AttachmentApi from 'app/components/storage/api/attachmentApi';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    onFilesUploadStart: (attachments: Attachment[]) => void;
    onFileUploadFinish: (attachment: Attachment) => void;
    onFileDelete: (attachment: Attachment) => void;
}

export default class AttachmentsUploader extends React.Component<AttachmentsUploaderProps> {
    constructor(props: AttachmentsUploaderProps) {
        super(props);
        this.onFilesSelect = this.onFilesSelect.bind(this);
        this.onFileDelete = this.onFileDelete.bind(this);
    }

    onFilesSelect(files: Attachment[]) {
        const { onFilesUploadStart, onFileUploadFinish } = this.props;
        files.forEach((file: Attachment) => {
            file.pending = true;
        });
        onFilesUploadStart(files);
        files.forEach((file: Attachment) =>
            AttachmentApi.saveAttachment(file)
                .then((response: any) => {
                    file.pending = false;
                    file.uploaded = true;
                    file.url = response.headers.location;
                    file.uuid = response.data;
                    onFileUploadFinish(file);
                })
                .catch((error) => {
                    file.pending = false;
                    file.uploaded = false;
                    file.error = error;
                    onFileUploadFinish(file);
                })
        );
    }

    onFileDelete(files: Attachment[]) {
        files.forEach((file: Attachment) => {
            this.props.onFileDelete(file);
        });
    }

    render() {
        const { attachments, attachmentType, skjemanummer } = this.props;
        return (
            <AttachmentOverview
                attachments={attachments}
                attachmentType={attachmentType}
                skjemanummer={skjemanummer}
                onFilesSelect={this.onFilesSelect}
                onFileDelete={this.onFileDelete}
            />
        );
    }
}

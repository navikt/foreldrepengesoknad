import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import AttachmentApi from 'common/storage/api/attachmentApi';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Component } from 'react';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    onFilesUploadStart: (attachments: Attachment[]) => void;
    onFileUploadFinish: (attachment: Attachment) => void;
    onFileDeleteStart: (attachment: Attachment) => void;
    onFileDeleteFinish: (attachment: Attachment) => void;
}

export default class AttachmentsUploader extends Component<AttachmentsUploaderProps> {
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
        const { onFileDeleteStart, onFileDeleteFinish } = this.props;
        files.forEach((file: Attachment) => {
            file.pending = true;
            onFileDeleteStart(file);
            AttachmentApi.deleteAttachment(file).then(() => {
                onFileDeleteFinish(file);
            });
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

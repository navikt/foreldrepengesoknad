import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import { AttachmentType } from '../../../../app/types/søknad/Søknad';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
}

export default class AttachmentsUploader extends React.Component<
    AttachmentsUploaderProps
> {
    constructor(props: AttachmentsUploaderProps) {
        super(props);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onFilesSelect = this.onFilesSelect.bind(this);
    }

    onFilesSelect(files: Attachment[]) {
        const { onFilesSelect } = this.props;
        onFilesSelect(files);
    }

    onFileDelete(file: Attachment) {
        const { onFileDelete } = this.props;
        onFileDelete(file);
    }

    render() {
        const { attachments, attachmentType } = this.props;
        return (
            <AttachmentOverview
                attachments={attachments}
                attachmentType={attachmentType}
                onFilesSelect={this.onFilesSelect}
                onFileDelete={this.onFileDelete}
            />
        );
    }
}

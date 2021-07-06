import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import * as React from 'react';

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
        const { onFilesUploadStart } = this.props;
        files.forEach((file: Attachment) => {
            file.pending = true;
        });
        onFilesUploadStart(files);
        // FIXME
        /* files.forEach((file: Attachment) =>
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
        );*/
    }

    onFileDelete(files: Attachment[]) {
        files.forEach((file: Attachment) => {
            this.props.onFileDelete(file);
        });
    }

    render() {
        /*const { attachments, attachmentType, skjemanummer } = this.props;
        return (
            <>
                <AttachmentOverview
                    attachments={attachments}
                    attachmentType={attachmentType}
                    skjemanummer={skjemanummer}
                    onFilesSelect={this.onFilesSelect}
                    onFileDelete={this.onFileDelete}
                />
                <UtvidetInformasjon apneLabel={<FormattedMessage id="psg.åpneLabel" />}>
                    <PictureScanningGuide />
                </UtvidetInformasjon>
            </>
        );*/
        return null;
    }
}

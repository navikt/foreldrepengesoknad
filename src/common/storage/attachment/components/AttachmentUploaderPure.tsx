import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import {
    AttachmentType,
    Skjemanummer
} from '../../../../app/types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
}

type Props = AttachmentsUploaderProps & DispatchProps;
export default class AttachmentsUploaderPure extends React.Component<Props> {
    constructor(props: Props) {
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
        const {
            attachments,
            attachmentType,
            skjemanummer,
            dispatch
        } = this.props;
        return (
            <React.Fragment>
                <AttachmentOverview
                    attachments={attachments}
                    attachmentType={attachmentType}
                    skjemanummer={skjemanummer}
                    onFilesSelect={this.onFilesSelect}
                    onFileDelete={this.onFileDelete}
                    dispatch={dispatch}
                />
            </React.Fragment>
        );
    }
}

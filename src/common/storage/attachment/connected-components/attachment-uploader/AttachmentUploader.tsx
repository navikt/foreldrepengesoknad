import * as React from 'react';
import { connect } from 'react-redux';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import {
    deleteAttachment,
    addAttachments,
    uploadAttachment
} from 'common/storage/attachment/redux/attachmentActionCreators';
import { DispatchProps } from 'common/redux/types/index';
import VedleggOversikt from 'common/components/vedlegg/VedleggOversikt';
import { AttachmentAppState } from '../../redux/attachmentReducer';

export interface OwnProps {
    group: string;
    onAfterFilesSelect?: (attachments: Attachment[]) => void;
    onAfterFileDelete?: (attachment: Attachment) => void;
}

export interface StateProps {
    attachments: Attachment[];
}

export type Props = StateProps & OwnProps & DispatchProps;

export const getGroupedAttachments = (
    attachments: Attachment[],
    group?: string
) => {
    if (!group) {
        return attachments;
    }
    return attachments.filter((a) => a.group === group);
};

class AttachmentsUploader extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onFilesSelect = this.onFilesSelect.bind(this);
        this.uploadNewFiles = this.uploadNewFiles.bind(this);
    }

    onFilesSelect(files: Attachment[]) {
        const { group, dispatch, onAfterFilesSelect } = this.props;
        dispatch(addAttachments(files, group));
        this.uploadNewFiles(files);
        if (onAfterFilesSelect) {
            onAfterFilesSelect(files);
        }
    }

    onFileDelete(file: Attachment) {
        const { dispatch, onAfterFileDelete } = this.props;
        dispatch(deleteAttachment(file));
        if (onAfterFileDelete) {
            onAfterFileDelete(file);
        }
    }

    uploadNewFiles(attachments: Attachment[]) {
        attachments.forEach((attachment) => {
            this.props.dispatch(uploadAttachment(attachment));
        });
    }

    render() {
        const { attachments } = this.props;
        return (
            <VedleggOversikt
                vedlegg={attachments || []}
                onFilesSelect={this.onFilesSelect}
                onFileDelete={this.onFileDelete}
            />
        );
    }
}

const mapStateToProps = (
    state: AttachmentAppState,
    props: OwnProps
): StateProps => ({
    attachments: getGroupedAttachments(state.attachments, props.group)
});

export default connect(mapStateToProps)(AttachmentsUploader);

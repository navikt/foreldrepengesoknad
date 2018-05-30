import * as React from 'react';
import { connect } from 'react-redux';
import { Attachment } from 'storage/attachment/types/Attachment';
import {
    deleteAttachment,
    addAttachments,
    uploadAttachment
} from 'storage/attachment/redux/attachmentActionCreators';
import { DispatchProps } from 'common/redux/types';
import VedleggOversikt from 'common/components/vedlegg/VedleggOversikt';
import { AttachmentAppState } from '../../redux/attachmentReducer';

export interface OwnProps {
    group: string;
    attachments?: Attachment[];
    onChange: (attachment: Attachment[]) => void;
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

    componentWillReceiveProps(nextProps: Props) {
        const curr = getGroupedAttachments(
            this.props.attachments,
            this.props.group
        );
        const next = getGroupedAttachments(
            nextProps.attachments,
            nextProps.group
        );
        if (JSON.stringify(curr) !== JSON.stringify(next)) {
            this.props.onChange(nextProps.attachments);
        }
    }

    onFilesSelect(files: Attachment[]) {
        this.props.dispatch(addAttachments(files, this.props.group));
        this.uploadNewFiles(files);
    }

    onFileDelete(file: Attachment) {
        this.props.dispatch(deleteAttachment(file));
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

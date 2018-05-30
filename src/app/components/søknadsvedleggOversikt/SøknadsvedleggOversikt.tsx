import * as React from 'react';
import { Attachment } from '../../types/Attachment';
import { DispatchProps } from '../../redux/types';
import {
    addAttachments,
    deleteAttachment,
    uploadAttachment
} from '../../redux/actions/attachment/attachmentActionCreators';
import VedleggOversikt from '../vedlegg/VedleggOversikt';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { SøknadsvedleggKey } from '../../types/s\u00F8knad/S\u00F8knadsvedlegg';

export interface OwnProps {
    gruppe: SøknadsvedleggKey;
    vedlegg?: Attachment[];
    onChange: (vedlegg: Attachment[]) => void;
}

export interface StateProps {
    attachments: Attachment[];
}

export type Props = StateProps & OwnProps & DispatchProps;

export const getGruppeAttachments = (
    attachments: Attachment[],
    gruppe?: string
) => {
    if (!gruppe) {
        return attachments;
    }
    return attachments.filter((a) => a.group === gruppe);
};

class SøknadsvedleggOversikt extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onFilesSelect = this.onFilesSelect.bind(this);
        this.uploadNewFiles = this.uploadNewFiles.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        const curr = getGruppeAttachments(
            this.props.attachments,
            this.props.gruppe
        );
        const next = getGruppeAttachments(
            nextProps.attachments,
            nextProps.gruppe
        );
        if (JSON.stringify(curr) !== JSON.stringify(next)) {
            this.props.onChange(nextProps.attachments);
        }
    }

    onFilesSelect(files: Attachment[]) {
        this.props.dispatch(addAttachments(files, this.props.gruppe));
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
        const { vedlegg } = this.props;
        return (
            <VedleggOversikt
                vedlegg={vedlegg || []}
                onFilesSelect={this.onFilesSelect}
                onFileDelete={this.onFileDelete}
            />
        );
    }
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
    attachments: getGruppeAttachments(state.attachments, props.gruppe)
});

export default connect(mapStateToProps)(SøknadsvedleggOversikt);

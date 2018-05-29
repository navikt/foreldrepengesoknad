import * as React from 'react';
import VedleggOversikt from '../../../components/vedlegg/VedleggOversikt';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { Attachment } from '../../../types/Attachment';
import { DispatchProps } from '../../../redux/types';
import {
    deleteAttachment,
    addAttachments,
    uploadAttachment
} from '../../../redux/actions/attachment/attachmentActionCreators';
import { Knapp } from 'nav-frontend-knapper';

export interface StateProps {
    attachments: Attachment[];
}

export type Props = StateProps & DispatchProps;

class VedleggSide extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onFilesSelect = this.onFilesSelect.bind(this);
    }

    onFilesSelect(files: Attachment[]) {
        this.props.dispatch(addAttachments(files));
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
        const newFiles = attachments.filter((a) => a.uploaded === false);
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Vedlegg" />
                <div className="blokk-m">
                    <VedleggOversikt
                        id="adopsjonsvedtak"
                        vedlegg={attachments}
                        onFilesSelect={this.onFilesSelect}
                        onFileDelete={this.onFileDelete}
                    />
                </div>
                {newFiles.length > 0 && (
                    <div className="m-textCenter">
                        <Knapp
                            htmlType="button"
                            onClick={() => this.uploadNewFiles(newFiles)}>
                            Last opp nye filer
                        </Knapp>
                    </div>
                )}
            </Applikasjonsside>
        );
    }
}
const mapStateToProps = (state: AppState): StateProps => {
    return {
        attachments: state.attachments
    };
};

export default connect(mapStateToProps)(VedleggSide);

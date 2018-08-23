import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import VedleggInput from './AttachmentInput';
import AttachmentList from './AttachmentList';
import LabelText from '../../../components/labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from 'common/util/filesize';
import { isAttachmentWithError, mapFileToAttachment } from './util';
import { CSSTransition } from 'react-transition-group';
import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import {
    AttachmentType,
    Skjemanummer
} from '../../../../app/types/søknad/Søknad';
import Block from 'common/components/block/Block';
import AlertstripeWithCloseButton from 'common/components/alertstripe-content/AlertstripeWithCloseButton';

export interface AttachmentOverviewProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    inputId?: string;
    showFileSize?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (file: Attachment) => void;
}

interface State {
    showErrorMessage: boolean;
    failedAttachments: Attachment[];
}

type Props = AttachmentOverviewProps;
class AttachmentOverview extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showErrorMessage: false,
            failedAttachments: []
        };

        this.hideErrorMessage = this.hideErrorMessage.bind(this);
    }

    componentDidUpdate() {
        const attachmentsWithNewErrors = this.props.attachments.filter(
            (a: Attachment) => !this.state.failedAttachments.includes(a)
        );

        if (this.hasFailedAttachments(attachmentsWithNewErrors)) {
            this.setState({
                failedAttachments: this.state.failedAttachments.concat(
                    attachmentsWithNewErrors.filter(isAttachmentWithError)
                )
            });
            this.showErrorMessage();
        }
    }

    hasFailedAttachments(attachments: Attachment[]) {
        return attachments.some(isAttachmentWithError);
    }

    showErrorMessage() {
        this.setState({
            showErrorMessage: true
        });
    }

    hideErrorMessage() {
        this.setState({
            showErrorMessage: false
        });
    }

    render() {
        const {
            inputId = guid(),
            attachments,
            attachmentType,
            skjemanummer,
            showFileSize,
            onFileDelete,
            onFilesSelect
        } = this.props;

        const attachmentsToRender = attachments.filter(
            (a: Attachment) => !isAttachmentWithError(a)
        );
        const showAttachments = attachmentsToRender.length > 0;

        return (
            <React.Fragment>
                <Block
                    margin={
                        showAttachments || this.state.showErrorMessage
                            ? 'xs'
                            : 'none'
                    }>
                    <VedleggInput
                        id={inputId}
                        onFilesSelect={(files: File[]) => {
                            onFilesSelect(
                                files.map((f) =>
                                    mapFileToAttachment(
                                        f,
                                        attachmentType,
                                        skjemanummer
                                    )
                                )
                            );
                        }}
                        onClick={this.hideErrorMessage}
                    />
                </Block>
                <CSSTransition
                    classNames="transitionFade"
                    timeout={150}
                    in={showAttachments || this.state.showErrorMessage}
                    unmountOnExit={true}>
                    <React.Fragment>
                        {(showAttachments || this.state.showErrorMessage) && (
                            <React.Fragment>
                                <Block
                                    margin="xs"
                                    visible={this.state.showErrorMessage}
                                    animated={false}>
                                    <AlertstripeWithCloseButton
                                        alertStripeProps={{
                                            type: 'advarsel',
                                            solid: true,
                                            children: (
                                                <FormattedMessage
                                                    id={'vedlegg.feilmelding'}
                                                />
                                            )
                                        }}
                                        lukknappProps={{
                                            hvit: true,
                                            type: 'button'
                                        }}
                                        onClose={this.hideErrorMessage}
                                    />
                                </Block>
                                <Block margin="xs">
                                    <LabelText>
                                        <FormattedMessage
                                            id="vedlegg.liste.tittel"
                                            values={{
                                                størrelse: bytesString(
                                                    getTotalFileSize(
                                                        attachmentsToRender.map(
                                                            (a: Attachment) =>
                                                                a.file
                                                        )
                                                    )
                                                )
                                            }}
                                        />
                                    </LabelText>
                                </Block>
                                <AttachmentList
                                    attachments={attachmentsToRender}
                                    showFileSize={showFileSize}
                                    onDelete={(file: Attachment) =>
                                        onFileDelete(file)
                                    }
                                />
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </CSSTransition>
            </React.Fragment>
        );
    }
}
export default AttachmentOverview;

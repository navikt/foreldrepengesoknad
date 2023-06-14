import { FormattedMessage } from 'react-intl';

import VedleggInput from './AttachmentInput';
import AttachmentList from './AttachmentList';
import LabelText from '../../../components/labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from 'common/util/filesize';
import { isAttachmentWithError, mapFileToAttachment } from './util';
import { CSSTransition } from 'react-transition-group';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Block from 'common/components/block/Block';
import AlertstripeWithCloseButton from 'common/components/alertstripe-content/AlertstripeWithCloseButton';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { guid } from '@navikt/fp-common';
import { Component, ReactNode } from 'react';

export interface AttachmentOverviewProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    inputId?: string;
    showFileSize?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (files: Attachment[]) => void;
}

interface State {
    errorMessage?: string;
}

type Props = AttachmentOverviewProps;
class AttachmentOverview extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.deleteFailedAttachments = this.deleteFailedAttachments.bind(this);
    }

    createErrorMessagesForFailedAttachments(attachments: Attachment[]): ReactNode[] {
        const errorMessages: ReactNode[] = [];
        const attachmentsWithError = attachments.filter(isAttachmentWithError);
        const multipleErrors = attachmentsWithError.length > 1;

        attachmentsWithError.forEach((a: Attachment) => {
            const error = a.error;
            if (error && error.response !== undefined && error.response.status === 413) {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.forStort.flereFeil' : 'vedlegg.forStort'}
                        values={{ filename: a.filename }}
                    />
                );
            } else {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.feilmelding.flereFeil' : 'vedlegg.feilmelding'}
                        values={{ filename: a.filename }}
                    />
                );
            }
        });
        return errorMessages;
    }

    deleteFailedAttachments(): void {
        this.props.onFileDelete(this.props.attachments.filter(isAttachmentWithError));
    }

    render() {
        const {
            inputId = guid(),
            attachments,
            attachmentType,
            skjemanummer,
            showFileSize,
            onFileDelete,
            onFilesSelect,
        } = this.props;

        const showErrorMessage: boolean = this.props.attachments.some(isAttachmentWithError);
        const attachmentsToRender = attachments.filter((a: Attachment) => !isAttachmentWithError(a));
        const showAttachments = attachmentsToRender.length > 0;

        return (
            <>
                <Block margin={showAttachments || showErrorMessage ? 'xs' : 'none'}>
                    <VedleggInput
                        id={inputId}
                        onFilesSelect={(files: File[]) => {
                            onFilesSelect(files.map((f) => mapFileToAttachment(f, attachmentType, skjemanummer)));
                        }}
                        onClick={this.deleteFailedAttachments}
                        attachmentType={attachmentType}
                    />
                </Block>
                <CSSTransition classNames="transitionFade" timeout={150} in={showErrorMessage} unmountOnExit={true}>
                    <>
                        <Block margin="xs" visible={showErrorMessage} animated={false}>
                            <AlertstripeWithCloseButton
                                errorMessages={this.createErrorMessagesForFailedAttachments(
                                    this.props.attachments.filter(isAttachmentWithError)
                                )}
                                onClose={this.deleteFailedAttachments}
                            />
                        </Block>
                    </>
                </CSSTransition>
                <CSSTransition classNames="transitionFade" timeout={150} in={showAttachments} unmountOnExit={true}>
                    <>
                        {showAttachments && (
                            <>
                                <Block margin="xs">
                                    <LabelText>
                                        <FormattedMessage
                                            id="vedlegg.liste.tittel"
                                            values={{
                                                størrelse: bytesString(
                                                    getTotalFileSize(attachmentsToRender.map((a: Attachment) => a.file))
                                                ),
                                            }}
                                        />
                                    </LabelText>
                                </Block>
                                <AttachmentList
                                    attachments={attachmentsToRender}
                                    showFileSize={showFileSize}
                                    onDelete={(file: Attachment) => onFileDelete([file])}
                                />
                            </>
                        )}
                    </>
                </CSSTransition>
            </>
        );
    }
}
export default AttachmentOverview;

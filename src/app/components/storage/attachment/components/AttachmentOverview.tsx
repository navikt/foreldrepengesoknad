import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import VedleggInput from './AttachmentInput';
import AttachmentList from './AttachmentList';
import LabelText from '../../../../../common/components/labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from 'app/util/filesize';
import { isAttachmentWithError, mapFileToAttachment } from './util';
import { CSSTransition } from 'react-transition-group';
import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { Skjemanummer } from '../../../../types/søknad/Søknad';
import Block from 'common/components/block/Block';
import AlertstripeWithCloseButton from 'common/components/alertstripeWithCloseButton/AlertstripeWithCloseButton';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';

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
class AttachmentOverview extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.deleteFailedAttachments = this.deleteFailedAttachments.bind(this);
    }

    createErrorMessagesForFailedAttachments(attachments: Attachment[]): React.ReactNode[] {
        const errorMessages: React.ReactNode[] = [];
        const attachmentsWithError = attachments.filter(isAttachmentWithError);
        const multipleErrors = attachmentsWithError.length > 1;

        attachmentsWithError.forEach((a: Attachment) => {
            const error = a.error;
            if (a.filesize === 0) {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.tomFil.flereFeil' : 'vedlegg.tomFil'}
                        values={{ filename: a.filename }}
                    />
                );
            } else if (error && error.response !== undefined && error.response.status === 413) {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.forStort.flereFeil' : 'vedlegg.forStort'}
                        values={{ filename: a.filename }}
                    />
                );
            } else if (error && error.response !== undefined && error.response.status === 422) {
                const intlId =
                    error.response.message && error.respnse.message.contains('decrypt')
                        ? 'vedlegg.passordbeskyttet'
                        : 'vedlegg.virus';
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? `${intlId}.flereFeil` : intlId}
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
            onFilesSelect
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
                                lukknappProps={{
                                    hvit: true,
                                    type: 'button'
                                }}
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
                                                )
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

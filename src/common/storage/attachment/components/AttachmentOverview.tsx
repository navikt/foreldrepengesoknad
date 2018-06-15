import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import VedleggInput from './AttachmentInput';
import AttachmentList from './AttachmentList';
import LabelText from '../../../components/labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from 'common/util/filesize';
import { mapFileToAttachment } from './util';
import { CSSTransition } from 'react-transition-group';
import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from '../../../../app/types/søknad/Søknad';

export interface AttachmentOverviewProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    inputId?: string;
    showFileSize?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (file: Attachment) => void;
}

class AttachmentOverview extends React.Component<AttachmentOverviewProps> {
    render() {
        const {
            inputId = guid(),
            attachments,
            attachmentType,
            showFileSize,
            onFileDelete,
            onFilesSelect
        } = this.props;

        const showAttachments = attachments.length > 0;
        return (
            <div>
                <div className={showAttachments ? 'blokk-m' : undefined}>
                    <VedleggInput
                        id={inputId}
                        onFilesSelect={(files: File[]) => {
                            onFilesSelect(
                                files.map((f) =>
                                    mapFileToAttachment(f, attachmentType)
                                )
                            );
                        }}
                    />
                </div>
                <CSSTransition
                    classNames="transitionFade"
                    timeout={150}
                    in={showAttachments}
                    unmountOnExit={true}>
                    <React.Fragment>
                        {showAttachments && (
                            <div>
                                <div className="blokk-xs">
                                    <LabelText>
                                        <FormattedMessage
                                            id="vedlegg.liste.tittel"
                                            values={{
                                                størrelse: bytesString(
                                                    getTotalFileSize(
                                                        attachments.map(
                                                            (v) => v.file
                                                        )
                                                    )
                                                )
                                            }}
                                        />
                                    </LabelText>
                                </div>
                                <AttachmentList
                                    attachments={attachments}
                                    showFileSize={showFileSize}
                                    onDelete={(file: Attachment) =>
                                        onFileDelete(file)
                                    }
                                />
                            </div>
                        )}
                    </React.Fragment>
                </CSSTransition>
            </div>
        );
    }
}
export default AttachmentOverview;

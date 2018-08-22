import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import VedleggInput from './AttachmentInput';
import AttachmentList from './AttachmentList';
import LabelText from '../../../components/labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from 'common/util/filesize';
import { attachmentWithUploadError, mapFileToAttachment } from './util';
import { CSSTransition } from 'react-transition-group';
import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import {
    AttachmentType,
    Skjemanummer
} from '../../../../app/types/søknad/Søknad';
import Block from 'common/components/block/Block';
import AlertStripe from 'nav-frontend-alertstriper';
import { DispatchProps } from 'common/redux/types';
import AlertstripeContent from 'common/components/alertstripe-content/AlertstripeContent';
import getMessage from 'common/util/i18nUtils';
import søknadActionCreators from '../../../../app/redux/actions/søknad/søknadActionCreators';

export interface AttachmentOverviewProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    inputId?: string;
    showFileSize?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (file: Attachment) => void;
}

type Props = AttachmentOverviewProps & DispatchProps & InjectedIntlProps;
class AttachmentOverview extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.removeFailedAttachments = this.removeFailedAttachments.bind(this);
    }

    removeFailedAttachments() {
        this.props.attachments
            .filter(attachmentWithUploadError)
            .forEach((a: Attachment) =>
                this.props.dispatch(søknadActionCreators.deleteAttachment(a))
            );
    }

    componentWillUnmount() {
        this.removeFailedAttachments();
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
            intl
        } = this.props;

        const attachmentWithoutErrors = attachments.filter(
            (a: Attachment) => !attachmentWithUploadError(a)
        );
        const showAttachments = attachmentWithoutErrors.length > 0;
        const hasErrors = attachments.some(attachmentWithUploadError);

        return (
            <div>
                <div
                    className={
                        showAttachments || hasErrors ? 'blokk-xs' : undefined
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
                        onClick={this.removeFailedAttachments}
                    />
                </div>
                <CSSTransition
                    classNames="transitionFade"
                    timeout={150}
                    in={showAttachments || hasErrors}
                    unmountOnExit={true}>
                    <React.Fragment>
                        {(showAttachments || hasErrors) && (
                            <React.Fragment>
                                <Block
                                    margin="xs"
                                    visible={hasErrors}
                                    animated={false}>
                                    <AlertStripe type="advarsel" solid={true}>
                                        <AlertstripeContent
                                            message={getMessage(
                                                intl,
                                                'vedlegg.feilmelding'
                                            )}
                                            onClose={
                                                this.removeFailedAttachments
                                            }
                                        />
                                    </AlertStripe>
                                </Block>

                                <div>
                                    <div className="blokk-xs">
                                        <LabelText>
                                            <FormattedMessage
                                                id="vedlegg.liste.tittel"
                                                values={{
                                                    størrelse: bytesString(
                                                        getTotalFileSize(
                                                            attachmentWithoutErrors.map(
                                                                (v) => v.file
                                                            )
                                                        )
                                                    )
                                                }}
                                            />
                                        </LabelText>
                                    </div>
                                    <AttachmentList
                                        attachments={attachmentWithoutErrors}
                                        showFileSize={showFileSize}
                                        onDelete={(file: Attachment) =>
                                            onFileDelete(file)
                                        }
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </CSSTransition>
            </div>
        );
    }
}
export default injectIntl(AttachmentOverview);

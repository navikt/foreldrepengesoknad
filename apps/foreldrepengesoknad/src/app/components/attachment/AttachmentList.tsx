import * as React from 'react';
import AttachmentComponent from './Attachment';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Attachment } from 'app/types/Attachment';
import './attachment.less';
import { guid } from '@navikt/fp-common';

interface Props {
    attachments: Attachment[];
    showFileSize?: boolean;
    onDelete?: (file: Attachment) => void;
}

const AttachmentList: React.FunctionComponent<Props> = (props) => {
    const { attachments, showFileSize, onDelete } = props;
    return (
        <ul className="attachmentList">
            <TransitionGroup>
                {attachments.map((attachment) => (
                    <CSSTransition classNames="transitionFade" timeout={500} key={guid()}>
                        <li>
                            <AttachmentComponent
                                attachment={attachment}
                                onDelete={onDelete}
                                showFileSize={showFileSize}
                            />
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};
export default AttachmentList;

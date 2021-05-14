import * as React from 'react';
import AttachmentComponent from './Attachment';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Attachment } from 'app/types/Attachment';
import './attachment.less';

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
                {attachments.map((attachment, index) => (
                    <CSSTransition classNames="transitionFade" timeout={500} key={index}>
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

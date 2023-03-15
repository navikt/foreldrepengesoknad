import React from 'react';
import AttachmentComponent from './Attachment';
import { Attachment } from 'app/types/Attachment';
import './attachment-list.css';

interface Props {
    attachments: Attachment[];
    onDelete?: (file: Attachment) => void;
    showFileSize?: boolean;
}

const AttachmentList: React.FunctionComponent<Props> = (props) => {
    const { attachments, showFileSize, onDelete } = props;
    return (
        <ul className="attachmentList">
            {attachments.map((attachment) => (
                <li key={attachment.id}>
                    <AttachmentComponent attachment={attachment} onDelete={onDelete} showFileSize={showFileSize} />
                </li>
            ))}
        </ul>
    );
};
export default AttachmentList;

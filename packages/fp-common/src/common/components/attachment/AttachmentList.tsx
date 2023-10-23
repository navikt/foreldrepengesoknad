import * as React from 'react';
import AttachmentComponent from './Attachment';
import { Attachment } from '../../types';
import { guid } from '../../utils/guid';

import './attachment.less';

export interface Props {
    attachments: Attachment[];
    showFileSize?: boolean;
    onDelete?: (file: Attachment) => void;
}

const AttachmentList: React.FunctionComponent<Props> = (props) => {
    const { attachments, showFileSize, onDelete } = props;
    return (
        <ul className="attachmentList">
            {attachments.map((attachment) => (
                <li key={guid()}>
                    <AttachmentComponent attachment={attachment} onDelete={onDelete} showFileSize={showFileSize} />
                </li>
            ))}
        </ul>
    );
};
export default AttachmentList;

import { Attachment } from '../typer/Attachment';
import AttachmentComponent from './Attachment';
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
            {attachments.map((attachment, index) => (
                <li key={guid()}>
                    {index === 0 && <hr />}
                    <AttachmentComponent attachment={attachment} onDelete={onDelete} showFileSize={showFileSize} />
                    <hr />
                </li>
            ))}
        </ul>
    );
};
export default AttachmentList;

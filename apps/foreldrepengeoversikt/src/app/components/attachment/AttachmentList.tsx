import AttachmentComponent from './Attachment';
import { Attachment } from 'app/types/Attachment';
import './attachment-list.css';
import { useEffect } from 'react';

interface Props {
    attachments: Attachment[];
    onDelete?: (file: Attachment) => void;
    showFileSize?: boolean;
}

async function identifyDuplicates(attachments: Attachment[]): Promise<Set<string>> {
    const hashSet: Set<string> = new Set();
    const duplicates: Set<string> = new Set();

    for (const attachment of attachments) {
        const hash = await attachment.byteHash;
        if (hash !== undefined) {
            if (hashSet.has(hash)) {
                duplicates.add(attachment.id);
            } else {
                hashSet.add(hash);
            }
        }
    }

    return duplicates;
}

const AttachmentList: React.FunctionComponent<Props> = (props) => {
    const { attachments, showFileSize, onDelete } = props;

    useEffect(() => {
        identifyDuplicates(attachments).then((nextDuplicates) => {
            attachments.forEach((a) => {
                if (nextDuplicates.has(a.id)) {
                    a.isDuplicate = true;
                } else {
                    a.isDuplicate = false;
                }
            });
        });
    }, [attachments]);

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

import { AttachmentAppState } from 'storage/attachment/redux/attachmentReducer';
import { Attachment } from 'storage/attachment/types/Attachment';

export const getAttachmentsInGroup = (
    state: AttachmentAppState,
    group: string
): Attachment[] => state.attachments.filter((a) => a.group === group);

import { AttachmentAppState } from 'common/storage/attachment/redux/attachmentReducer';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export const getAttachmentsInGroup = (
    state: AttachmentAppState,
    group: string
): Attachment[] => state.attachments.filter((a) => a.group === group);

import { Attachment } from '../../../types/Attachment';
import {
    AttachmentActionTypes,
    AttachmentActionKeys
} from './attachmentActionDefinitions';

export function addAttachments(
    attachments: Attachment[]
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.ADD,
        attachments
    };
}

export function deleteAttachment(
    attachment: Attachment
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.DELETE,
        attachment
    };
}

export function uploadAttachment(
    attachment: Attachment
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.UPLOAD,
        attachment
    };
}

export function attachmentUploadPending(
    attachment: Attachment
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.UPLOAD_PENDING,
        attachment
    };
}

export function attachmentUploadSuccess(
    url: string,
    attachment: Attachment
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.UPLOAD_SUCCESS,
        attachment,
        url
    };
}

export function attachmentUploadFailed(
    error: string,
    attachment: Attachment
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.UPLOAD_FAILED,
        attachment,
        error
    };
}

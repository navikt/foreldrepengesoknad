import {
    AttachmentAction,
    AttachmentActionKeys
} from './attachmentActionDefinitions';
import { Attachment } from '../types/Attachment';

export function addAttachments(
    attachments: Attachment[],
    group?: string
): AttachmentAction {
    return {
        type: AttachmentActionKeys.ADD,
        attachments,
        group
    };
}

export function deleteAttachment(attachment: Attachment): AttachmentAction {
    return {
        type: AttachmentActionKeys.DELETE,
        attachment
    };
}

export function uploadAttachment(attachment: Attachment): AttachmentAction {
    return {
        type: AttachmentActionKeys.UPLOAD,
        attachment
    };
}

export function attachmentPending(attachment: Attachment): AttachmentAction {
    return {
        type: AttachmentActionKeys.PENDING,
        attachment
    };
}

export function attachmentUploadSuccess(
    url: string,
    attachment: Attachment
): AttachmentAction {
    return {
        type: AttachmentActionKeys.UPLOAD_SUCCESS,
        attachment,
        url
    };
}

export function attachmentUploadFailed(
    error: string,
    attachment: Attachment
): AttachmentAction {
    return {
        type: AttachmentActionKeys.UPLOAD_FAILED,
        attachment,
        error
    };
}

export function attachmentDeleteSuccess(
    attachment: Attachment
): AttachmentAction {
    return {
        type: AttachmentActionKeys.DELETE_SUCCESS,
        attachment
    };
}

export function attachmentDeleteFailed(
    error: string,
    attachment: Attachment
): AttachmentAction {
    return {
        type: AttachmentActionKeys.DELETE_FAILED,
        attachment,
        error
    };
}

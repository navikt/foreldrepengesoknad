import {
    AttachmentActionTypes,
    AttachmentActionKeys
} from './attachmentActionDefinitions';
import { Attachment } from '../types/Attachment';

export function addAttachments(
    attachments: Attachment[],
    group?: string
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.ADD,
        attachments,
        group
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

export function attachmentPending(
    attachment: Attachment
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.PENDING,
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

export function attachmentDeleteSuccess(
    attachment: Attachment
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.DELETE_SUCCESS,
        attachment
    };
}

export function attachmentDeleteFailed(
    error: string,
    attachment: Attachment
): AttachmentActionTypes {
    return {
        type: AttachmentActionKeys.DELETE_FAILED,
        attachment,
        error
    };
}

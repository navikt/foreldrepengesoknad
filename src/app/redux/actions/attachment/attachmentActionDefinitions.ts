import { Attachment } from '../../../types/Attachment';

export enum AttachmentActionKeys {
    'UPLOAD' = 'upload',
    'UPLOAD_PENDING' = 'uploadPending',
    'UPLOAD_SUCCESS' = 'uploadSuccess',
    'UPLOAD_FAILED' = 'uploadFailed',
    'ADD' = 'add',
    'DELETE' = 'delete'
}

interface Add {
    type: AttachmentActionKeys.ADD;
    attachments: Attachment[];
}

export interface UploadAttachment {
    type: AttachmentActionKeys.UPLOAD;
    attachment: Attachment;
}

export interface UploadPending {
    type: AttachmentActionKeys.UPLOAD_PENDING;
    pending: boolean;
    attachment: Attachment;
}

interface AttachmentUploadSuccess {
    type: AttachmentActionKeys.UPLOAD_SUCCESS;
    attachment: Attachment;
    url: URL;
}

interface AttachmentUploadFailed {
    type: AttachmentActionKeys.UPLOAD_FAILED;
    attachment: Attachment;
    error: string;
}

interface Delete {
    type: AttachmentActionKeys.DELETE;
    attachment: Attachment;
}

export type AttachmentActionTypes =
    | Delete
    | Add
    | UploadPending
    | UploadAttachment
    | AttachmentUploadSuccess
    | AttachmentUploadFailed;

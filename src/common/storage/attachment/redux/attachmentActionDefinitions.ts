import { Attachment } from '../types/Attachment';

export enum AttachmentActionKeys {
    'ADD' = 'add',
    'PENDING' = 'pending',
    'UPLOAD' = 'upload',
    'UPLOAD_SUCCESS' = 'uploadSuccess',
    'UPLOAD_FAILED' = 'uploadFailed',
    'DELETE_SUCCESS' = 'deleteSuccess',
    'DELETE_FAILED' = 'deleteFailed',
    'DELETE' = 'delete'
}

interface Add {
    type: AttachmentActionKeys.ADD;
    attachments: Attachment[];
    group?: string;
}

export interface UploadAttachment {
    type: AttachmentActionKeys.UPLOAD;
    attachment: Attachment;
}

export interface UploadPending {
    type: AttachmentActionKeys.PENDING;
    attachment: Attachment;
}

interface AttachmentUploadSuccess {
    type: AttachmentActionKeys.UPLOAD_SUCCESS;
    attachment: Attachment;
    url: string;
}

interface AttachmentUploadFailed {
    type: AttachmentActionKeys.UPLOAD_FAILED;
    attachment: Attachment;
    error: string;
}

export interface DeleteAttachment {
    type: AttachmentActionKeys.DELETE;
    attachment: Attachment;
}

interface AttachmentDeleteSuccess {
    type: AttachmentActionKeys.DELETE_SUCCESS;
    attachment: Attachment;
}

interface AttachmentDeleteFailed {
    type: AttachmentActionKeys.DELETE_FAILED;
    attachment: Attachment;
    error: string;
}

export type AttachmentAction =
    | Add
    | UploadPending
    | UploadAttachment
    | AttachmentUploadSuccess
    | AttachmentUploadFailed
    | DeleteAttachment
    | AttachmentDeleteSuccess
    | AttachmentDeleteFailed;

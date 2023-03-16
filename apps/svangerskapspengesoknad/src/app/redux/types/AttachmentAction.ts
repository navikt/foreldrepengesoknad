import { Attachment } from 'common/storage/attachment/types/Attachment';
import { FetchError } from 'app/types/FetchState';

export enum AttachmentActionTypes {
    'UPLOAD_ATTACHMENT_REQUEST' = 'uploadAttachmentRequest',
    'UPLOAD_ATTACHMENT_SUCCESS' = 'uploadAttachmentSuccess',
    'UPLOAD_ATTACHMENT_FAILURE' = 'uploadAttachmentFailure',
    'DELETE_ATTACHMENT_REQUEST' = 'deleteAttachmentRequest',
    'DELETE_ATTACHMENT_SUCCESS' = 'deleteAttachmentSuccess',
    'DELETE_ATTACHMENT_FAILURE' = 'deleteAttachmentFailure',
}

export interface UploadAttachmentRequest {
    type: AttachmentActionTypes.UPLOAD_ATTACHMENT_REQUEST;
    payload: {
        attachment: Attachment;
    };
}

export interface UploadAttachmentSuccess {
    type: AttachmentActionTypes.UPLOAD_ATTACHMENT_SUCCESS;
    payload: {
        attachment: Attachment;
        url: string;
        uuid: string;
    };
}

export interface UploadAttachmentFailure {
    type: AttachmentActionTypes.UPLOAD_ATTACHMENT_FAILURE;
    payload: {
        attachment: Attachment;
        error: FetchError;
    };
}

export interface DeleteAttachmentRequest {
    type: AttachmentActionTypes.DELETE_ATTACHMENT_REQUEST;
    payload: {
        attachment: Attachment;
    };
}

export interface DeleteAttachmentSuccess {
    type: AttachmentActionTypes.DELETE_ATTACHMENT_SUCCESS;
    payload: {
        attachment: Attachment;
    };
}

export interface DeleteAttachmentFailure {
    type: AttachmentActionTypes.DELETE_ATTACHMENT_FAILURE;
    payload: {
        attachment: Attachment;
        error: FetchError;
    };
}

type AttachmentAction =
    | UploadAttachmentRequest
    | UploadAttachmentSuccess
    | UploadAttachmentFailure
    | DeleteAttachmentRequest
    | DeleteAttachmentSuccess
    | DeleteAttachmentFailure;

export default AttachmentAction;

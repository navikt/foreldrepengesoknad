import { Attachment } from '../types/Attachment';
import {
    AttachmentAction,
    AttachmentActionKeys
} from './attachmentActionDefinitions';

export type AttachmentReducerState = Attachment[];

export interface AttachmentAppState {
    attachments: AttachmentReducerState;
}

const getDefaultState = (): AttachmentReducerState => [];

const addGroupToAttachments = (
    attachments: Attachment[],
    group: string
): Attachment[] => {
    return attachments.map((a) => ({ ...a, group }));
};

const addAttachments = (
    state: AttachmentReducerState,
    attachments: Attachment[],
    group?: string
): Attachment[] => {
    return [
        ...state,
        ...(group ? addGroupToAttachments(attachments, group) : attachments)
    ];
};

const setAttachmentPending = (
    state: AttachmentReducerState,
    attachment: Attachment
): Attachment[] => {
    return state.map((a) => {
        if (a.id === attachment.id) {
            return {
                ...a,
                pending: true
            };
        }
        return a;
    });
};

const setAttachmentUploaded = (
    state: AttachmentReducerState,
    attachment: Attachment,
    url: string
): Attachment[] => {
    return state.map((a) => {
        if (a.id === attachment.id) {
            return {
                ...a,
                url,
                pending: false,
                uploaded: true
            };
        }
        return a;
    });
};

const attachmentReducer = (
    state = getDefaultState(),
    action: AttachmentAction
): AttachmentReducerState => {
    switch (action.type) {
        case AttachmentActionKeys.ADD:
            return addAttachments(state, action.attachments, action.group);

        case AttachmentActionKeys.PENDING:
            return setAttachmentPending(state, action.attachment);

        case AttachmentActionKeys.UPLOAD_SUCCESS:
            return setAttachmentUploaded(state, action.attachment, action.url);

        case AttachmentActionKeys.DELETE_SUCCESS:
            return [...state.filter((a) => a.id !== action.attachment.id)];
    }
    return state;
};

export default attachmentReducer;

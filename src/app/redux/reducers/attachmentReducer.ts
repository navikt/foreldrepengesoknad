import { Attachment } from '../../types/Attachment';
import {
    AttachmentActionTypes,
    AttachmentActionKeys
} from '../actions/attachment/attachmentActionDefinitions';

export type AttachmentReducerState = Attachment[];

const getDefaultState = (): AttachmentReducerState => [];

const setAttachmentPending = (
    state: AttachmentReducerState,
    attachment: Attachment
): Attachment[] => {
    return state.map((a) => {
        return {
            ...a,
            pending: a.id === attachment.id
        };
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
    action: AttachmentActionTypes
): AttachmentReducerState => {
    switch (action.type) {
        case AttachmentActionKeys.ADD:
            return [...state, ...action.attachments];

        case AttachmentActionKeys.DELETE:
            return [...state.filter((a) => a !== action.attachment)];

        case AttachmentActionKeys.UPLOAD_PENDING:
            return setAttachmentPending(state, action.attachment);

        case AttachmentActionKeys.UPLOAD_SUCCESS:
            return setAttachmentUploaded(state, action.attachment, action.url);

        case AttachmentActionKeys.DELETE_SUCCESS:
            return [...state.filter((a) => a.id !== action.attachment.id)];
    }
    return state;
};

export default attachmentReducer;

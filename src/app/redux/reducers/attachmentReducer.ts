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
            pending: a === attachment
        };
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
    }
    return state;
};

export default attachmentReducer;

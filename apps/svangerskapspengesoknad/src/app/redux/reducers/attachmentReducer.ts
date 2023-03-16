import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentAction, { AttachmentActionTypes } from '../types/AttachmentAction';

export const getDefaultAttachmentState = (): AttachmentState => ({
    vedlegg: [],
});

export interface AttachmentState {
    vedlegg: Attachment[];
}

const modifyAttachmentWithId =
    (compareId: string, newProperties: Partial<Attachment>) =>
    (existingAttachment: Attachment): Attachment => {
        return existingAttachment.id !== compareId
            ? existingAttachment
            : {
                  ...existingAttachment,
                  ...newProperties,
              };
    };

const attachmentReducer = (state = getDefaultAttachmentState(), action: AttachmentAction): AttachmentState => {
    switch (action.type) {
        case AttachmentActionTypes.UPLOAD_ATTACHMENT_REQUEST: {
            const { attachment } = action.payload;
            const vedlegg = [
                ...state.vedlegg,
                {
                    ...attachment,
                    pending: true,
                },
            ];

            return { ...state, vedlegg };
        }

        case AttachmentActionTypes.UPLOAD_ATTACHMENT_SUCCESS: {
            const { url, uuid, attachment } = action.payload;
            const vedlegg = state.vedlegg.map(
                modifyAttachmentWithId(attachment.id, {
                    url,
                    uuid,
                    pending: false,
                    uploaded: true,
                })
            );

            return { ...state, vedlegg };
        }

        case AttachmentActionTypes.UPLOAD_ATTACHMENT_FAILURE: {
            const { attachment, error } = action.payload;
            const vedlegg = state.vedlegg.map(
                modifyAttachmentWithId(attachment.id, {
                    error: error ? error.message : '',
                })
            );

            return { ...state, vedlegg };
        }

        case AttachmentActionTypes.DELETE_ATTACHMENT_REQUEST: {
            const { attachment } = action.payload;
            const vedlegg = state.vedlegg.map(
                modifyAttachmentWithId(attachment.id, {
                    pending: true,
                })
            );

            return { ...state, vedlegg };
        }

        case AttachmentActionTypes.DELETE_ATTACHMENT_SUCCESS: {
            const { attachment } = action.payload;
            const vedlegg = state.vedlegg.filter((v) => v.id !== attachment.id);

            return { ...state, vedlegg };
        }

        case AttachmentActionTypes.DELETE_ATTACHMENT_FAILURE: {
            const { attachment, error } = action.payload;
            const vedlegg = state.vedlegg.map(
                modifyAttachmentWithId(attachment.id, {
                    pending: false,
                    error: error ? error.message : '',
                })
            );

            return { ...state, vedlegg };
        }
    }

    return state;
};

export default attachmentReducer;

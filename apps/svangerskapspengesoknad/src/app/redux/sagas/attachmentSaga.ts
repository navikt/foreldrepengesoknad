import { all, call, put, takeEvery } from 'redux-saga/effects';
import AttachmentApi from '../../../common/storage/api/attachmentApi';
import {
    UploadAttachmentRequest,
    AttachmentActionTypes,
    UploadAttachmentSuccess,
    UploadAttachmentFailure,
    DeleteAttachmentRequest,
    DeleteAttachmentSuccess,
    DeleteAttachmentFailure,
} from '../types/AttachmentAction';

function* uploadAttachment(action: UploadAttachmentRequest): any {
    const { attachment } = action.payload;

    try {
        const response = yield call(AttachmentApi.saveAttachment, attachment);
        const url: string = response.headers.location || 'mockurl';
        const uuid: string = response.data;

        const successAction: UploadAttachmentSuccess = {
            type: AttachmentActionTypes.UPLOAD_ATTACHMENT_SUCCESS,
            payload: {
                attachment,
                uuid,
                url,
            },
        };

        yield put(successAction);
    } catch (error) {
        const failureAction: UploadAttachmentFailure = {
            type: AttachmentActionTypes.UPLOAD_ATTACHMENT_FAILURE,
            payload: {
                attachment,
                // @ts-ignore Fiks
                error,
            },
        };

        yield put(failureAction);
    }
}

function* deleteAttachment(action: DeleteAttachmentRequest) {
    const { attachment } = action.payload;

    try {
        yield call(AttachmentApi.deleteAttachment, attachment);

        const successAction: DeleteAttachmentSuccess = {
            type: AttachmentActionTypes.DELETE_ATTACHMENT_SUCCESS,
            payload: {
                attachment,
            },
        };

        yield put(successAction);
    } catch (error) {
        const failureAction: DeleteAttachmentFailure = {
            type: AttachmentActionTypes.DELETE_ATTACHMENT_FAILURE,
            payload: {
                attachment,
                // @ts-ignore Fiks
                error,
            },
        };
        yield put(failureAction);
    }
}

export default function* attachmentSaga() {
    yield all([
        takeEvery(AttachmentActionTypes.UPLOAD_ATTACHMENT_REQUEST, uploadAttachment),
        takeEvery(AttachmentActionTypes.DELETE_ATTACHMENT_REQUEST, deleteAttachment),
    ]);
}

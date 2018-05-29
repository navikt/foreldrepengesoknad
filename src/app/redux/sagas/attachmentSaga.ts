import Api from '../../api/api';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    UploadAttachment,
    AttachmentActionKeys,
    DeleteAttachment
} from '../actions/attachment/attachmentActionDefinitions';
import {
    attachmentUploadSuccess,
    attachmentUploadFailed,
    attachmentPending,
    attachmentDeleteSuccess,
    attachmentDeleteFailed
} from '../actions/attachment/attachmentActionCreators';

function* saveAttachment(action: UploadAttachment) {
    const { attachment } = action;
    try {
        yield put(attachmentPending(attachment));
        const response = yield call(Api.saveAttachment, attachment);
        const uri: string = response.headers.location || 'mockurl';
        yield put(attachmentUploadSuccess(uri, attachment));
    } catch (error) {
        yield put(attachmentUploadFailed(error, attachment));
    }
}

function* deleteAttachment(action: DeleteAttachment) {
    const { attachment } = action;
    try {
        yield put(attachmentPending(attachment));
        yield call(Api.deleteAttachment, attachment);
        yield put(attachmentDeleteSuccess(attachment));
    } catch (error) {
        yield put(attachmentDeleteFailed(error, attachment));
    }
}

export default function* sagas() {
    yield all([takeEvery(AttachmentActionKeys.UPLOAD, saveAttachment)]);
    yield all([takeEvery(AttachmentActionKeys.DELETE, deleteAttachment)]);
}

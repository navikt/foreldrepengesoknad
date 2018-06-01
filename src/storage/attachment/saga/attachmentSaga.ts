import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    UploadAttachment,
    DeleteAttachment,
    AttachmentActionKeys
} from '../redux/attachmentActionDefinitions';
import {
    attachmentPending,
    attachmentUploadSuccess,
    attachmentUploadFailed,
    attachmentDeleteSuccess,
    attachmentDeleteFailed
} from '../redux/attachmentActionCreators';
import AttachmentApi from '../../api/attachmentApi';

function* saveAttachment(action: UploadAttachment) {
    const { attachment } = action;
    try {
        yield put(attachmentPending(attachment));
        const response = yield call(AttachmentApi.saveAttachment, attachment);
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
        yield call(AttachmentApi.deleteAttachment, attachment);
        yield put(attachmentDeleteSuccess(attachment));
    } catch (error) {
        yield put(attachmentDeleteFailed(error, attachment));
    }
}

export default function* attachmentSaga() {
    yield all([takeEvery(AttachmentActionKeys.UPLOAD, saveAttachment)]);
    yield all([takeEvery(AttachmentActionKeys.DELETE, deleteAttachment)]);
}

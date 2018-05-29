import Api from '../../api/api';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    UploadAttachment,
    AttachmentActionKeys
} from '../actions/attachment/attachmentActionDefinitions';
import {
    attachmentUploadSuccess,
    attachmentUploadFailed,
    attachmentUploadPending
} from '../actions/attachment/attachmentActionCreators';

function* saveVedlegg(action: UploadAttachment) {
    const { attachment } = action;
    try {
        yield put(attachmentUploadPending(true, attachment));
        const response = yield call(Api.saveVedlegg, attachment.file);
        const uri: URL = response.headers.location;
        yield put(attachmentUploadSuccess(uri, attachment));
    } catch (error) {
        yield put(attachmentUploadPending(false, attachment));
        yield put(attachmentUploadFailed(error, attachment));
    }
}

export default function* sagas() {
    yield all([takeEvery(AttachmentActionKeys.UPLOAD, saveVedlegg)]);
}

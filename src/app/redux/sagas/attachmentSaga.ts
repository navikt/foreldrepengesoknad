import { all, call, put, takeEvery } from 'redux-saga/effects';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions } from '../actions/api/apiActionCreators';
import AttachmentApi from '../../components/storage/api/attachmentApi';
import { DeleteAttachment, SøknadActionKeys, UploadAttachment } from '../actions/søknad/søknadActionDefinitions';

function* uploadAttachment(action: UploadAttachment) {
    const attachment = action.payload;
    try {
        const response = yield call(AttachmentApi.saveAttachment, attachment);
        const uri: string = response.headers.location || 'mockurl';
        const uuid: string = response.data;
        yield put(søknadActions.uploadAttachmentSuccess(attachment, uri, uuid));
    } catch (error) {
        yield put(søknadActions.uploadAttachmentFailed(error, attachment));
    }
}

function* deleteAttachment(action: DeleteAttachment) {
    const attachment = action.attachment;
    try {
        yield call(AttachmentApi.deleteAttachment, attachment);
        yield put(søknadActions.deleteAttachmentSuccess(attachment));
        yield put(apiActions.storeAppState());
    } catch (error) {
        yield put(søknadActions.deleteAttachmentFailed(error, attachment));
    }
}

export default function* attachmentSaga() {
    yield all([
        takeEvery(SøknadActionKeys.UPLOAD_ATTACHMENT, uploadAttachment),
        takeEvery(SøknadActionKeys.DELETE_ATTACHMENT, deleteAttachment)
    ]);
}

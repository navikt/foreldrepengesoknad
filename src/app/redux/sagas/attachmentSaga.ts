import { all, call, put, takeEvery } from 'redux-saga/effects';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import AttachmentApi from '../../../common/storage/api/attachmentApi';
import {
    SøknadActionKeys,
    UploadAttachment
} from '../actions/søknad/søknadActionDefinitions';

function* uploadAttachment(action: UploadAttachment) {
    const attachment = action.payload;
    try {
        const response = yield call(AttachmentApi.saveAttachment, attachment);
        const uri: string = response.headers.location || 'mockurl';
        yield put(søknadActions.uploadAttachmentSuccess(attachment, uri));
    } catch (error) {
        yield put(søknadActions.uploadAttachmentFailed(error, attachment));
    }
}

export default function* attachmentSaga() {
    yield all([
        takeEvery(SøknadActionKeys.UPLOAD_ATTACHMENT, uploadAttachment)
    ]);
}

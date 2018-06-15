import { all, call, put, takeEvery } from 'redux-saga/effects';
import { default as søknadActions } from './../../../../app/redux/actions/søknad/søknadActionCreators';
import AttachmentApi from '../../api/attachmentApi';
import {
    SøknadActionKeys,
    UploadAttachment
} from '../../../../app/redux/actions/søknad/søknadActionDefinitions';

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

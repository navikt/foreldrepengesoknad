import { all, call, put, takeEvery } from 'redux-saga/effects';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import AttachmentApi from '../../components/storage/api/attachmentApi';
import { SøknadActionKeys, UploadAttachment } from '../actions/søknad/søknadActionDefinitions';
import { AxiosResponse } from 'axios';

function* uploadAttachment(action: UploadAttachment) {
    const attachment = action.payload;
    try {
        const response: AxiosResponse = yield call(AttachmentApi.saveAttachment, attachment);
        const uri: string = response.headers.location || 'mockurl';
        const uuid: string = response.data;
        yield put(søknadActions.uploadAttachmentSuccess(attachment, uri, uuid));
    } catch (error) {
        yield put(søknadActions.uploadAttachmentFailed(error, attachment));
    }
}

export default function* attachmentSaga() {
    yield all([takeEvery(SøknadActionKeys.UPLOAD_ATTACHMENT, uploadAttachment)]);
}

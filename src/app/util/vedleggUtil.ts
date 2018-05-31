import { SøknadsvedleggType } from '../types/søknad/Søknad';
import { AttachmentAppState } from 'storage/attachment/redux/attachmentReducer';
import { Attachment } from 'storage/attachment/types/Attachment';
import { getAttachmentsInGroup } from 'storage/attachment/util/attachmentUtil';

export const getSøknadsvedlegg = (
    type: SøknadsvedleggType,
    state: AttachmentAppState
): Attachment[] => getAttachmentsInGroup(state, type);

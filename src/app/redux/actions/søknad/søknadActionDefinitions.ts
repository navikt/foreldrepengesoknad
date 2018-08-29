import Søknad, { SøknadenGjelderBarnValg } from '../../../types/søknad/Søknad';
import { BarnPartial } from '../../../types/søknad/Barn';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { InformasjonOmUtenlandsoppholdPartial } from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import { SøkerPartial } from '../../../types/søknad/Søker';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export type UpdateSøknadActionPayload = Partial<Søknad>;

export enum SøknadActionKeys {
    'UPDATE_ANNEN_FORELDER' = 'updateAnnenForelder',
    'UPDATE_BARN' = 'updateBarn',
    'UPLOAD_ATTACHMENT' = 'uploadAttachment',
    'UPLOAD_ATTACHMENT_SUCCESS' = 'uploadAttachmentSuccess',
    'UPLOAD_ATTACHMENT_FAILED' = 'uploadAttachmentFailed',
    'DELETE_ATTACHMENT' = 'deleteAttachment',
    'DELETE_ATTACHMENT_SUCCESS' = 'deleteAttachmentSuccess',
    'DELETE_ATTACHMENT_FAILED' = 'deleteAttachmentFailed',
    'UPDATE_UTENLANDSOPPHOLD' = 'updateUtenlandsopphold',
    'UPDATE_SØKER' = 'updateSøker',
    'UPDATE_SØKER_AND_STORAGE' = 'updateSøkerAndStorage',
    'UPDATE_SØKNAD' = 'updateSøknad',
    'UPDATE_SØKNADEN_GJELDER_BARN' = 'updateSøknadenGjelderBarn'
}

export interface UpdateSøknadenGjelder {
    type: SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN;
    payload: SøknadenGjelderBarnValg;
}

export interface UpdateBarn {
    type: SøknadActionKeys.UPDATE_BARN;
    payload: BarnPartial;
}

export interface UpdateAnnenForelder {
    type: SøknadActionKeys.UPDATE_ANNEN_FORELDER;
    payload: AnnenForelderPartial;
}

export interface UpdateUtenlandsopphold {
    type: SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD;
    payload: InformasjonOmUtenlandsoppholdPartial;
}

export interface UpdateSøker {
    type: SøknadActionKeys.UPDATE_SØKER;
    payload: SøkerPartial;
}

export interface UpdateSøkerAndStorage {
    type: SøknadActionKeys.UPDATE_SØKER_AND_STORAGE;
    payload: SøkerPartial;
}

export interface UpdateSøknad {
    type: SøknadActionKeys.UPDATE_SØKNAD;
    payload: UpdateSøknadActionPayload;
}

export interface UploadAttachment {
    type: SøknadActionKeys.UPLOAD_ATTACHMENT;
    payload: Attachment;
}

export interface UploadAttachmentSuccess {
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS;
    attachment: Attachment;
    url: string;
}

export interface UploadAttachmentFailed {
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_FAILED;
    attachment: Attachment;
    error: string;
}

export interface DeleteAttachment {
    type: SøknadActionKeys.DELETE_ATTACHMENT;
    attachment: Attachment;
}

export interface DeleteAttachmentSuccess {
    type: SøknadActionKeys.DELETE_ATTACHMENT_SUCCESS;
    attachment: Attachment;
}

export interface DeleteAttachmentFailed {
    type: SøknadActionKeys.DELETE_ATTACHMENT_FAILED;
    error: any;
    attachment: Attachment;
}

export type SøknadAction =
    | UpdateBarn
    | UpdateSøknadenGjelder
    | UpdateAnnenForelder
    | UpdateUtenlandsopphold
    | UpdateSøker
    | UpdateSøkerAndStorage
    | UpdateSøknad
    | UploadAttachment
    | UploadAttachmentSuccess
    | UploadAttachmentFailed
    | DeleteAttachment
    | DeleteAttachmentSuccess
    | DeleteAttachmentFailed;

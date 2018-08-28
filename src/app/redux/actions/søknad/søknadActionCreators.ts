import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøknad,
    UpdateUtenlandsopphold,
    UpdateSøker,
    UploadAttachmentSuccess,
    UploadAttachmentFailed,
    DeleteAttachment,
    DeleteAttachmentFailed,
    DeleteAttachmentSuccess,
    UpdateSøkerAndStorage,
    UpdateSøknadActionPayload,
    UpdateSøknadenGjelder
} from './søknadActionDefinitions';
import {
    FødtBarnPartial,
    UfødtBarnPartial,
    AdopsjonsbarnPartial,
    ForeldreansvarBarnPartial
} from '../../../types/søknad/Barn';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { InformasjonOmUtenlandsoppholdPartial } from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import { SøkerPartial } from '../../../types/søknad/Søker';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { SøknadenGjelderBarnValg } from '../../../types/søknad/Søknad';

const updateBarn = (
    payload:
        | FødtBarnPartial
        | UfødtBarnPartial
        | AdopsjonsbarnPartial
        | ForeldreansvarBarnPartial
): UpdateBarn => ({
    type: SøknadActionKeys.UPDATE_BARN,
    payload
});

const updateSøknadenGjelderBarn = (
    payload: SøknadenGjelderBarnValg
): UpdateSøknadenGjelder => ({
    type: SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN,
    payload
});

const updateAnnenForelder = (payload: AnnenForelderPartial) => ({
    type: SøknadActionKeys.UPDATE_ANNEN_FORELDER,
    payload
});

const updateUtenlandsopphold = (
    payload: InformasjonOmUtenlandsoppholdPartial
): UpdateUtenlandsopphold => ({
    type: SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD,
    payload
});

const updateSøker = (payload: SøkerPartial): UpdateSøker => ({
    type: SøknadActionKeys.UPDATE_SØKER,
    payload
});

const updateSøkerAndStorage = (
    payload: SøkerPartial
): UpdateSøkerAndStorage => ({
    type: SøknadActionKeys.UPDATE_SØKER_AND_STORAGE,
    payload
});

const updateSøknad = (payload: UpdateSøknadActionPayload): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload
});

const uploadAttachment = (payload: Attachment) => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT,
    payload
});

const uploadAttachmentSuccess = (
    attachment: Attachment,
    url: string
): UploadAttachmentSuccess => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS,
    attachment,
    url
});

const uploadAttachmentFailed = (
    error: string,
    attachment: Attachment
): UploadAttachmentFailed => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_FAILED,
    error,
    attachment
});

const deleteAttachment = (attachment: Attachment): DeleteAttachment => ({
    type: SøknadActionKeys.DELETE_ATTACHMENT,
    attachment
});

const deleteAttachmentSuccess = (
    attachment: Attachment
): DeleteAttachmentSuccess => ({
    type: SøknadActionKeys.DELETE_ATTACHMENT_SUCCESS,
    attachment
});

const deleteAttachmentFailed = (
    error: any,
    attachment: Attachment
): DeleteAttachmentFailed => ({
    type: SøknadActionKeys.DELETE_ATTACHMENT_FAILED,
    error,
    attachment
});

export default {
    updateAnnenForelder,
    updateBarn,
    updateSøknadenGjelderBarn,
    updateUtenlandsopphold,
    updateSøker,
    updateSøkerAndStorage,
    updateSøknad,
    uploadAttachment,
    uploadAttachmentSuccess,
    uploadAttachmentFailed,
    deleteAttachment,
    deleteAttachmentSuccess,
    deleteAttachmentFailed
};

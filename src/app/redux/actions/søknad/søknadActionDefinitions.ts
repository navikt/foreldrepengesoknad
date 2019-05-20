import Søknad, { SøknadenGjelderBarnValg, SøknadPartial, Tilleggsopplysning } from '../../../types/søknad/Søknad';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { InformasjonOmUtenlandsoppholdPartial } from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import { SøkerPartial } from '../../../types/søknad/Søker';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import { UttaksplanSkjemadata } from '../../../connected-components/steg/uttaksplan-skjema/uttaksplanSkjemadata';
import { StegID } from '../../../util/routing/stegConfig';
import { Barn } from '../../../types/søknad/Barn';
import { History } from 'history';
import { Søkerinfo } from '../../../types/søkerinfo';

export type UpdateSøknadActionPayload = Partial<Søknad>;

export enum SøknadActionKeys {
    'SET_SØKNAD' = 'setSøknad',
    'AVBRYT_SØKNAD' = 'avbrytSøknad',
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
    'UPDATE_SØKNADEN_GJELDER_BARN' = 'updateSøknadenGjelderBarn',
    'UTTAKSPLAN_SET_PERIODER' = 'uttaksplanSetPerioder',
    'UTTAKSPLAN_ADD_PERIODE' = 'uttaksplanAddPeriode',
    'UTTAKSPLAN_DELETE_PERIODE' = 'uttaksplanDeletePeriode',
    'UTTAKSPLAN_UPDATE_PERIODE' = 'uttaksplanUpdatePeriode',
    'UTTAKSPLAN_UPDATE_SKJEMADATA' = 'uttaksplanUpdateSkjemadata',
    'UTTAKSPLAN_LAG_FORSLAG' = 'uttaksplanLagForslag',
    'UTTAKSPLAN_SET_FORSLAG' = 'uttaksplanSetForslag',
    'UTTAKSPLAN_RESET_ENDRINGER' = 'uttaksplanResetEndringer',
    'SET_VEDLEGG_FOR_SEN_ENDRING' = 'setVedleggForSenEndring',
    'SET_TILLEGGSOPPLYSNING' = 'setTilleggsopplysning',
    'SET_CURRENT_STEG' = 'setCurrentSteg',
    'START_SØKNAD' = 'startNySøknad'
}

export interface StartSøknad {
    type: SøknadActionKeys.START_SØKNAD;
    søkerinfo: Søkerinfo;
    erEndringssøknad: boolean;
    saksnummer: string | undefined;
    history: History;
}

export interface SetSøknad {
    type: SøknadActionKeys.SET_SØKNAD;
    payload: SøknadPartial;
}

export interface UpdateSøknadenGjelder {
    type: SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN;
    payload: SøknadenGjelderBarnValg;
}

export interface UpdateBarn {
    type: SøknadActionKeys.UPDATE_BARN;
    payload: Partial<Barn>;
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

export interface UpdateSøknad {
    type: SøknadActionKeys.UPDATE_SØKNAD;
    payload: UpdateSøknadActionPayload;
}

export interface UttaksplanSetPerioder {
    type: SøknadActionKeys.UTTAKSPLAN_SET_PERIODER;
    perioder: Periode[];
}

export interface UttaksplanAddPeriode {
    type: SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE;
    periode: Periode;
}

export interface UttaksplanLagForslag {
    type: SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG;
}

export interface UttaksplanSetForslag {
    type: SøknadActionKeys.UTTAKSPLAN_SET_FORSLAG;
    uttaksplan: Periode[];
}

export interface UttaksplanDeletePeriode {
    type: SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE;
    periode: Periode;
}

export interface UttaksplanUpdateSkjemadata {
    type: SøknadActionKeys.UTTAKSPLAN_UPDATE_SKJEMADATA;
    payload: Partial<UttaksplanSkjemadata>;
}

export interface UttaksplanUpdatePeriode {
    type: SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE;
    periode: Periode;
}

export interface UploadAttachment {
    type: SøknadActionKeys.UPLOAD_ATTACHMENT;
    payload: Attachment;
}

export interface UploadAttachmentSuccess {
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS;
    attachment: Attachment;
    url: string;
    uuid: string;
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
    attachment: Attachment;
}

export interface AvbrytSøknad {
    type: SøknadActionKeys.AVBRYT_SØKNAD;
}
export interface SetCurrentSteg {
    type: SøknadActionKeys.SET_CURRENT_STEG;
    stegID: StegID;
}

export interface SetVedleggForSenEndring {
    type: SøknadActionKeys.SET_VEDLEGG_FOR_SEN_ENDRING;
    payload: Attachment[];
}

export interface SetTilleggsopplysning {
    type: SøknadActionKeys.SET_TILLEGGSOPPLYSNING;
    payload: Tilleggsopplysning & {
        opplysning: string;
    };
}

export interface ResetUttaksplanEndringer {
    type: SøknadActionKeys.UTTAKSPLAN_RESET_ENDRINGER;
}

export type SøknadAction =
    | SetSøknad
    | AvbrytSøknad
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
    | DeleteAttachmentFailed
    | UttaksplanSetPerioder
    | UttaksplanAddPeriode
    | UttaksplanDeletePeriode
    | UttaksplanUpdatePeriode
    | UttaksplanUpdateSkjemadata
    | UttaksplanLagForslag
    | UttaksplanSetForslag
    | SetCurrentSteg
    | SetVedleggForSenEndring
    | SetTilleggsopplysning
    | ResetUttaksplanEndringer;

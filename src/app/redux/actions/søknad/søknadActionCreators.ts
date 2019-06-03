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
    UpdateSøknadenGjelder,
    UttaksplanSetPerioder,
    UttaksplanAddPeriode,
    UttaksplanDeletePeriode,
    UttaksplanUpdatePeriode,
    UttaksplanUpdateSkjemadata,
    UttaksplanLagForslag,
    SetCurrentSteg,
    AvbrytSøknad,
    SetVedleggForSenEndring,
    SetTilleggsopplysning,
    UttaksplanSetForslag,
    StartSøknad
} from './søknadActionDefinitions';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { InformasjonOmUtenlandsoppholdPartial } from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import { SøkerPartial } from '../../../types/søknad/Søker';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { SøknadenGjelderBarnValg, Opplysning } from '../../../types/søknad/Søknad';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import { UttaksplanSkjemadata } from '../../../steg/uttaksplanSkjema/uttaksplanSkjemadata';
import { StegID } from '../../../util/routing/stegConfig';
import { Barn } from '../../../types/søknad/Barn';
import { History } from 'history';
import { Søkerinfo } from '../../../types/søkerinfo';

const startSøknad = (
    søkerinfo: Søkerinfo,
    erEndringssøknad: boolean,
    saksnummer: string | undefined,
    history: History
): StartSøknad => ({
    type: SøknadActionKeys.START_SØKNAD,
    søkerinfo,
    erEndringssøknad,
    saksnummer,
    history
});

const setSøknad = (payload: UpdateSøknadActionPayload) => ({
    type: SøknadActionKeys.SET_SØKNAD,
    payload
});

const updateBarn = (payload: Partial<Barn>): UpdateBarn => ({
    type: SøknadActionKeys.UPDATE_BARN,
    payload
});

const updateSøknadenGjelderBarn = (payload: SøknadenGjelderBarnValg): UpdateSøknadenGjelder => ({
    type: SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN,
    payload
});

const updateAnnenForelder = (payload: AnnenForelderPartial) => ({
    type: SøknadActionKeys.UPDATE_ANNEN_FORELDER,
    payload
});

const updateUtenlandsopphold = (payload: InformasjonOmUtenlandsoppholdPartial): UpdateUtenlandsopphold => ({
    type: SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD,
    payload
});

const updateSøker = (payload: SøkerPartial): UpdateSøker => ({
    type: SøknadActionKeys.UPDATE_SØKER,
    payload
});

const updateSøkerAndStorage = (payload: SøkerPartial): UpdateSøkerAndStorage => ({
    type: SøknadActionKeys.UPDATE_SØKER_AND_STORAGE,
    payload
});

const updateSøknad = (payload: UpdateSøknadActionPayload): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload
});

const uttaksplanUpdateSkjemdata = (payload: Partial<UttaksplanSkjemadata>): UttaksplanUpdateSkjemadata => ({
    type: SøknadActionKeys.UTTAKSPLAN_UPDATE_SKJEMADATA,
    payload
});

const uploadAttachment = (payload: Attachment) => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT,
    payload
});

const uploadAttachmentSuccess = (attachment: Attachment, url: string, uuid: string): UploadAttachmentSuccess => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS,
    attachment,
    url,
    uuid
});

const uploadAttachmentFailed = (error: string, attachment: Attachment): UploadAttachmentFailed => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_FAILED,
    error,
    attachment
});

const deleteAttachment = (attachment: Attachment): DeleteAttachment => ({
    type: SøknadActionKeys.DELETE_ATTACHMENT,
    attachment
});

const deleteAttachmentSuccess = (attachment: Attachment): DeleteAttachmentSuccess => ({
    type: SøknadActionKeys.DELETE_ATTACHMENT_SUCCESS,
    attachment
});

const deleteAttachmentFailed = (error: any, attachment: Attachment): DeleteAttachmentFailed => ({
    type: SøknadActionKeys.DELETE_ATTACHMENT_FAILED,
    attachment
});

const uttaksplanSetPerioder = (perioder: Periode[]): UttaksplanSetPerioder => ({
    type: SøknadActionKeys.UTTAKSPLAN_SET_PERIODER,
    perioder
});

const uttaksplanAddPeriode = (periode: Periode): UttaksplanAddPeriode => ({
    type: SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE,
    periode
});
const uttaksplanDeletePeriode = (periode: Periode): UttaksplanDeletePeriode => ({
    type: SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE,
    periode
});

const uttaksplanUpdatePeriode = (periode: Periode): UttaksplanUpdatePeriode => ({
    type: SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE,
    periode
});

const uttaksplanLagForslag = (): UttaksplanLagForslag => ({
    type: SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG
});

const uttaksplanSetForslag = (uttaksplan: Periode[]): UttaksplanSetForslag => ({
    type: SøknadActionKeys.UTTAKSPLAN_SET_FORSLAG,
    uttaksplan
});

const avbrytSøknad = (): AvbrytSøknad => ({
    type: SøknadActionKeys.AVBRYT_SØKNAD
});

const setCurrentSteg = (stegID: StegID): SetCurrentSteg => ({
    type: SøknadActionKeys.SET_CURRENT_STEG,
    stegID
});

const setTilleggsopplysning = (
    opplysning: Opplysning,
    tekst: string,
    ekstraInformasjon?: string
): SetTilleggsopplysning => ({
    type: SøknadActionKeys.SET_TILLEGGSOPPLYSNING,
    payload: { opplysning, tekst, ekstraInformasjon }
});

const setVedleggForSenEndring = (payload: Attachment[]): SetVedleggForSenEndring => ({
    type: SøknadActionKeys.SET_VEDLEGG_FOR_SEN_ENDRING,
    payload
});

const resetUttaksplanEndringer = () => ({
    type: SøknadActionKeys.UTTAKSPLAN_RESET_ENDRINGER
});

export default {
    startSøknad,
    updateAnnenForelder,
    updateBarn,
    updateSøknadenGjelderBarn,
    updateUtenlandsopphold,
    updateSøker,
    updateSøkerAndStorage,
    updateSøknad,
    uttaksplanSetPerioder,
    uttaksplanAddPeriode,
    uttaksplanDeletePeriode,
    uttaksplanUpdatePeriode,
    uttaksplanUpdateSkjemdata,
    uploadAttachment,
    uploadAttachmentSuccess,
    uploadAttachmentFailed,
    deleteAttachment,
    deleteAttachmentSuccess,
    deleteAttachmentFailed,
    uttaksplanLagForslag,
    avbrytSøknad,
    setSøknad,
    setCurrentSteg,
    setVedleggForSenEndring,
    setTilleggsopplysning,
    uttaksplanSetForslag,
    resetUttaksplanEndringer
};

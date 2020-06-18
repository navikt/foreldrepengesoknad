import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøknad,
    UpdateUtenlandsopphold,
    UpdateSøker,
    UploadAttachmentSuccess,
    UploadAttachmentFailed,
    DeleteAttachment,
    UpdateSøkerAndStorage,
    UpdateSøknadActionPayload,
    UpdateSøknadenGjelder,
    UttaksplanSetPerioder,
    UttaksplanUpdateSkjemadata,
    SetCurrentSteg,
    AvbrytSøknad,
    SetVedleggForSenEndring,
    SetTilleggsopplysning,
    UttaksplanSetForslag,
    StartSøknad,
    UttaksplanLagForslag,
    SetEndringstidspunkt,
    SetInformasjonOmUtenlandsopphold,
} from './søknadActionDefinitions';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import InformasjonOmUtenlandsopphold, {
    InformasjonOmUtenlandsoppholdPartial,
} from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import { SøkerPartial } from '../../../types/søknad/Søker';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { SøknadenGjelderBarnValg, Opplysning, SøknadEkstrainfo } from '../../../types/søknad/Søknad';
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
    history,
});

const setSøknad = (payload: UpdateSøknadActionPayload) => ({
    type: SøknadActionKeys.SET_SØKNAD,
    payload,
});

const updateBarn = (payload: Partial<Barn>): UpdateBarn => ({
    type: SøknadActionKeys.UPDATE_BARN,
    payload,
});

const updateSøknadenGjelderBarn = (payload: SøknadenGjelderBarnValg): UpdateSøknadenGjelder => ({
    type: SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN,
    payload,
});

const updateAnnenForelder = (payload: AnnenForelderPartial) => ({
    type: SøknadActionKeys.UPDATE_ANNEN_FORELDER,
    payload,
});

const updateUtenlandsopphold = (payload: InformasjonOmUtenlandsoppholdPartial): UpdateUtenlandsopphold => ({
    type: SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD,
    payload,
});

const updateSøker = (payload: SøkerPartial): UpdateSøker => ({
    type: SøknadActionKeys.UPDATE_SØKER,
    payload,
});

const updateSøkerAndStorage = (payload: SøkerPartial): UpdateSøkerAndStorage => ({
    type: SøknadActionKeys.UPDATE_SØKER_AND_STORAGE,
    payload,
});

const updateSøknad = (payload: UpdateSøknadActionPayload): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload,
});

const updateEkstrainfo = (payload: Partial<SøknadEkstrainfo>) => ({
    type: SøknadActionKeys.UPDATE_EKSTRAINFO,
    payload,
});

const uttaksplanUpdateSkjemdata = (payload: Partial<UttaksplanSkjemadata>): UttaksplanUpdateSkjemadata => ({
    type: SøknadActionKeys.UTTAKSPLAN_UPDATE_SKJEMADATA,
    payload,
});

const uploadAttachment = (payload: Attachment) => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT,
    payload,
});

const uploadAttachmentSuccess = (attachment: Attachment, url: string, uuid: string): UploadAttachmentSuccess => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS,
    attachment,
    url,
    uuid,
});

const uploadAttachmentFailed = (error: string, attachment: Attachment): UploadAttachmentFailed => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_FAILED,
    error,
    attachment,
});

const deleteAttachment = (attachment: Attachment): DeleteAttachment => ({
    type: SøknadActionKeys.DELETE_ATTACHMENT,
    attachment,
});

const uttaksplanSetPerioder = (
    perioder: Periode[],
    endringstidspunkt?: Date,
    lastAddedPeriodeId?: string
): UttaksplanSetPerioder => ({
    type: SøknadActionKeys.UTTAKSPLAN_SET_PERIODER,
    perioder,
    endringstidspunkt,
    lastAddedPeriodeId,
});

const uttaksplanLagForslag = (): UttaksplanLagForslag => ({
    type: SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG,
});

const uttaksplanSetForslag = (uttaksplan: Periode[]): UttaksplanSetForslag => ({
    type: SøknadActionKeys.UTTAKSPLAN_SET_FORSLAG,
    uttaksplan,
});

const avbrytSøknad = (): AvbrytSøknad => ({
    type: SøknadActionKeys.AVBRYT_SØKNAD,
});

const setCurrentSteg = (stegID: StegID): SetCurrentSteg => ({
    type: SøknadActionKeys.SET_CURRENT_STEG,
    stegID,
});

const setTilleggsopplysning = (
    opplysning: Opplysning,
    tekst: string,
    ekstraInformasjon?: string
): SetTilleggsopplysning => ({
    type: SøknadActionKeys.SET_TILLEGGSOPPLYSNING,
    payload: { opplysning, tekst, ekstraInformasjon },
});

const setVedleggForSenEndring = (payload: Attachment[]): SetVedleggForSenEndring => ({
    type: SøknadActionKeys.SET_VEDLEGG_FOR_SEN_ENDRING,
    payload,
});

const resetUttaksplanEndringer = () => ({
    type: SøknadActionKeys.UTTAKSPLAN_RESET_ENDRINGER,
});

const setEndringstidspunkt = (endringstidspunkt: Date): SetEndringstidspunkt => ({
    type: SøknadActionKeys.SET_ENDRINGSTIDSPUNKT,
    endringstidspunkt,
});

const setInformasjonOmUtenlandsopphold = (
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold
): SetInformasjonOmUtenlandsopphold => ({
    type: SøknadActionKeys.SET_INFORMASJON_OM_UTENLANDSOPPHOLD,
    payload: informasjonOmUtenlandsopphold,
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
    updateEkstrainfo,
    uttaksplanSetPerioder,
    uttaksplanUpdateSkjemdata,
    uploadAttachment,
    uploadAttachmentSuccess,
    uploadAttachmentFailed,
    deleteAttachment,
    uttaksplanLagForslag,
    avbrytSøknad,
    setSøknad,
    setCurrentSteg,
    setEndringstidspunkt,
    setVedleggForSenEndring,
    setTilleggsopplysning,
    uttaksplanSetForslag,
    resetUttaksplanEndringer,
    setInformasjonOmUtenlandsopphold,
};

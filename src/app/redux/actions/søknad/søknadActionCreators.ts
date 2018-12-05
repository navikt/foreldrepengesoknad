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
    AvbrytSøknad
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
import { Periode, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { UttaksplanSkjemadata } from '../../../connected-components/steg/uttaksplan-skjema/uttaksplanSkjemadata';
import { StegID } from '../../../util/routing/stegConfig';

const setSøknad = (payload: UpdateSøknadActionPayload) => ({
    type: SøknadActionKeys.SET_SØKNAD,
    payload
});

const updateBarn = (
    payload: FødtBarnPartial | UfødtBarnPartial | AdopsjonsbarnPartial | ForeldreansvarBarnPartial
): UpdateBarn => ({
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

const uploadAttachmentSuccess = (attachment: Attachment, url: string): UploadAttachmentSuccess => ({
    type: SøknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS,
    attachment,
    url
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

const uttaksplanLagForslag = (tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]): UttaksplanLagForslag => ({
    type: SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG,
    tilgjengeligeStønadskontoer
});

const avbrytSøknad = (): AvbrytSøknad => ({
    type: SøknadActionKeys.AVBRYT_SØKNAD
});

const setCurrentSteg = (stegID: StegID): SetCurrentSteg => ({
    type: SøknadActionKeys.SET_CURRENT_STEG,
    stegID
});

const setEndringssakUttaksplan = (perioder: Periode[]) => ({
    type: SøknadActionKeys.SET_ENDRINGSSAK_UTTAKSPLAN,
    perioder
});

export default {
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
    setEndringssakUttaksplan
};

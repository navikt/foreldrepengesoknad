import enMessages from './i18n/common.en.json';
import nbMessages from './i18n/common.nb.json';
import nnMessages from './i18n/common.nn.json';

export { default as LanguageToggle } from './components/language-toggle/LanguageToggle';
export { default as Sidebanner } from './components/sidebanner/Sidebanner';
export { default as Block } from './components/block/Block';
export { default as Step } from './components/step/Step';
export { default as SlettKnapp } from './components/slett-knapp/SlettKnapp';
export { default as ItemList } from './components/item-list/ItemList';
export { default as ActionLink } from './components/action-link/ActionLink';
export { default as DisplayTextWithLabel } from './components/display-text-with-label/DisplayTextWithLabel';
export { default as UtvidetInformasjon } from './components/utvidet-informasjon/UtvidetInformasjon';
export { default as PictureScanningGuide } from './components/picture-scanning-guide/PictureScanningGuide';
export { default as InfoBlock } from './components/info-block/InfoBlock';
export { default as StepButtonWrapper } from './components/step/StepButtonWrapper';
export { default as Fieldset } from './components/fieldset/Fieldset';
export { default as Personkort } from './components/personkort/Personkort';
export { default as ForelderIkon } from './components/foreldrepar/ForelderIkon';
export { default as Foreldrepar } from './components/foreldrepar/Foreldrepar';
export { default as Sirkelmaske } from './components/sirkelmaske/Sirkelmaske';
export { default as UkerSirkel } from './components/uker-sirkel/UkerSirkel';
export { default as SituasjonSirkel } from './components/situasjon-sirkel/SituasjonSirkel';
export { default as InnholdMedIllustrasjon } from './components/innhold-med-illustrasjon/InnholdMedIllustrasjon';
export { default as FormikFileUploader } from './components/formik-file-uploader/FormikFileUploader';
export { default as AttachmentList } from './components/attachment/AttachmentList';
export { default as AttachmentComponent } from './components/attachment/Attachment';
export * from './components/foreldrepar/foreldreparUtils';

export { default as AdvarselIkon } from './assets/advarsel-ikon/AdvarselIkon';
export { default as ScanningIkon } from './assets/scanning-ikon/ScanningIkon';
export { default as StatusIkon } from './assets/status-ikon/StatusIkon';
export { default as TrashcanIkon } from './assets/trashcan-ikon/TrashcanIkon';
export { default as VedleggIkon } from './assets/vedlegg-ikon/VedleggIkon';
export { default as CheckmarkIkon } from './assets/checkmark-ikon/CheckmarkIkon';
export { default as KalenderBakgrunnIkon } from './assets/kalender-bakgrunn-ikon/KalenderBakgrunnIkon';

export { default as allCommonMessages } from './i18n/allCommonMessages';

export * from './types';

export { default as uttaksConstants } from './constants/constants';
export { capitalizeFirstLetter } from './utils/stringUtils';

export { default as bemUtils } from './utils/bemUtils';
export { default as useDocumentTitle } from './utils/useDocumentTitle';
export { default as isFarEllerMedmor } from './utils/isFarEllerMedmor';
export { default as intlUtils } from './utils/intlUtils';
export * from './utils/intlUtils';
export * from './utils/uttaksPlanStatus';
export * from './utils/localeUtils';
export * from './utils/personUtils';
export * from './utils/stønadskontoerUtils';
export * from './utils/foreldreparSituasjonUtils';
export * from './utils/dateUtils';
export * from './utils/validationUtils';
export * from './utils/periodeUtils';
export * from './utils/Perioden';
export * from './utils/Periodene';
export * from './utils/Uttaksdagen';
export * from './utils/Tidsperioden';
export * from './utils/wlbUtils';
export * from './utils/annenForelderUtils';
export * from './utils/numberUtils';
export * from './utils/formUtils';
export * from './utils/morsAktivitetUtils';
export * from './utils/vedleggUtils';
export * from './utils/minsterettUtils';
export * from './utils/uttaksplanHarForMangeFlerbarnsuker';
export * from './utils/fridagerUtils';
export * from './utils/arbeidsforholdUtils';
export * from './utils/globalUtil';
export { uttaksplanDatoavgrensninger } from './utils/uttaksplanDatoavgrensninger';
export { guid } from './utils/guid';

export type { VeilederProps } from './components/veileder/Veileder';

export const fpCommonMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

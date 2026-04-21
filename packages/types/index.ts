export type { LocaleNo, LocaleAll } from './src/Locale';
export type {
    Attachment,
    AttachmentUploadResult,
    AttachmentUploadSuccess,
    AttachmentUploadError,
    AttachmentError,
} from './src/Attachment';
export type { AttachmentMetadataTidsperiode } from './src/AttachmentMetadata';
export type { Søkersituasjon, SøkersituasjonFp } from './src/Søkersituasjon';
export type { Situasjon } from './src/Situasjon';
export type { Søkerrolle } from './src/Søkerrolle';
export type { StepConfig } from './src/StepConfig';
export type { Tidsperiode } from './src/Tidsperiode';
export type { Satser } from './src/Satser';
export type { NavnPåForeldre } from './src/NavnPåForeldre';
export type { AppName } from './src/AppName';
export type { DatepickerDateRange } from './src/DatepickerDateRange';
export type { Frilans } from './src/Frilans';
export type {
    FpSoknadProblemDetails,
    FpOversiktProblemDetails,
    FpGrunndataProblemDetails,
    FpSoknadFeilKode,
    FpOversiktFeilKode,
} from './src/ProblemDetails';

export { FRILANS_ID } from './src/Frilans';
export type {
    ArbeidsforholdOgInntekt,
    ArbeidsforholdOgInntektFp,
    ArbeidsforholdOgInntektSvp,
} from './src/ArbeidsforholdOgInntekt';
export { isArbeidsforholdOgInntektFp, isArbeidsforholdOgInntektSvp } from './src/ArbeidsforholdOgInntekt';
export { isFødtBarn, isUfødtBarn, isAdoptertBarn, isAdoptertStebarn, isAdoptertAnnetBarn } from './src/Barn';
export type { Utenlandsopphold, UtenlandsoppholdPeriode } from './src/Utenlandsopphold';

export type { Barn, FødtBarn, UfødtBarn, AdoptertAnnetBarn, AdoptertBarn, IkkeUtfyltTypeBarn } from './src/Barn';
export type { Familiesituasjon } from './src/Familiesituasjon';
export * from './src/Ytelse';

export * from './src/genererteTyper';

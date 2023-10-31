export type AttachmentTypeEs = 'omsorgsovertakelse' | 'terminbekreftelse';

export type AttachmentTypeOther =
    | 'adopsjonsvedtak'
    | 'fødselsattest'
    | 'anneninntektDokumentasjon'
    | 'utsettelseSykdomUttaksplan'
    | 'morsaktivitetdokumentasjon'
    | 'dokumentasjonOverføringAvKvote'
    | 'dokumentasjonAvAleneomsorg'
    | 'senEndring'
    | 'hvØvelse'
    | 'navTiltak'
    | 'tilbakebetaling';

export type AttachmentType = AttachmentTypeEs | AttachmentTypeOther;

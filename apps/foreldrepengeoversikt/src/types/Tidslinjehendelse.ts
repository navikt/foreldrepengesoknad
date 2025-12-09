import { TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';

export type Tidslinjehendelse2 = Omit<TidslinjeHendelseDto_fpoversikt, 'tidslinjeHendelseType'> & {
    utvidetTidslinjeHendelseType:
        | 'FØRSTEGANGSSØKNAD'
        | 'FØRSTEGANGSSØKNAD_NY'
        | 'ETTERSENDING'
        | 'ENDRINGSSØKNAD'
        | 'INNTEKTSMELDING'
        | 'VEDTAK'
        | 'UTGÅENDE_INNHENT_OPPLYSNINGER'
        | 'UTGÅENDE_ETTERLYS_INNTEKTSMELDING'
        | 'FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV'
        | 'UTGÅENDE_VARSEL_TILBAKEBETALING'
        | 'VENTER_INNTEKTSMELDING'
        | 'VENTER_PGA_TIDLIG_SØKNAD'
        | 'BARNET_TRE_ÅR'
        | 'FAMILIEHENDELSE'
        | 'FREMTIDIG_VEDTAK'
        | 'VENTER_MELDEKORT'
        | 'VENT_DOKUMENTASJON';
};

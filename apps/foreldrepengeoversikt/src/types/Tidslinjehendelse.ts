import { TidslinjeHendelseDto } from '@navikt/fp-types';

/**
 * Beriket tidshendelsetype for visning
 */
export type Tidslinjehendelse = Omit<TidslinjeHendelseDto, 'tidslinjeHendelseType'> & {
    type?: string;
    manglendeVedlegg: unknown[];
    merInformasjon?: string;
    linkTittel?: string;
    eksternalUrl?: string;
    internalUrl?: string;
    tidligstBehandlingsDato?: string;
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

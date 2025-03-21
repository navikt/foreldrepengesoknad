import { Attachment } from '../Attachment';
import Bankkonto from '../Bankkonto';
import { Kjønn } from '../Kjønn';
import { RettighetType } from '../RettighetType';
import { SaksperiodeNy } from '../SaksperiodeNy';

export interface SøkerinfoDTOPerson {
    fnr: string;
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
    fødselsdato: string;
    dødsdato?: string;
    kjønn: Kjønn;
}

export interface SøkerinfoDTOBarn extends SøkerinfoDTOPerson {
    annenForelder?: Omit<SøkerinfoDTOPerson, 'kjønn'>;
}

interface SøkerinfoDTOSøker extends SøkerinfoDTOPerson {
    bankkonto?: Bankkonto;
    barn?: SøkerinfoDTOBarn[];
}

interface SøkerinfoDTOArbeidsforhold {
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}

export interface SøkerinfoDTO {
    søker: SøkerinfoDTOSøker;
    arbeidsforhold?: SøkerinfoDTOArbeidsforhold[];
}

export interface SøknadSVP {
    arbeidsforhold: ArbeidsforholdSVP[];
}

export interface ArbeidsforholdSVP {
    aktivitet: Aktivitet;
    behovFrom: string;
    tilrettelegginger: TilretteleggingPeriodeSVP[];
    oppholdsperioder: Oppholdsperiode[];
    avslutningÅrsak?:
        | 'NORMAL'
        | 'TILBAKE_I_HEL_STILLING'
        | 'AVSLAG_OVERGANG_FORELDREPENGER'
        | 'AVSLAG_FØDSEL'
        | 'AVSLAG_TIDSPERIODE_FØR_TERMIN'
        | 'AVSLAG_ANNET'
        | 'AVSLAG_INNGANGSVILKÅR';
}

export type Oppholdsperiode = {
    fom: string;
    tom: string;
    årsak: 'FERIE' | 'SYKEPENGER';
    oppholdKilde: 'SØKNAD' | 'SAKSBEHANDLER' | 'INNTEKTSMELDING';
};

type Aktivitet = {
    type: 'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET';
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
};

type Arbeidsgiver = {
    id: string;
    type: 'PRIVAT' | 'ORGANISASJON';
};

export type Tilretteleggingstype = 'INGEN' | 'DELVIS' | 'HEL';

export interface TilretteleggingPeriodeSVP {
    type: Tilretteleggingstype;
    fom: string;
    tom: string;
    arbeidstidprosent?: number;
    resultat?: Resultat;
}

type Resultat = {
    resultatType: 'INNVILGET' | 'AVSLAG_SØKNADSFRIST' | 'AVSLAG_ANNET';
    utbetalingsgrad: number;
};

export interface MinidialogInnslag {
    dialogId: string;
    opprettet: string;
    saksnr: string;
}

export interface SakOppslagDTO {
    engangsstønad: EngangsstønadSakDTO[];
    foreldrepenger: ForeldrepengesakDTO[];
    svangerskapspenger: SvangerskapspengeSakDTO[];
}

type VedtakDto = {
    arbeidsforhold: ArbeidsforholdSVP[];
    avslagÅrsak?: unknown;
};

export interface SvangerskapspengeSakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    gjelderAdopsjon?: boolean;
    familiehendelse: Familiehendelse;
    åpenBehandling?: ÅpenBehandlingSVP;
    gjeldendeVedtak?: VedtakDto;
    oppdatertTidspunkt: string;
}
export interface EngangsstønadSakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    gjelderAdopsjon: boolean;
    familiehendelse: Familiehendelse;
    åpenBehandling?: ÅpenBehandlingES;
    oppdatertTidspunkt: string;
}

export interface Familiehendelse {
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelse?: string;
    antallBarn: number;
}

// TODO
export enum BehandlingTilstand {
    TIDLIG_SØKNAD = 'VENT_TIDLIG_SØKNAD',
    VENTER_PÅ_INNTEKTSMELDING = 'VENT_INNTEKTSMELDING',
    VENTER_PÅ_DOKUMENTASJON = 'VENT_DOKUMENTASJON',
    VENTER_PÅ_MELDEKORT = 'VENT_MELDEKORT',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
}

export interface ÅpenBehandlingFP {
    tilstand: BehandlingTilstand;
    søknadsperioder?: SaksperiodeNy[];
}

export interface ÅpenBehandlingES {
    tilstand: BehandlingTilstand;
}

export interface ÅpenBehandlingSVP {
    tilstand: BehandlingTilstand;
    søknad: SøknadSVP;
}

// TODO
export enum Forelder {
    mor = 'MOR',
    farMedmor = 'FAR_MEDMOR',
}

export interface PersonFnrDTO {
    fnr: string;
}

export enum DekningsgradDTO {
    ÅTTI_PROSENT = 'ÅTTI',
    HUNDRE_PROSENT = 'HUNDRE',
}

export interface ForeldrepengesakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    kanSøkeOmEndring: boolean;
    sakTilhørerMor: boolean;
    gjelderAdopsjon: boolean;
    morUføretrygd: boolean;
    harAnnenForelderTilsvarendeRettEØS: boolean;
    ønskerJustertUttakVedFødsel: boolean;
    rettighetType: RettighetType;
    annenPart: PersonFnrDTO;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak?: {
        perioder: SaksperiodeNy[];
    };
    barn: PersonFnrDTO[];
    dekningsgrad: DekningsgradDTO;
    åpenBehandling?: ÅpenBehandlingFP;
    oppdatertTidspunkt: string;
    forelder: Forelder;
}

export type KontoBeregningGrunnlagDto = {
    rettighetstype: RettighetType;
    brukerrolle: 'MOR' | 'FAR' | 'MEDMOR' | 'UKJENT';
    antallBarn: number;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelseDato?: string;
    morHarUføretrygd: boolean;
    familieHendelseDatoNesteSak?: string;
};

export interface EttersendingDto {
    brukerTekst?: {
        dokumentType: string;
        overskrift: string;
        tekst: string;
    };
    dialogId?: string;
    saksnummer: string;
    type: Ytelse;
    vedlegg: Attachment[];
}

export enum Ytelse {
    FORELDREPENGER = 'foreldrepenger',
    SVANGERSKAPSPENGER = 'svangerskapspenger',
    ENGANGSSTØNAD = 'engangsstønad',
}

export interface Dokument {
    type: DokumentType;
    mottatt: string;
    saksnummer: string;
    tittel: string;
    url: string;
    journalpostId: string;
    dokumentId: string;
}

export enum DokumentType {
    'INNGÅENDE_DOKUMENT' = 'INNGÅENDE_DOKUMENT',
    'UTGÅENDE_DOKUMENT' = 'UTGÅENDE_DOKUMENT',
    'ARBEIDSGIVER' = 'ARBEIDSGIVER',
}
export interface AnnenPartVedtakDTO {
    antallBarn?: number;
    dekningsgrad: DekningsgradDTO;
    perioder: SaksperiodeNy[];
    termindato?: string;
}

export type MellomlagredeYtelser = {
    engangsstonad: boolean;
    foreldrepenger: boolean;
    svangerskapspenger: boolean;
};

export interface Tidslinjehendelse {
    type: string;
    opprettet: string;
    aktørType: AktørType;
    tidslinjeHendelseType: TidslinjehendelseType;
    dokumenter: Dokument[];
    manglendeVedlegg: Dokument[];
    merInformasjon?: string;
    linkTittel?: string;
    eksternalUrl?: string;
    internalUrl?: string;
    tidligstBehandlingsDato?: string;
}

export enum TidslinjehendelseType {
    FØRSTEGANGSSØKNAD = 'FØRSTEGANGSSØKNAD',
    FØRSTEGANGSSØKNAD_NY = 'FØRSTEGANGSSØKNAD_NY',
    ETTERSENDING = 'ETTERSENDING',
    ENDRINGSSØKNAD = 'ENDRINGSSØKNAD',
    INNTEKTSMELDING = 'INNTEKTSMELDING',
    VEDTAK = 'VEDTAK',
    VENTER_INNTEKTSMELDING = 'VENTER_INNTEKTSMELDING',
    VENTER_PGA_TIDLIG_SØKNAD = 'VENTER_PGA_TIDLIG_SØKNAD',
    VENTER_MELDEKORT = 'VENTER_MELDEKORT',
    VENT_DOKUMENTASJON = 'VENT_DOKUMENTASJON',
    UTGÅENDE_INNHENT_OPPLYSNINGER = 'UTGÅENDE_INNHENT_OPPLYSNINGER',
    UTGÅENDE_ETTERLYS_INNTEKTSMELDING = 'UTGÅENDE_ETTERLYS_INNTEKTSMELDING',
    UTGÅENDE_VARSEL_TILBAKEBETALING = 'UTGÅENDE_VARSEL_TILBAKEBETALING',
    FAMILIEHENDELSE = 'FAMILIEHENDELSE',
    BARNET_TRE_ÅR = 'BARNET_TRE_ÅR',
    FREMTIDIG_VEDTAK = 'FREMTIDIG_VEDTAK',
    FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV = 'FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV',
}

export enum AktørType {
    BRUKER = 'BRUKER',
    NAV = 'NAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

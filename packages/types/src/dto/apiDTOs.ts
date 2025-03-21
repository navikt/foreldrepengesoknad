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

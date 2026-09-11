// Midlertidige typar for det nye /uttaksplan-endepunktet i fp-oversikt (feature/uttaksplan,
// enno ikkje merga). Namna er valde slik at dei matchar det @hey-api/openapi-ts ville generert
// i @navikt/fp-types når backend er i produksjon, slik at denne fila kan slettast og importane
// kan peika dit i staden, utan andre endringar.
import {
    Gradering_fpoversikt,
    no_nav_foreldrepenger_kontrakter_felles_kodeverk_KontoType,
    no_nav_foreldrepenger_kontrakter_felles_kodeverk_MorsAktivitet,
    no_nav_foreldrepenger_kontrakter_felles_kodeverk_Overføringsårsak,
} from '@navikt/fp-types';

export type FellesUttaksplanDto_fpoversikt = {
    antallBarn: number;
    dekningsgrad: Dekningsgrad_fpoversikt;
    perioder: PeriodeDto_fpoversikt[];
    termindato?: string;
};

export type Dekningsgrad_fpoversikt = 'ÅTTI' | 'HUNDRE';

export type PeriodeDto_fpoversikt = {
    annenPart?: UttakDto_fpoversikt;
    annenPartEøs?: EøsUttakDto_fpoversikt;
    fom: string;
    søker?: UttakDto_fpoversikt;
    tom: string;
};

export type UttakDto_fpoversikt = {
    flerbarnsdager: boolean;
    forelder: Rolle_fpoversikt;
    gradering?: Gradering_fpoversikt;
    kontoType?: no_nav_foreldrepenger_kontrakter_felles_kodeverk_KontoType;
    morsAktivitet?: no_nav_foreldrepenger_kontrakter_felles_kodeverk_MorsAktivitet;
    overføringÅrsak?: no_nav_foreldrepenger_kontrakter_felles_kodeverk_Overføringsårsak;
    resultat?: VedtattResultat_fpoversikt;
    samtidigUttak?: number;
    utsettelseÅrsak?: UtsettelseÅrsak_fpoversikt;
};

export type Rolle_fpoversikt = 'MOR' | 'FAR_MEDMOR';

export type UtsettelseÅrsak_fpoversikt =
    | 'ARBEID'
    | 'FERIE'
    | 'SØKER_SYKDOM'
    | 'SØKER_INNLAGT'
    | 'BARN_INNLAGT'
    | 'HV_ØVELSE'
    | 'NAV_TILTAK'
    | 'FRI';

export type VedtattResultat_fpoversikt = {
    innvilget: boolean;
    trekkerDager: boolean;
    trekkerMinsterett: boolean;
    årsak: VedtattResultatÅrsak_fpoversikt;
};

export type VedtattResultatÅrsak_fpoversikt =
    | 'ANNET'
    | 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
    | 'AVSLAG_FRATREKK_PLEIEPENGER'
    | 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
    | 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID';

export type EøsUttakDto_fpoversikt = {
    kontoType: no_nav_foreldrepenger_kontrakter_felles_kodeverk_KontoType;
    trekkdager: number;
};

export type FellesUttaksplanRequest_fpoversikt = {
    barnIdentifikator: BarnIdentifikator_fpoversikt;
    annenPartFødselsnummer?: string;
};

// Må ha minst eitt av felta (handhevast av backend).
export type BarnIdentifikator_fpoversikt = {
    fødselsnummer?: string;
    familiehendelse?: string;
};

import { Tidsperiode, TidsperiodeStringMedValgfriSluttdato } from '../../../common/types';

export enum Næringstype {
    'FISKER' = 'FISKE',
    'JORDBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNET' = 'ANNEN',
}

export interface Næring {
    næringstyper: Næringstype[];
    tidsperiode: Partial<TidsperiodeStringMedValgfriSluttdato>;
    næringsinntekt: string;
    pågående: boolean;
    navnPåNæringen: string;
    organisasjonsnummer: string;
    registrertINorge: boolean;
    registrertILand: string;
    stillingsprosent: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjon;
    harRegnskapsfører: boolean;
    regnskapsfører: Næringsrelasjon;
    harRevisor: boolean;
    revisor: Næringsrelasjon;
    kanInnhenteOpplsyningerFraRevisor: boolean;
}

export interface NæringInnsending
    extends Omit<Næring, 'tidsperiode' | 'endringAvNæringsinntektInformasjon' | 'oppstartsdato' | 'næringsinntekt'> {
    næringsinntekt: number;
    tidsperiode: Partial<Tidsperiode>;
    oppstartsdato?: Date;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjonInnsending;
}

export interface EndringAvNæringsinntektInformasjon {
    dato: string;
    næringsinntektEtterEndring: number;
    forklaring: string;
}

export interface EndringAvNæringsinntektInformasjonInnsending extends Omit<EndringAvNæringsinntektInformasjon, 'dato'> {
    dato: Date;
}

export interface Næringsrelasjon {
    navn: string;
    telefonnummer: string;
    erNærVennEllerFamilie: boolean;
}

export type NæringPartial = Partial<Næring>;
export type EndringAvNæringsinntektInformasjonPartial = Partial<EndringAvNæringsinntektInformasjon>;
export type NæringsrelasjonPartial = Partial<Næringsrelasjon>;

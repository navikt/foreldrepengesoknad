import { TidsperiodeMedValgfriSluttdato, TidsperiodeMedValgfriSluttdatoDTO } from 'common/types';

export enum Næringstype {
    'FISKER' = 'FISKE',
    'JORDBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNET' = 'ANNEN',
}

export interface Næring {
    næringstyper: Næringstype[];
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    næringsinntekt: string;
    pågående: boolean;
    navnPåNæringen: string;
    organisasjonsnummer: string;
    registrertINorge: boolean;
    registrertILand?: string;
    stillingsprosent?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjon;
    harRegnskapsfører: boolean;
    regnskapsfører?: Næringsrelasjon;
    harRevisor: boolean;
    revisor?: Næringsrelasjon;
    kanInnhenteOpplsyningerFraRevisor?: boolean;
}

export interface EndringAvNæringsinntektInformasjon {
    dato: string;
    næringsinntektEtterEndring: string;
    forklaring: string;
}

export interface Næringsrelasjon {
    navn: string;
    telefonnummer: string;
    erNærVennEllerFamilie: boolean;
}

export interface NæringDTO {
    næringstyper: Næringstype[];
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdatoDTO>;
    næringsinntekt: string;
    pågående: boolean;
    navnPåNæringen: string;
    organisasjonsnummer: string;
    registrertINorge: boolean;
    registrertILand?: string;
    stillingsprosent?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: Date;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjonDTO;
    harRegnskapsfører: boolean;
    regnskapsfører?: Næringsrelasjon;
    harRevisor: boolean;
    revisor?: Næringsrelasjon;
    kanInnhenteOpplsyningerFraRevisor?: boolean;
}

export interface EndringAvNæringsinntektInformasjonDTO {
    dato: Date;
    næringsinntektEtterEndring: string;
    forklaring: string;
}

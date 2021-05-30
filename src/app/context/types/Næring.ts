import { TidsperiodeMedValgfriSluttdato } from './Tidsperiode';
import { TidsperiodeMedValgfriSluttdatoDate } from './TidsperiodeDate';

export enum Næringstype {
    'FISKER' = 'FISKE',
    'JORDBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNET' = 'ANNEN',
}

export interface Næring {
    næringstyper: Næringstype[];
    tidsperiode: TidsperiodeMedValgfriSluttdato;
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
    tidsperiode: TidsperiodeMedValgfriSluttdatoDate;
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

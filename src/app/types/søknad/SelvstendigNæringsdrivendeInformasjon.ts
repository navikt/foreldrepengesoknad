import { TidsperiodeMedValgfriSluttdatoPartial } from 'common/types';

export enum Næringstype {
    'FISKER' = 'FISKE',
    'JORDBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNET' = 'ANNEN'
}

export class Næring {
    næringstyper: Næringstype[];
    tidsperiode: TidsperiodeMedValgfriSluttdatoPartial;
    næringsinntekt: string;
    pågående: boolean;
    navnPåNæringen: string;
    organisasjonsnummer: string;
    registrertINorge: boolean;
    registrertILand: string;
    stillingsprosent: string;
    nyIArbeidslivet?: boolean;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjon;
    harRegnskapsfører: boolean;
    regnskapsfører: Næringsrelasjon;
    harRevisor: boolean;
    revisor: Næringsrelasjon;
    kanInnhenteOpplsyningerFraRevisor: boolean;
}

export class EndringAvNæringsinntektInformasjon {
    dato: Date;
    næringsinntektEtterEndring: string;
    forklaring: string;
}

export class Næringsrelasjon {
    navn: string;
    telefonnummer: string;
    erNærVennEllerFamilie: boolean;
}

export type NæringPartial = Partial<Næring>;
export type EndringAvNæringsinntektInformasjonPartial = Partial<
    EndringAvNæringsinntektInformasjon
>;
export type NæringsrelasjonPartial = Partial<Næringsrelasjon>;

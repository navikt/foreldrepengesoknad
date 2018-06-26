import { TidsperiodeMedValgfriSluttdatoPartial } from 'common/types';

export enum Næringstype {
    'FISKER' = 'fisker',
    'JORDBRUK' = 'jordbruk',
    'DAGMAMMA' = 'dagmamma',
    'ANNET' = 'annet'
}

export class Næring {
    næringstyper: Næringstype[];
    tidsperiode: TidsperiodeMedValgfriSluttdatoPartial;
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

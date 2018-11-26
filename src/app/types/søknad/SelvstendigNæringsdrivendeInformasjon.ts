import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export enum Næringstype {
    'FISKER' = 'FISKE',
    'JORDBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNET' = 'ANNEN'
}

export class Næring {
    næringstyper: Næringstype[];
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    næringsinntekt: number;
    pågående: boolean;
    navnPåNæringen: string;
    organisasjonsnummer: string;
    registrertINorge: boolean;
    registrertILand: string;
    stillingsprosent: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: Date;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjon;
    harRegnskapsfører: boolean;
    regnskapsfører: Næringsrelasjon;
    harRevisor: boolean;
    revisor: Næringsrelasjon;
    kanInnhenteOpplsyningerFraRevisor: boolean;
    vedlegg: Attachment[];
}

export class EndringAvNæringsinntektInformasjon {
    dato: Date;
    næringsinntektEtterEndring: number;
    forklaring: string;
}

export class Næringsrelasjon {
    navn: string;
    telefonnummer: string;
    erNærVennEllerFamilie: boolean;
}

export type NæringPartial = Partial<Næring>;
export type EndringAvNæringsinntektInformasjonPartial = Partial<EndringAvNæringsinntektInformasjon>;
export type NæringsrelasjonPartial = Partial<Næringsrelasjon>;

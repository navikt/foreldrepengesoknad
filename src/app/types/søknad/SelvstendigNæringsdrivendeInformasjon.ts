import { TidsperiodeDatoInputVerdiMedValgfriSluttdato } from 'common/types';
import { DatoInputVerdi } from '../../../common/components/skjema/elements/dato-input/DatoInput';

export enum Næringstype {
    'FISKER' = 'FISKE',
    'JORDBRUK' = 'JORDBRUK_SKOGBRUK',
    'DAGMAMMA' = 'DAGMAMMA',
    'ANNET' = 'ANNEN',
}

export class Næring {
    næringstyper: Næringstype[];
    tidsperiode: Partial<TidsperiodeDatoInputVerdiMedValgfriSluttdato>;
    næringsinntekt: number;
    pågående: boolean;
    navnPåNæringen: string;
    organisasjonsnummer: string;
    registrertINorge: boolean;
    registrertILand: string;
    stillingsprosent: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: DatoInputVerdi;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjon;
    harRegnskapsfører: boolean;
    regnskapsfører: Næringsrelasjon;
    harRevisor: boolean;
    revisor: Næringsrelasjon;
    kanInnhenteOpplsyningerFraRevisor: boolean;
}

export class EndringAvNæringsinntektInformasjon {
    dato: DatoInputVerdi;
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

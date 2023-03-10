import { TidsperiodeMedValgfriSluttdatoDate } from '@navikt/fp-common';

export enum Næringstype {
    FISKER = 'FISKE',
    JORDBRUK = 'JORDBRUK_SKOGBRUK',
    DAGMAMMA = 'DAGMAMMA',
    ANNET = 'ANNEN',
}

export interface Næring {
    næringstyper: Næringstype[];
    tidsperiode: TidsperiodeMedValgfriSluttdatoDate;
    næringsinntekt?: number;
    pågående: boolean;
    navnPåNæringen: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertILand?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: Date;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjon;
    harRegnskapsfører: boolean;
    regnskapsfører?: Næringsrelasjon;
}

export interface EndringAvNæringsinntektInformasjon {
    dato: Date;
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

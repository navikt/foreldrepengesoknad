export const egenNæringId = 'næring';

export enum Næringstype {
    FISKER = 'FISKE',
    JORDBRUK = 'JORDBRUK_SKOGBRUK',
    DAGMAMMA = 'DAGMAMMA',
    ANNET = 'ANNEN',
}

export interface EndringAvNæringsinntektInformasjonDTO {
    dato: string;
    næringsinntektEtterEndring: number;
    forklaring: string;
}

export interface EgenNæring {
    næringstype: Næringstype;
    fomDato: string;
    tomDato: string;
    næringsinntekt?: string;
    pågående: boolean;
    navnPåNæringen?: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertILand?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    varigEndringDato?: string;
    varigEndringInntektEtterEndring?: string;
    varigEndringBeskrivelse?: string;
}

export interface EgenNæringDTO
    extends Omit<
        EgenNæring,
        | 'pågående'
        | 'fomDato'
        | 'tomDato'
        | 'næringsinntekt'
        | 'endringAvNæringsinntektInformasjon'
        | 'varigEndringDato'
        | 'varigEndringInntektEtterEndring'
        | 'varigEndringBeskrivelse'
        | 'næringstype'
    > {
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjonDTO;
    næringsinntekt?: number;
    tidsperiode: {
        fom: string;
        tom: string;
    };
    næringstyper: Næringstype[];
}

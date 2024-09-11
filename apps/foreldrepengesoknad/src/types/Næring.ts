export enum Næringstype {
    FISKER = 'FISKE',
    JORDBRUK = 'JORDBRUK_SKOGBRUK',
    DAGMAMMA = 'DAGMAMMA',
    ANNET = 'ANNEN',
}

export interface Næring {
    næringstyper: Næringstype[];
    tidsperiode: {
        fom: string;
        tom?: string;
    };
    næringsinntekt?: number;
    navnPåNæringen: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertILand?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjon;
}

export interface EndringAvNæringsinntektInformasjon {
    dato: string;
    næringsinntektEtterEndring: number;
    forklaring: string;
}

export interface EndringAvNæringsinntektInformasjonInnsending extends Omit<EndringAvNæringsinntektInformasjon, 'dato'> {
    dato: string;
}
